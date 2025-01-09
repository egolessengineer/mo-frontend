import {
  Button,
  HelperText,
  Textfield,
  Typography,
} from "../../Components/Atoms";

const Otp = ({
  valid,
  back,
  handleSendOtp,
  isLoading,
  formik,
  otpval,
  setOtpVal,
}: any) => {
  function handleSetotp(e: any) {
    let { id, value } = e.target;
    let idx = +id.split(".")[1]
    let mapotp;
    if (value) {
      mapotp = otpval.map((onum:any,index:any) => index === idx-1? value : onum)
      setOtpVal(mapotp);
    } else {
      mapotp = otpval.map((onum:any,index:any) => index === idx-1 ? "" : onum)       
      setOtpVal(mapotp);
    }

    formik.setFieldValue('otp', mapotp.join(""))
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-center justify-center h-[300px]  "
    >
      <Typography
        color="primary"
        variant={200}
        classname="font-bold "
        type="p"
        label={"Please enter One-Time Password send to your register email id."}
        FontSize="base"
      />
      <div className="flex gap-5 mt-10">
        <div className="md:w-[64px] md:h-[64px] rounded-[1px] bg-text-gray-500 border-b-[6px] border-text-gray-100 flex justify-center items-center">
          <Textfield
            className="bg-text-gray-500 border-none text-center "
            style={{ fontSize: "32px" }}
            placeHolder="3"
            max={1}
            id="o.1"
            onChange={(e: any) => {
              handleSetotp(e)              
            }}
            value={otpval[0]}
          />
        </div>
        <div className=" md:w-[64px] md:h-[64px] rounded-[1px] bg-text-gray-500 border-b-[6px] border-text-gray-100 flex justify-center items-center">
          <Textfield
            className="bg-text-gray-500 border-none text-center "
            style={{ fontSize: "32px" }}
            placeHolder="4"
            max={1}
            id="o.2"
            onChange={(e: any) => {
              handleSetotp(e);
            }}
            value={otpval[1]}
          />
        </div>
        <div className=" md:w-[64px] md:h-[64px] rounded-[1px] bg-text-gray-500 border-b-[6px] border-text-gray-100 flex justify-center items-center">
          <Textfield
            className="bg-text-gray-500 border-none text-center "
            style={{ fontSize: "32px" }}
            placeHolder="7"
            max={1}
            id="o.3"
            onChange={(e: any) => {
              handleSetotp(e);
            }}
            value={otpval[2]}
          />
        </div>
        <div className=" md:w-[64px] md:h-[64px] rounded-[1px] bg-text-gray-500 border-b-[6px] border-text-gray-100 flex justify-center items-center">
          <Textfield
            className="bg-text-gray-500 border-none text-center "
            style={{ fontSize: "32px" }}
            placeHolder="1"
            max={1}
            id="o.4"
            onChange={(e: any) => {
              handleSetotp(e);
            }}
            value={otpval[3]}
          />
        </div>
        <div className=" md:w-[64px] md:h-[64px] rounded-[1px] bg-text-gray-500 border-b-[6px] border-text-gray-100 flex justify-center items-center">
          <Textfield
            className="bg-text-gray-500 border-none text-center "
            style={{ fontSize: "32px" }}
            placeHolder="0"
            max={1}
            id="o.5"
            onChange={(e: any) => {
              handleSetotp(e);
            }}
            value={otpval[4]}
          />
        </div>
        <div className=" md:w-[64px] md:h-[64px] rounded-[1px] bg-text-gray-500 border-b-[6px] border-text-gray-100 flex justify-center items-center">
          <Textfield
            className="bg-text-gray-500 border-none text-center "
            style={{ fontSize: "32px" }}
            placeHolder="3"
            max={1}
            id="o.6"
            onChange={(e: any) => {
              handleSetotp(e);
            }}
            value={otpval[5]}
          />
        </div>
      </div>
      {formik.touched.otp && formik.errors.otp && (
        <HelperText
          position="right"
          label={formik.errors.otp}
          className="text-xxs "
          color="danger"
          icon={
            <img
              src="/Assets/Danger.svg"
              alt=""
              className="pt-[6px] ml-[4px]"
            />
          }
        />
      )}
      <div className="mt-[30px] flex justify-center gap-x-5">
        <div className="w-[126px]">
          <Button
            label="Resend OTP"
            size="small"
            color="secondary"
            variant="Transparent"
            onClick={async()=>{
             await handleSendOtp()
             setOtpVal(new Array(6).fill(""))
             formik.setFieldValue("otp","")
            }}
            disable={isLoading}
          />
        </div>
        <div className="w-[100px]">
          <Button
            type="submit"
            label="Validate"
            size="small"
            // onClick={valid}
            disable={isLoading}
          />
        </div>
      </div>
    </form>
  );
};

export default Otp;
