import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CloseHamBurger,
  HamBurger,
  Notification,
  ProfileIcon,
  StickyNote
} from "../../Assets/SVG";
import { Button, Logo } from "../../Components/Atoms";

import moment from "moment";
import { AuthState } from "../../Context/auth";
import { useHashConnect } from "../../Providers/HasConnectAPIProvider";
import { handleCustomError } from "../../Utils/helper";
import { NOTIFICATION } from "../../sevices";
import { useMqtt } from "../../sevices/Notification/Index";
import ConnectWalletPopUp from "./PopUpsDashboard/ConnectWalletPopUp";
import HamBurgerPopUp from "./PopUpsDashboard/HamBurgerPopUp";
import NotificationPopUp from "./PopUpsDashboard/NotificationPopUp";
import { ProfilePopUp } from "./PopUpsDashboard/ProfilePopUp";
import SearchBox from "./SearchBox";

const Navbar = () => {
  const {
    pairingData,
  } = useHashConnect();
  const { user } = AuthState();

  const [OpenMenu, setOpenMenu] = useState(false);
  const [OpenNotify, setOpenNotify] = useState(false);
  const [connect, setconnect] = useState(false);
  const [profile, setprofile] = useState(false);

  const navigate = useNavigate();
  const { mqttSubscribe, isConnected, payload, clearPayload } = useMqtt();
  const [notificationList, setNotificationList] = useState<any>();
  const [isNotification, setIsNotification] = useState<boolean>(false);

  const OpenNote = () => {
    navigate("/hcs-communication");
  };

  const openProfile = () => {
    setprofile((prev) => !prev);
  };
  const closeProfile = () => {
    setprofile(false)
  }
  const OpenNotification = () => {
    setIsNotification(false);
    setOpenNotify((prevOpenMenu) => !prevOpenMenu);
  };
  const CloseNotification = () => {
    setOpenNotify(false);
  };
  const toggleMenu = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu); // Toggle the menu state
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  function connectWallet() {
    setconnect((prev) => !prev);
  }
  function closeconnectWallet(data?: boolean) {
    if (data) closeconnectWallet();
    setconnect(false);
  }

  const handleGetNotification = async (id: any) => {
    try {
      let res = await NOTIFICATION(id);
      let decendingData = [...res?.data].reverse();
      setNotificationList(
        decendingData.map((noti: any) => ({
          ...noti,
          content: JSON.parse(noti.content),
        }))
      );
    }
    catch (error: any) {
      handleCustomError(error)
    }
  };

  useEffect(() => {
    if (user?.id) {
      handleGetNotification(user?.id);
    }
  }, [user]);

  useEffect(() => {
    if (isConnected) {
      mqttSubscribe(user?.id);
    }
  }, [isConnected]);

  useEffect(() => {
    if (payload?.message && [user?.id].includes(payload?.topic)) {
      const newMessage = { ...payload?.message, content: JSON.parse(payload?.message?.content), createdAt: moment.unix(payload?.message?.createdAt).format("DD-MM-YYYY hh:mm a") };
      setNotificationList([newMessage, ...notificationList]);
      setIsNotification(true);
      if (!payload) {
        clearPayload();
      }
    }
  }, [payload]);

  return (
    <>
      {/* //*POPUPs */}
      <>
        {OpenMenu && <HamBurgerPopUp open={OpenMenu} close={closeMenu} />}

        {/* //! ConnectWallet POPUP */}
        {connect && (
          <ConnectWalletPopUp
            connect={connect}
            connectingFunction={closeconnectWallet}
            close={() => setconnect(false)}
          />
        )}
        {/* //! notifcation popups */}
        {OpenNotify && (
          <NotificationPopUp
            OpenNotify={OpenNotify}
            close={CloseNotification}
            notificationList={notificationList}
          />
        )}
        {/* //! profile popups */}
        {profile && <ProfilePopUp profile={profile} close={closeProfile} />}
      </>
      <div className="sticky top-0 z-40 right-0">
        <div className="h-[62] lg:h-[70px] bg-primary-100 shadow-navbar flex flex-col justify-center">
          <div className="flex fex-row justify-between pl-[20px] pr-[20px] lg:hidden">
            <Link to={user?.role === "PROVIDER" ? "/myproject" : "/"}>
              <Logo Shadow={false} />
            </Link>
            <div className="flex justify-evenly items-center space-x-[10px] relative">
              <Button
                label=""
                variant="line"
                icon={<Notification isNotification={isNotification} />}
                onClick={OpenNotification}
              />
              <Button
                label=""
                variant="line"
                icon={<StickyNote />}
                onClick={OpenNote}
              />

              <Button
                icon={
                  <img
                    src="/Assets/WalletConnect.svg"
                    className="pr-[5px]"
                    alt=""
                  ></img>
                }
                onClick={connectWallet}
                label=""
                variant="line"
                className="text-white"
                iconPosition="right"
                size="small"
              />
              <Button
                icon={<ProfileIcon />}
                label=""
                variant="line"
                onClick={openProfile}
              />
              <Button
                icon={OpenMenu ? <CloseHamBurger /> : <HamBurger />}
                label=""
                variant="line"
                onClick={toggleMenu} // Use the toggleMenu function
              />
            </div>
          </div>
          {/* ... (rest of your code) */}
          <div className="lg:flex items-center justify-between xs:hidden w-full px-7 gap-5">
            <Link to={user?.role === "PROVIDER" ? "/myproject" : "/"}>
              <Logo Shadow={false} />
            </Link>
            <div className=" w-[50%] lg:h-[36px] border-text-gray-50 border-1 flex-1">
              <SearchBox />
            </div>
            <div className="flex w-fit gap-5 items-center">
              <Button
                label=""
                variant="line"
                icon={<Notification isNotification={isNotification} />}
                onClick={OpenNotification}
              />

              <Button
                label=""
                variant="line"
                icon={<StickyNote />}
                onClick={OpenNote}
              />
              <div className="w-[200px]">
                <Button
                  icon={
                    <img
                      src="/Assets/WalletConnect.svg"
                      className="pr-[5px]"
                      alt=""
                    ></img>
                  }
                  onClick={connectWallet}
                  label={pairingData ? "Connected" : "Connect Wallet"}
                  variant="Transparent"
                  className="text-white"
                  iconPosition="right"
                  color="primary"
                  size="small"
                />
              </div>

              <Button
                icon={<ProfileIcon />}
                label=""
                variant="line"
                onClick={openProfile}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
