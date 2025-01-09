import { Typography } from "../../Components/Atoms";
import { ChangePassword } from "./ChangePassword";
import { ForgotPassword } from "./ForgotPassword";
import Otp from "./Otp";

const Password = ({
  formik,
  isLoading,
  changepassword,
  setchangepassword,
  OtpState,
  setOtpState,
  handleSendOtp,
  handleVerifyOtp,
  otpval, setOtpVal
}: any) => {
  
  const back = () => {
    setOtpState(false);
    setchangepassword(false);
  };
  return (
    <div className="flex justify-center">
      <div className="shadow-navbar rounded-[5px] w-full md:w-[828px] ">
        <div className="px-5 pt-5 pb-[10px] border-b-[1px] border-text-gray-50">
          <Typography
            label="Change Password"
            classname="font-bold text-text-HeadLine-100 "
            FontSize="base"
            type="p"
          />
        </div>
        {!OtpState ? (
          !changepassword ? (
            <ChangePassword
              formik={formik}
              setOtpState={setOtpState}
              setchangepassword={setchangepassword}
              isLoading={isLoading}
              handleSendOtp={handleSendOtp}
            />
          ) : (
            <ForgotPassword
              setchangepassword={setchangepassword}
              formik={formik}
              isLoading={isLoading}
            />
          )
        ) : (
          <Otp           
            back={back}         
            handleSendOtp={handleSendOtp}
            isLoading={isLoading}
            formik={formik}
            otpval={otpval} 
            setOtpVal={setOtpVal} 
          />
        )}
      </div>
    </div>
  );
};

export default Password;
