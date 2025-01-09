import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, HelperText, Typography } from "../../../Components/Atoms";
import { messages } from "../../../Constants/messages";
import { AuthState } from "../../../Context/auth";
import { useHashConnect } from "../../../Providers/HasConnectAPIProvider";
import { handleCustomError, showToast } from "../../../Utils/helper";
import { WALLET } from "../../../sevices";

interface WalletProps {
  handleBack?: () => void;
  handleContinue?: () => void;
  selected: string;
}

const Wallet = ({
  handleBack = () => {},
  handleContinue = () => {},
  selected,
}: WalletProps) => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    connectToExtension,
    disconnect,
    pairingData,
    availableExtension,
    network,
    pairingString,
  } = useHashConnect();
  const { user, setUser, refetch } = AuthState();

  async function handleSubmitWallet() {
    try {
      if (pairingData) {
        setIsLoading(true);
        let body = {
          wallet_address: pairingData?.accountIds?.[0],
        };
        await WALLET(body);
        await refetch();
        showToast(messages.SUCCESS_WALLET_CONNECTED, "success");
      }
      navigation("/");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const conCatAccounts = (lastAccs: string, Acc: string) => {
    return lastAccs + " " + Acc;
  };

  const handleClick = async () => {
    if (availableExtension && !pairingData) {
      await connectToExtension();
      showToast(messages.SUCCESS_WALLET_CONNECTED, "success");
    } else if (pairingData) {
      await disconnect();
      showToast(messages.SUCCESS_WALLET_DISCONNECTED, "success");
    } else
      alert(
        "Please install hashconnect wallet extension first. from chrome web store."
      );
  };
  return (
    <>
      <div className="mt-[50px]">
        <Typography
          label="Connect Wallet"
          FontSize="2xl"
          type="h1"
          color="primary"
          variant={200}
        />
      </div>

      <div className="w-[132px] h-[132px]  mt-[40px] border border-gray-100 rounded shadow-button">
        <div className="flex flex-col items-center ">
          <div className="pt-[25px]">
            <img src="Assets/HashPack.svg" width="49.5px"></img>
          </div>
          <Typography
            label="HashPack"
            type="p"
            FontSize="base"
            classname="mt-2 "
            color="primary"
            variant={200}
          />
        </div>
      </div>
      <div className="w-[138px] mt-[30px]">
        <Button
          label={pairingData ? "Disconnect" : "Connect"}
          variant="standard"
          disable={false}
          size="small"
          onClick={handleClick}
          disabled={isLoading}
        />{" "}
      </div>
      {pairingData?.accountIds && pairingData.accountIds?.length > 0 && (
        <div className="mt-4">
          <Typography
            FontSize="lg"
            label="Connected Accounts Details:"
            type="h3"
            color="pink"
            variant={300}
          />
          <Typography
            FontSize="lg"
            label={`Network:${network}`}
            type="p"
            color="primary"
            variant={300}
          />
          <Typography
            FontSize="lg"
            label={`Accounts: [
            ${
              pairingData?.accountIds &&
              pairingData?.accountIds.reduce(conCatAccounts)
            }
            ]`}
            type="p"
            color="primary"
            variant={300}
          />
        </div>
      )}
      <div className="mt-[30px] flex ">
        <Typography
          FontSize="xs"
          label="By Connecting your wallet, you agree to our "
          type="p"
          color="primary"
          variant={300}
        />
        <HelperText
          label="Terms of Services"
          color="secondary"
          className="text-xs mx-1 cursor-pointer"
        ></HelperText>
        <Typography
          FontSize="xs"
          label="and"
          type="p"
          color="primary"
          variant={300}
        />
        <HelperText
          label="Privacy Policy"
          color="secondary"
          className=" text-xs mx-1 cursor-pointer"
        ></HelperText>
      </div>

      <div className="mt-[50px]">
        <Typography
          FontSize="base"
          label="Please remember that all transactions on our platform are conducted using USDC hts  and HBAR cryptocurrencies."
          type="p"
          classname="text-text-danger-100"
        />
      </div>

      <div className="flex justify-between mt-[40px] w-full absolute bottom-0">
        <div className="flex items-start  m-5 w-[100px] ">
          <Button
            onClick={handleBack}
            label="Back"
            variant="Transparent"
            color="secondary"
            size="small"
          />
        </div>
        <div>
          <div className=" flex  relative m-5 z-10 ">
            <div className="w-[105px]">
              <Button
                onClick={handleSubmitWallet}
                disable={isLoading}
                label={pairingData ? "Continue" : "Skip"}
                variant={pairingData ? "standard" : "Transparent"}
                color={pairingData ? "primary" : "secondary"}
                size="small"
              />
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
