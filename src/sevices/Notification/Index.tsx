import mqtt from "mqtt";
import { useEffect, useState } from 'react';

// interface IMessages {
//     id: string;
//     time: number;
//     data: {
//       message: string;
//     };
//   }

const notificationConfig = {
    host : process.env.VITE_MQ_HOST || "wss://b-3dad81bb-3a75-4543-b99f-2cbc36620ca7-1.mq.us-east-1.amazonaws.com:61619",
    username : process.env.VITE_MQ_USERNAME || "rahulasati",
    password : process.env.VITE_MQ_PASSWORD || "Rejolut@1008",
    protocol: "wss",
    port: 61619,
}  

export const useMqtt = () => {
    // const [payload, setPayload] = useState<IMessages[]>([]);
    const [client, setClient] = useState <any> (null);
    const [isConnected, setIsConnected] = useState(false);
    const [payload, setPayload] = useState <any> (null);

    

    const mqttConnect = async () => {
        
        const host = notificationConfig.host;
        const options : any = {          
            username: notificationConfig.username,
            password: notificationConfig.password,
            protocol: notificationConfig.protocol,
            port: notificationConfig.port,
        };
        const clientMqtt = await mqtt.connect(host, options);
        setClient(clientMqtt);
      };
    
      const mqttDisconnect = () => {
        if (client) {
          client.end(() => {
            console.log('MQTT Disconnected');
            setIsConnected(false);
          });
        }
      };

      const mqttSubscribe = async (topic:any) => {
        if (client) {
          console.log('MQTT subscribe ', topic);
          const clientMqtt = await client.subscribe(topic, {
            qos: 0,
            rap: false,
            rh: 0,
          }, (error:any) => {
            if (error) {
              console.log('MQTT Subscribe to topics error', error);
              return;
            }
          });
          setClient(clientMqtt);
        }
      };

      const mqttUnSubscribe = async (topic:any) => {
        if (client) {
          const clientMqtt = await client.unsubscribe(topic, (error:any) => {
            if (error) {
              console.log('MQTT Unsubscribe error', error);
              return;
            }
          });
          setClient(clientMqtt);
        }
      };

      const  clearPayload = ()=>{
        setPayload(null)
      }


      useEffect(() => {
        mqttConnect();
        return () => {
          mqttDisconnect();
        };
      }, []);  

      useEffect(() => {
        if (client) {
          client.on('connect', () => {
            setIsConnected(true);
            console.log('MQTT Connected');
          });
          client.on('error', (err:any) => {
            console.error('MQTT Connection error: ', err);
            client.end();
          });
          client.on('reconnect', () => {
            setIsConnected(true);
          });
          client.on('message', (_topic:any, message:any) => {
            let {data } = JSON.parse(message)
            const payloadMessage = { topic: _topic, message: data};
            setPayload(payloadMessage);
          });
        }
      }, [client]);
    
    // console.log(payload , "live nofication")  
    return {
        mqttConnect,
        mqttDisconnect,
        mqttSubscribe,
        mqttUnSubscribe,
        payload,
        isConnected,
        clearPayload
      };
}
