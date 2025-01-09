import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { PasswordIcon, ShowPasswordIcon } from "../../../Assets/SVG/EyeIcon";
import {
  Button,
  HelperText,
  Logo,
  Textfield,
  Typography,
} from "../../../Components/Atoms";
import { API_ROUTES } from "../../../Constants/apiRoutes";
import { messages } from "../../../Constants/messages";
import { handleCustomError } from "../../../Utils/helper";
import { SIGNIN } from "../../../sevices";

const SignIn = () => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [typePassword , setTypePassword] = useState(false)

  function handleChangePasswordType(){
    setTypePassword(prev => !prev)
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(messages.ERROR_ENTER_EMAIL)
        .required(messages.ENTER_EMAIL),
      password: Yup.string().required(messages.ENTER_PASS),
    }),
    onSubmit: (values) => {
      signIn();
    },
  });

  const signIn = async () => {
    try {
      setIsLoading(true);
      let body = {
        ...formik.values,
        email: formik.values.email.toLowerCase(),
      };
      let data = await SIGNIN(body);
      localStorage.setItem("access_token", data?.data?.access_token);
      window.location.href = "/redirect";
    } catch (error) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex  flex-row h-screen overflow-hideen">
      <div className="bg-primary-50  lg:w-1/2 shadow-custom "></div>
      <div className="w-screen lg:w-1/2 h-full overflow-auto">
        <Logo position="end" Shadow={false} />
        <div className="flex align-middle justify-center mt-[10px] ">
          <Typography
            type="h1"
            label="Hi there!"
            color="primary"
            variant={50}
            FontSize="7xl"
            family="poppins"
            classname="font-bold text-primary-200 "
          />
        </div>
        <div className="flex justify-center ml-[25px]  ">
          <Typography
            type="h2"
            label="Welcome To The M.O."
            color="primary"
            variant={50}
            classname="font-normal "
            FontSize="3xl"
          />
        </div>
        <div className="flex  mt-[30px] flex-col items-center xs:space-y-4 lg:flex lg:flex-row lg:space-y-0 justify-center lg:space-x-5">
          <div className="md:w-1/2 p-5">
            <Button
              label="Log in with Google"
              color="primary"
              variant="Transparent"
              size="xm"
              icon={
                <img
                  src="/Assets/Google.svg"
                  className="mr-[10px]"
                  alt="error"
                />
              }
              onClick={() => window.open(API_ROUTES.GOOGLE_SIGNUP, "_self")}
            />
          </div>

         
        </div>

        <div className=" flex flex-row justify-center py-4 mt-[20px]">
          <div className="w-[50px] bg-text-primary-100 h-[1px]  "></div>
          <Typography
            type="p"
            label="Or"
            FontSize="xs"
            classname="mt-[-9px] ml-[10px] mr-[10px]"
          />
          <div className="w-[50px] bg-text-primary-100  h-[1px] "></div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex justify-center items-center"
        >
          <div className="md:w-1/2 p-5 justify-center">
            <div className="flex justify-center mt-[20px] flex-col">
              <Textfield
                type="text"
                placeHolder="Your email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email.toLowerCase()}
                disable={isLoading}
              />
              {formik.touched.email && formik.errors.email && (
                <HelperText
                  position="right"
                  label={formik.errors.email}
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
            <div className="flex justify-center mt-[20px] flex-col">
              <Textfield
                rightIcon={typePassword ?<ShowPasswordIcon /> : <PasswordIcon />}
                onClick={(e:any)=>{
                  e.preventDefault()
                  handleChangePasswordType()
                }}
                iconClassName="!right-5"
                type={typePassword ? "text":"password"}
                placeHolder="Password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                disable={isLoading}
              />
              {formik.touched.password && formik.errors.password && (
                <HelperText
                  position="right"
                  label={formik.errors.password}
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
              <div className="flex justify-end mt-[10px]">
                <Link to="/forget-password">
                  <HelperText
                    label="Forgot Password?"
                    color="secondary"
                    className="text-text-secondary-50 text-xs font-medium"
                  />
                </Link>
              </div>
            </div>
            <div className="flex justify-center mt-[30px]">
              <Button
                label="Login"
                type="submit"
                color="primary"
                variant="standard"
                size="large"
                loading={isLoading}
              />
            </div>

            <div className="flex justify-center items-center mt-[20px]">
              <HelperText label="Don’t have an account?" />
              <Link to="/signup">
                <HelperText
                  label="sign up"
                  color="secondary"
                  className="ml-1 text-text-secondary-50"
                />{" "}
              </Link>
            </div>
          </div>
        </form>
        <div className="flex justify-between w-full   ">
          <div className="ml-[15px] mt-[40px]">
            <HelperText
              label="info@the-mo.net"
              icon={
                <img
                  src="/Assets/Mail.svg"
                  className="mt-[5px] "
                  alt="error"
                ></img>
              }
              iconPosition="left"
            />
            <div className="py-2 mt-[13px]">
              <HelperText
                label="+447500 058 202"
                icon={
                  <img
                    src="/Assets/Phone.svg"
                    className="mt-[5px] "
                    alt="error"
                  ></img>
                }
                iconPosition="left"
              />
            </div>
          </div>
          <div className="flex justify-end items-end mr-[10px] ">
            <HelperText
              label="Privacy Policy"
              color="info"
              className="text-xxs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
