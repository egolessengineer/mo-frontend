import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Logo } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";
import { AuthState } from "../../../Context/auth";

const HamBurgerPopUp = ({ open, close }: any) => {
  const { user } = AuthState();
  const [active, setactive] = useState("Dashboard");
  let Navigate = useNavigate();
  const whichIsActive = (name: string, url: string) => {
    setactive(name);
    Navigate(url);
  };
  return (
    <ModalAtom
      changeState={close}
      PanelPosition={" z-50   overflow-hidden"}
      description={
        <div className="h-[100vh]  w-[70%] absolute top-0 left-0 lg:hidden shadow-navbar  bg-white z-[999]  ">
          <div className="flex flex-col items-center">
            <Logo />
            <div className="  justify-center space-y-[15px] mt-[20px]  ">
              <div
                className={` w-[30vh] md:w-[40vh] flex justify-center  ${
                  active == "Dashboard" ? "bg-primary-500" : " "
                }   `}
              >
                <Button
                  variant="line"
                  onClick={() => {
                    user.role === "ADMIN" ? whichIsActive("Dashboard", "/admin-analytics") :
                    whichIsActive("Dashboard", "/");
                  }}
                  label="Dashboard"
                  className="ml-[10px] "
                  icon={<img src="/Assets/hamburger/Dashboard.svg" />}
                ></Button>
              </div>
              <div
                className={` w-[30vh] md:w-[40vh] flex justify-center  ${
                  active == "project" ? "bg-primary-500" : " "
                }   `}
              >
                <Button
                  onClick={() => {
                    whichIsActive("project", "/myproject");
                  }}
                  variant="line"
                  className="ml-[10px] "
                  label="My Projects"
                  icon={<img src="/Assets/hamburger/MyPrj.svg" />}
                ></Button>
              </div>
              {user?.role === "PROVIDER" && <div
                className={` w-[30vh] md:w-[40vh] flex justify-center  ${
                  active == "team" ? "bg-primary-500" : " "
                }   `}
              >
                <Button
                  onClick={() => {
                    whichIsActive("team", "/myteam-space");
                  }}
                  variant="line"
                  className="ml-[10px] "
                  label="My Team Space"
                  icon={<img src="/Assets/hamburger/MyTeam.svg" />}
                ></Button>
              </div>}
              <div
                className={` w-[30vh] md:w-[40vh] flex justify-center  ${
                  active == "provider" ? "bg-primary-500" : " "
                }   `}
              >
                <Button
                  onClick={() => {
                    whichIsActive("provider", "/provider-list");
                  }}
                  variant="line"
                  label="Provider list"
                  className="ml-[10px] "
                  icon={<img src="/Assets/hamburger/Providerlist.svg" />}
                ></Button>
              </div>
              
              <div
                className={` w-[30vh] md:w-[40vh] flex justify-center  ${
                  active == "Activity" ? "bg-primary-500" : " "
                }   `}
              >
                <Button
                  onClick={() => {
                    whichIsActive("Activity", "/activity-history");
                  }}
                  variant="line"
                  label="Activity History"
                  icon={<img src="/Assets/hamburger/ActivityHistory.svg" />}
                ></Button>
              </div>
              
              <div
                className={` w-[30vh] md:w-[40vh] flex justify-center  ${
                  active == "Dispute" ? "bg-primary-500" : " "
                }   `}
              >
                <Button
                  onClick={() => {
                    whichIsActive("Dispute", "/dispute");
                  }}
                  variant="line"
                  className="ml-[10px] "
                  label="Dispute"
                  icon={<img src="/Assets/hamburger/Dispute.svg" />}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      }
      Title={""}
      open={open}
    />
  );
};

export default HamBurgerPopUp;
