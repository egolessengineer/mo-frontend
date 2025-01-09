import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Logo, Typography } from "../../../Components/Atoms";
import { handleCustomError, showToast } from "../../../Utils/helper";
import { RESEND_EMAIL, SEND_RESET_PASSWORD } from "../../../sevices";

const VerifyEmail = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const ResendEmail = async () => {
    try {
      setIsLoading(true);
      let body = {
        email: state?.email,
      };

      let data =
        state?.key === "signup"
          ? await RESEND_EMAIL(body)
          : await SEND_RESET_PASSWORD(body);
      showToast(data?.data, "success");
    } catch (error) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Logo position="start" />
      <div className="flex justify-center mt-[20px]">
        <Typography type="h1" label="E-mail verification" FontSize="4xl" />
      </div>
      <div className="flex justify-center items-center h-[25vh] "></div>
      <div className="flex justify-center">
        <Typography
          label="Hi! we’ve sent a link to your email:"
          type="p"
          FontSize="2xl"
        />
      </div>

      <div className="flex justify-center ">
        <Typography
          label={state?.email}
          type="h2"
          classname="font-bold xxs:text-lg  lg:2xl"
        />
      </div>
      <div className="flex justify-center ">
        <Typography
          label="Click on link to verify your email"
          type="p"
          classname="font-normal xxs:text-lg  sm:2xl"
        />
      </div>
      <div className="flex justify-center ">
        <div className="w-[135px] mt-[20px]">
          <Button
            label="Resend Email"
            color="secondary"
            variant="Transparent"
            size="small"
            disable={isLoading}
            onClick={() => ResendEmail()}
          />{" "}
        </div>
      </div>
      
    </>
  );
};

export default VerifyEmail;
