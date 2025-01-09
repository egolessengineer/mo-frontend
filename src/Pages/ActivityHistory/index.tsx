import _debounce from 'lodash/debounce';
import { useEffect, useState } from "react";
import { Button, Textfield } from "../../Components/Atoms";
import { Structure } from "../../Components/Molecules";
import { AuthState } from "../../Context/auth";
import { handleCustomError } from "../../Utils/helper";
import { NOTIFICATION } from "../../sevices";
import ActivityFAQ from "./ActivityFAQ";

const ActivityHistory = () => {
  const [notificationList, setNotificationList] = useState<any>();
  const [isLoading , setLoading] = useState(false)
  const [searchval , setSearchval] = useState("")
  const { user } = AuthState();

  const handleGetNotification = async (id: any) => {
    try{
      setLoading(true)
      let res = await NOTIFICATION(id);
      let decendingData = [...res?.data].reverse();
    setNotificationList(
      decendingData.map((noti: any) => ({
        ...noti,
        content: JSON.parse(noti.content),
      }))
      );
    }
    catch(error:any){
      handleCustomError(error)
    }
    finally{
      setLoading(false)
    }
  };

 

  useEffect(()=>{
    const debouncedSearch = _debounce((query) => {
      const filteredFaqs = notificationList.filter((not:any) => 
       (typeof not.content.message === "string") && not.content.message.toLowerCase().includes(query.toLowerCase())
      );
      setNotificationList(filteredFaqs);
    }, 1000);
    
    if(searchval !== ""){
      debouncedSearch(searchval)
    }
    else{
      if(user?.id){
        handleGetNotification(user?.id)
      }
    }

    return ()=> {
      debouncedSearch.cancel()
    }
  },[searchval , user])

  return (
    <Structure
      Heading={"Activity History"}
      optionText={
        <Button
          label={"All Activity"}
          color="primary"
          variant="line"
          className="font-bold text-sm text-text-primary-200 "
        />
      }
      Buttons={
        <div>
          <Textfield
                type="search"
                placeHolder="Search"
                value={searchval}
                onChange={(e:any)=>setSearchval(e.target.value)}
                rightIcon={
                  <img
                    src="/Assets/Search.svg"
                    height="36px"
                    width="36px"
                    className="rounded-[5px] mt-[1.5px]"
                    alt=""
                  />
                }
              />
        </div>
      }
      mainSection={<ActivityFAQ notificationList={notificationList} isLoading={isLoading} />}
    />
  );
};

export default ActivityHistory;
