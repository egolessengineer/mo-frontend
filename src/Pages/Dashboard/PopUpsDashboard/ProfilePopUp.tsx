import { useState } from "react";
import { Link } from "react-router-dom";
import { ProfileIcon } from "../../../Assets/SVG";
import { Button, Typography } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";
import { handleCustomError, logout } from "../../../Utils/helper";
import { AuthState } from "../../../Context/auth";
import { IdentificationIcon } from "@heroicons/react/24/outline";
export const ProfilePopUp = ({ profile, close }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = AuthState()
  const LogOut = async () => {
    try {
      setIsLoading(true);
      await logout();
    } catch (error) {
      handleCustomError(error);
    }
  };

  return (
    <ModalAtom
      close={close}
      PanelPosition={"min-w-max"}
      description={
        <>
          <div className="bg-primary-100 flex px-[10px] pt-[4px] pb-[4px] border-b-[1px] border-text-gray-50 space-x-[10px] items-center justify-start">
            <IdentificationIcon className="h-6 w-6 text-white" />
            <Typography
              label={user?.role === "PURCHASER" ? 'Purchaser' : user?.role === "ADMIN" ? 'Admin' : 'Provider'}
              color="primary"
              variant={200}
              type="p"
              FontSize="sm"
              classname="text-white"
            />
          </div>
          <div className="flex pl-[10px] pt-[4px] pb-[4px] border-b-[1px] border-text-gray-50 space-x-[10px] items-center justify-start">
            <Button label="" variant="line" icon={<ProfileIcon color="gray" />}>
              <Link to={"/my-profile"}>
                <Typography
                  label="My Profile"
                  color="primary"
                  variant={200}
                  type="p"
                  FontSize="sm"
                />
              </Link>
            </Button>
          </div>

          <div className="flex pl-[10px] pt-[4px] pb-[4px] border-b-[1px] border-text-gray-50 space-x-[10px] items-center justify-start">
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
        </>
      }
      Title={""}
      positionDiv={"absolute lg:top-[73px] top-[45px] lg:right-2 right-5"}
      open={profile}
    />
  );
};
