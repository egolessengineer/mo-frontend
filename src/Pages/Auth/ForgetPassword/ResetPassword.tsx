import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { SmallCheck } from "../../../Assets/SVG";
import {
  Button,
  HelperText,
  Logo,
  Textfield,
  Typography
} from "../../../Components/Atoms";
import { messages } from "../../../Constants/messages";
import { handleCustomError, showToast } from "../../../Utils/helper";
import { RESET_PASSWORD } from "../../../sevices";

const ResetPasswd = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
    setFieldError,
    setErrors,
  } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .required("password is Required")
        .min(8, messages.ENTER_PASS_MIN_CHAR)
        .max(20,messages.ENTER_PASS_MAX_CHAR)
        .matches(/[a-z]/, messages.ENTER_LOWERCASE_CHAR)
        .matches(/[0-9]/, messages.ENTER_NUMBER)
        .matches(/[A-Z]/, messages.ENTER_UPPERCASE_CHAR)
        .matches(/[!@#$%^&*]/, messages.ENTER_SPECL_CHAR),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), undefined], messages.ENTERED_PASS_MATCH)
        .required(messages.ENTER_CONFIRM_PASS),
    }),
    onSubmit: () => {
      handleResetPassword();
    },
  });

  async function handleResetPassword() {
    const token = searchParams.get("token");
    try {
      setIsLoading(true);
      await RESET_PASSWORD({
        token: token,
        password: values.password,
        confirm_password: values.confirmPassword,
      });
      showToast("Reset Password Successfully", "success");
      navigate("/signin");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Logo position="start" />
      <div className="flex flex-col justify-between h-calc">
        <div className="flex flex-col items-center ">
          <div className="mt-[8px]">
            <Typography
              type="h1"
              label="Reset Password"
              FontSize="4xl"
              color="primary"
              variant={200}
            />
          </div>

          <div className="pt-[108px]">
            <Typography
              label="Create new password"
              FontSize="xl"
              color="primary"
              variant={200}
              type="h2"
            />
          </div>
          <form onSubmit={handleSubmit} className="mt-[22px] w-[332px] ">
            <div>
              <Typography
                label="Password"
                type="p"
                color="primary"
                variant={200}
                FontSize="sm"
                classname=" font-bold "
              />

              <Textfield
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeHolder="Create new password"
              />
              {touched.password && errors.password && (
                <HelperText
                  position="right"
                  label={errors.password}
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
              <div className="md:w-[345px] ">
                <div className="flex flex-col  md:flex-row flex-wrap  gap-x-[10px] gap-y-[5px] mt-[10px] ">
                  <div className=" flex gap-[3px]">
                    <SmallCheck
                      fill={/[a-z]/.test(values.password) ? "green" : ""}
                    />
                    <Typography
                      label="Atleast one lowercase character"
                      classname={` mt-[-4px]  ${
                        /[a-z]/.test(values.password)
                          ? "text-text-sucess-100"
                          : ""
                      }`}
                      color="primary"
                      FontSize="xxs"
                      variant={50}
                      type="p"
                    />
                  </div>
                  <div className="flex gap-[3px]">
                    <SmallCheck
                      fill={/[0-9]/.test(values.password) ? "green" : ""}
                    />
                    <Typography
                      label="Atleast one number character"
                      FontSize="xxs"
                      type="p"
                      classname={`mt-[-4px] ${
                        /[0-9]/.test(values.password)
                          ? "text-text-sucess-100"
                          : ""
                      }`}
                      color="primary"
                      variant={50}
                    />
                  </div>
                  <div className=" flex gap-[3px] ">
                    <SmallCheck
                      fill={/[A-Z]/.test(values.password) ? "green" : ""}
                    />
                    <Typography
                      label="Atleast one uppercase character"
                      FontSize="xxs"
                      type="p"
                      classname={`mt-[-4px] ${
                        /[A-Z]/.test(values.password)
                          ? "text-text-sucess-100"
                          : ""
                      }`}
                      color="primary"
                      variant={50}
                    />
                  </div>
                  <div className=" flex gap-[3px]">
                    <SmallCheck
                      fill={/[!@#$%^&*]/.test(values.password) ? "green" : ""}
                    />
                    <Typography
                      label="Atleast one special character"
                      FontSize="xxs"
                      type="p"
                      classname={`mt-[-4px] ${
                        /[!@#$%^&*]/.test(values.password)
                          ? "text-text-sucess-100"
                          : ""
                      }`}
                      color="primary"
                      variant={50}
                    />
                  </div>
                 
                </div>
              </div>
            </div>

            <div className="mt-[20px]">
              <Typography
                label="Confirm Password"
                type="p"
                color="primary"
                variant={200}
                FontSize="sm"
                classname=" font-bold "
              />

              <Textfield
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                placeHolder="Confirm Password"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <HelperText
                  position="right"
                  label={errors.confirmPassword}
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
            </div>

            <div className="flex justify-end">
              <div className="">
                <div className="mt-[30px] w-[100px]">
                  <Button
                    onClick={handleSubmit}
                    disable={isLoading}
                    type="submit"
                    label="Confirm"
                    color="primary"
                    variant="standard"
                    size="small"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        
      </div>
    </>
  );
};

export default ResetPasswd;
