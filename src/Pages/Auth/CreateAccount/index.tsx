import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, Typography } from "../../../Components/Atoms";
import { AuthState } from "../../../Context/auth";
import { handleCustomError, showToast } from "../../../Utils/helper";
import { SELECT_ROLE } from "../../../sevices";

const CreateAccountProLancer = () => {
  const [isPurchaser, setisPurchaser] = useState(false);
  const [isProvider, setisProvider] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = AuthState();


  const navigate = useNavigate();
  async function handleRoleSelect(role: string) {
    try {
      setIsLoading(true);
      if (role === "PROVIDER") {
        setisPurchaser(false)
        setisProvider(true)
      }
      else {
        setisPurchaser(true)
        setisProvider(false)
      }
      await SELECT_ROLE({
        role: role,
      });
      setUser({ ...user, role })
      showToast("Role Selected", "success");
      navigate("/details");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  
  useEffect(() => {
    if (user?.role) {
      navigate('/details')
    }
  }, [user])


  return (
    <>
      <Logo position="start" />
      <div className="h-calc">
        <div className="flex  justify-center mt-[8px] ">
          <Typography
            label="Create your account"
            type="h1"
            FontSize="4xl"
            variant={200}
            color="primary"
          />
        </div>
        <div className="flex justify-center mt-[71px]">
          <Typography
            label="I am a"
            type="h2"
            FontSize="2xl"
            variant={100}
            color="primary"
            classname="font-semibold"
          />
        </div>
        <div className="flex py-3 sm:flex-row xs:flex-col xs:items-center sm:justify-evenly justify-center mt-[20px] overflow-x-auto ">
          <div>
            <div
              onClick={() => handleRoleSelect("PROVIDER")}
              className={`w-[203px] h-[277px] shadow-provider shadow-role flex justify-center rounded-[5px] cursor-pointer  ${isProvider ? "border-b-8 border-primary-300" : ""
                }`}
            >
              <img src="/Assets/provider.svg" alt="" className="w-[128px]" />
            </div>
            <div className="flex justify-center mt-[20px] ">
              <Typography
                color={`${isProvider ? "secondary" : "primary"}`}
                variant={300}
                label="Provider"
                type="p"
                FontSize="2xl"
              />
            </div>
          </div>
          <div>
            <div
              onClick={() => handleRoleSelect("PURCHASER")}
              className={`xs:items-center cursor-pointer w-[203px] shadow-role h-[276px] flex justify-center shadow-provider rounded-[5px] xs:mt-[10px] sm:mt-[0px] ${isPurchaser ? "border-b-8 border-primary-300" : ""
                }`}
            >
              <img src="/Assets/Lancer.svg" alt="" className="w-[239px] " />
            </div>
            <div className=" flex justify-center  mt-[20px] hover:text-bg-primary-300 ">
              <Typography
                color={`${isPurchaser ? "secondary" : "primary"}`}
                variant={300}
                label="Purchaser"
                type="p"
                FontSize="2xl"
                classname=""
              />
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default CreateAccountProLancer;
