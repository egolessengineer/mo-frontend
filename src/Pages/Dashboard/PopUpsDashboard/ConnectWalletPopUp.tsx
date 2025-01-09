import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Button, HelperText, Typography } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";
import { messages } from "../../../Constants/messages";
import { AuthState } from "../../../Context/auth";
import { useHashConnect } from "../../../Providers/HasConnectAPIProvider";
import { handleCustomError, logout, showToast } from "../../../Utils/helper";
import { WALLET } from "../../../sevices";
const ConnectWalletPopUp = ({ connect, connectingFunction, close }: any) => {
  const {
    connectToExtension,
    disconnect,
    pairingData,
    availableExtension,
  } = useHashConnect();
  const [isLoading, setIsLoading] = useState(false);
  const { user, refetch } = AuthState();

  useEffect(() => {
    if (pairingData) {
      if (user.walletAddress !== pairingData?.accountIds[0]) {
        handleSubmitWallet();
      }
    }
  }, [pairingData]);

  async function handleSubmitWallet() {
    try {
      setIsLoading(true);
      let body = {
        wallet_address: pairingData?.accountIds[0],
      };
      if (!user.walletAddress) {
        await WALLET(body);
        await refetch();
        showToast("Wallet Data Successfully Saved", "success");
      } else if (body.wallet_address !== user.walletAddress) {
        disconnect()
        showToast("Connect your registered wallet address", "error");
      }
      connectingFunction();
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleClick = async () => {
    if (availableExtension && !pairingData) {
      await connectToExtension();

    } else if (pairingData) {
      await disconnect();
      showToast(messages.SUCCESS_WALLET_DISCONNECTED, "success");
    } else
      alert(
        "Please install hashconnect wallet extension first. from chrome web store."
      );
  };

  const LogOut = async () => {
    try {
      setIsLoading(true);
      await logout();
    } catch (error) {
      handleCustomError(error);
    }
  };
  return (
    <>
      {pairingData ? (
        <ModalAtom
          Title={<div className="flex justify-end items-center cursor-pointer px-4 py-2" onClick={close}>
            <XMarkIcon className="h-6 w-6" color={"#00B7FD"} />
          </div>}
          description={
            <>
              <div>
                <div className="h-full flex flex-col items-center justify-center px-10 pt-10 pb-3">
                  <img src="/Assets/HashPack.svg" width="49.5px" alt=""></img>
                  <Typography
                    label="HashPack"
                    type="p"
                    FontSize="base"
                    classname="mt-2 "
                    color="primary"
                    variant={200}
                  />
                  <br />
                  <br />
                  <Button
                    variant="standard"
                    color="primary"
                    label="Disconnect"
                    size="small"
                    onClick={() => {
                      disconnect();
                      connectingFunction();
                    }}
                  />
                  <br />
                </div>

                <div className=" flex pl-2 pb-[2px] border-t-[1px] border-text-gray-50 ">
                  <Button
                    label=""
                    variant="line"
                    icon={<img src="/Assets/Logout.svg" alt=""/>}
                    onClick={LogOut}
                    disable={isLoading}
                  >
                    <Typography
                      label="Logout"
                      color="primary"
                      variant={200}
                      type="p"
                      FontSize="sm"
                    />
                  </Button>
                </div>
              </div>
            </>
          }
          open={pairingData ? true : false}
          PanelPosition={"lg:w-[564px] w-full"}
        />
      ) : (
        <ModalAtom
          Title={
            <div className="flex justify-between bg-primary-25 rounded-t-[5px]">
              <Typography
                label="Connect to Wallet"
                type="h3"
                classname="font-bold text-white pt-[15px] pr-[20px] pb-[15px] pl-[20px] "
                FontSize="base"
              />
              <div className="mt-[12px] mr-[20px]">
                <Button
                  variant="line"
                  icon={<img src="/Assets/Close.svg" alt=""/>}
                  onClick={connectingFunction}
                  label=""
                  size="small"
                />
              </div>
            </div>
          }
          description={
            <>
              <div className="pl-[20px] py-[14px]">
                <Typography
                  label="Select wallet to connect"
                  type="p"
                  FontSize="base"
                  color="priamry"
                  variant={200}
                />

                <div className="flex flex-col items-center mt-2">
                  <div className=" shadow-navbar w-[132px] h-[132px] rounded-[5px] flex flex-col items-center justify-center">
                    <Button
                      label=""
                      icon={
                        <img src="/Assets/HashPack.svg" width="49.5px" alt=""></img>
                      }
                      variant="line"
                      size="small"
                      onClick={handleClick}
                      disabled={pairingData ? true : false}
                    />
                    <Typography
                      label="HashPack"
                      type="p"
                      FontSize="base"
                      classname="mt-2 "
                      color="primary"
                      variant={200}
                    />
                  </div>
                  <div className="mt-[20px]">
                    <div className="mt-[30px] flex ">
                      <Typography
                        FontSize="xs"
                        label="By Connecting your wallet, you agree to our "
                        type="p"
                      />
                      <HelperText
                        label="Terms of Services"
                        color="secondary"
                        className="text-xs mx-1 cursor-pointer"
                      ></HelperText>
                      <Typography FontSize="xs" label="and" type="p" />
                      <HelperText
                        label="Privacy Policy"
                        color="secondary"
                        className=" text-xs mx-1 cursor-pointer"
                      ></HelperText>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
          open={connect}
          PanelPosition={"lg:w-[564px] w-full"}
        />
      )}
    </>
  );
};

export default ConnectWalletPopUp;
