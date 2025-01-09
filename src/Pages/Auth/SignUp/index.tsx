import React, { useState } from "react";
import {
  Typography,
  Logo,
  Button,
  Textfield,
  HelperText,
  CheckBoxAtom,
} from "../../../Components/Atoms";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SmallCheck } from "../../../Assets/SVG";
import { messages } from "../../../Constants/messages";
import { SIGNUP } from "../../../sevices";
import { handleCustomError, showToast } from "../../../Utils/helper";
import { API_ROUTES } from "../../../Constants/apiRoutes";
import { PasswordIcon, ShowPasswordIcon } from "../../../Assets/SVG/EyeIcon";

const SignUp = () => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [typePassword , setTypePassword] = useState(false)
  const [typeConfiprmPassword , setTypeConfirmPassword] = useState(false)

  function handleChangePasswordType(isPwd:boolean){
    isPwd?
    setTypePassword(prev => !prev) :
    setTypeConfirmPassword(prev => !prev)
  }
  

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirm_password: "",
      role: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(messages.ERROR_ENTER_EMAIL)
        .required(messages.ENTER_EMAIL),
      name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required(messages.ENTER_NAME)
        .matches(/^[A-Za-z ]+$/, messages.ERROR_ENTER_ONLY_CHARACTERS),
      password: Yup.string()
        .required(messages.ENTER_PASS)
        .min(8, messages.ENTER_PASS_MIN_CHAR)
        .matches(/[a-z]/, messages.ENTER_LOWERCASE_CHAR)
        .matches(/[0-9]/, messages.ENTER_NUMBER)
        .matches(/[A-Z]/, messages.ENTER_UPPERCASE_CHAR)
        .matches(/[!@#$%^&*]/, messages.ENTER_SPECL_CHAR),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), undefined], messages.ENTERED_PASS_MATCH)
        .required(messages.ENTER_CONFIRM_PASS),
    }),
    onSubmit: (values) => {
      signUp();
    },
  });

  const signUp = async () => {
    try {
      setIsLoading(true);
      let body = {
        ...formik.values,
      };
      let data = await SIGNUP(body);
      console.log(data);
      showToast(messages.SUCCESS_REGISTERED, "success");

      navigation("/verify", {
        state: { email: formik.values.email, key: "signup" },
      });
    } catch (error) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Logo position="start" />
      <div className="flex items-center flex-col mt-[8px]">
        <Typography
          label="Create your account"
          color="primary"
          variant={200}
          type="h1"
          FontSize="4xl"
        />
        <form onSubmit={formik.handleSubmit} className="w-full md:w-1/4 p-5">
          <Button
            label="Sign up with Google"
            color="primary"
            variant="Transparent"
            size="xm"
            icon={
              <img src="/Assets/Google.svg" className="mr-[10px]" alt="error" />
            }
            onClick={() => window.open(API_ROUTES.GOOGLE_SIGNUP, "_self")}
          />
          <div className=" flex items-center justify-center py-4 mt-[15px]">
            <div className="w-[50px] bg-text-primary-100 h-[1px]  "></div>
            <Typography
              type="p"
              label="or"
              FontSize="xs"
              classname="mt-[-5px] ml-[10px] mr-[10px]"
            />
            <div className="w-[50px] bg-text-primary-100  h-[1px] "></div>
          </div>
          <div className="space-y-5">
            {/* //!email */}
            <div className="mt-[15px]">
              <Typography
                label="Name"
                type="p"
                FontSize="sm"
                color="primary"
                variant={700}
              />
              <Textfield
                type="text"
                placeHolder="Enter name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                disable={isLoading}
              />
              {formik.touched.name && formik.errors.name && (
                <HelperText
                  position="right"
                  label={formik.errors.name}
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
            <div>
              <Typography
                label="Email Id"
                type="p"
                FontSize="sm"
                color="primary"
                variant={700}
              />
              <Textfield
                type="text"
                placeHolder="Enter Email id"
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
            <div className="">
              <Typography
                label="Password"
                type="p"
                FontSize="sm"
                color="primary"
                variant={700}
              />
              <Textfield
                rightIcon={typePassword ?<ShowPasswordIcon /> : <PasswordIcon />}
                iconClassName="!right-5"
                type={typePassword ? "text":"password"}
                onClick={(e:any)=>{
                  e.preventDefault()
                  handleChangePasswordType(true)
                }}
                placeHolder="Create new password"
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
              <div className="md:w-[360px] ">
                <div className="flex flex-col  md:flex-row flex-wrap  gap-x-[10px] gap-y-[5px] mt-[10px] ">
                  <div className=" flex gap-[5px]">
                    <SmallCheck
                      fill={/[a-z]/.test(formik.values.password) ? "green" : ""}
                    />
                    <Typography
                      label="Atleast one lowercase character"
                      classname=" mt-[-4px]"
                      color="primary"
                      FontSize="xxs"
                      variant={50}
                      type="p"
                    />
                  </div>
                  <div className="flex gap-[5px]">
                    <SmallCheck
                      fill={/[0-9]/.test(formik.values.password) ? "green" : ""}
                    />
                    <Typography
                      label="Atleast one number character"
                      FontSize="xxs"
                      type="p"
                      classname="mt-[-4px]"
                      color="primary"
                      variant={50}
                    />
                  </div>
                  <div className=" flex gap-[5px] ">
                    <SmallCheck
                      fill={/[A-Z]/.test(formik.values.password) ? "green" : ""}
                    />
                    <Typography
                      label="Atleast one uppercase character"
                      FontSize="xxs"
                      type="p"
                      classname="mt-[-4px]"
                      color="primary"
                      variant={50}
                    />
                  </div>
                  <div className=" flex gap-[5px]">
                    <SmallCheck
                      fill={
                        /[!@#$%^&*]/.test(formik.values.password) ? "green" : ""
                      }
                    />
                    <Typography
                      label="Atleast one special character"
                      FontSize="xxs"
                      type="p"
                      classname="mt-[-4px]"
                      color="primary"
                      variant={50}
                    />
                  </div>

                  <div className="gap-[5px] flex">
                    <SmallCheck
                      fill={formik.values.password.length >= 8 ? "green" : ""}
                    />
                    <Typography
                      label="8 character’s minimum"
                      FontSize="xxs"
                      type="p"
                      classname="mt-[-4px]"
                      color="primary"
                      variant={50}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Typography
                label="Confirm Password"
                type="p"
                FontSize="sm"
                color="primary"
                variant={700}
              />
              <Textfield
                rightIcon={typeConfiprmPassword ?<ShowPasswordIcon /> : <PasswordIcon />}
                type={typeConfiprmPassword ? "text":"password"}
                onClick={(e:any)=>{
                  e.preventDefault()
                  handleChangePasswordType(false)
                }}
                iconClassName="!right-5"
                placeHolder="Confirm Password"
                name="confirm_password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirm_password}
                disable={isLoading}
              />
              {formik.touched.confirm_password &&
                formik.errors.confirm_password && (
                  <HelperText
                    position="right"
                    label={formik.errors.confirm_password}
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
              <div className="flex items-center space-x-2 mt-[10px]">
                <CheckBoxAtom
                  label={
                    <label
                      htmlFor="checkbox"
                      className="text-text-primary-300 text-xxs"
                    >
                      Send me Updates of M.O.
                    </label>
                  }
                />
              </div>
              <div className="flex items-center space-x-2 mt-[10px]">
                <CheckBoxAtom
                  label={
                    <label
                      htmlFor="checkbox"
                      className="text-text-primary-300  text-xxs "
                    >
                      I have read and agreed to the M.O.{" "}
                      <span className="text-text-secondary-50">
                        Term of Services{" "}
                      </span>
                      and{" "}
                      <span className="text-text-secondary-50">
                        Privacy Policy.
                      </span>
                    </label>
                  }
                  Onchange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                  checked={isCheckboxChecked}
                />
              </div>
            </div>
          </div>
          <div className="mt-[50px]">
            <Button
              label="Create Account"
              color="primary"
              variant="standard"
              size="large"
              type="submit"
              loading={isLoading}
              disable={!isCheckboxChecked}
            />
          </div>
          <div className="mt-[10px] flex flex-row justify-center gap-1">
            <HelperText label="Already have an account?" />
            <Link to="/signin">
              <HelperText label="sign in" color="secondary" />
            </Link>
          </div>
        </form>
      </div>
      <div className="flex justify-start w-[100px] m-5 ">
        <Button
          label="Back"
          variant="Transparent"
          color="secondary"
          size="small"
          onClick={() => navigation("/signin")}
        />
      </div>
    </>
  );
};

export default SignUp;
