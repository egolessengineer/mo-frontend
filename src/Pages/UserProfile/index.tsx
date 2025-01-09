import { useEffect, useState } from "react";
import { Button } from "../../Components/Atoms";
import { Structure } from "../../Components/Molecules";
import Password from "./Password";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader } from "../../Components/Atoms/Loader";
import { messages } from "../../Constants/messages";
import { AuthState } from "../../Context/auth";
import { handleCustomError, showToast } from "../../Utils/helper";
import {
  ADDRESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_OTP,
  DOCUMENT_UPLOAD,
  PROFILE,
  SEND_OTP,
  VERIFY_OTP
} from "../../sevices";
import MainSectionProfile from "./MainSectionProfile";

const Index = () => {
  const [activeBtn, setactiveBtn] = useState("Profile Setting");
  const { user, setUser } = AuthState();
  const [userDetails, setUserDetails] = useState<any>();
  const [selectform, setSelectForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [changepassword, setchangepassword] = useState(false);
  const [OtpState, setOtpState] = useState(false);
  const [otpval, setOtpVal] = useState(["","","","","",""]);
  const [isDiscardButton , setISDiscardButton] = useState(false)
  function handleClick(btnName: string) {
    setactiveBtn(btnName);
  }

  let Activesection;
  switch (activeBtn) {
    case "Profile Setting":
      Activesection = MainSectionProfile;
      break;
    case "Password":
      Activesection = Password;
      break;
    default:
      Activesection = MainSectionProfile;
      break;
  }

  const Profilevalidationschema = () => {
    if(activeBtn === "Password"){      
       if(!changepassword && OtpState){
        return Yup.object({
          otp:  Yup.string().required("Otp Is Required").min(6, "Enter valid Otp")
        }) 
      }
      else if(!changepassword){
        return Yup.object({
          old_password: Yup.string().required("old password is Required"),
        new_password: Yup.string()
        .required("new password is Required")
        .min(8, messages.ENTER_PASS_MIN_CHAR)
        .max(20,messages.ENTER_PASS_MAX_CHAR)
        .matches(/[a-z]/, messages.ENTER_LOWERCASE_CHAR)
        .matches(/[0-9]/, messages.ENTER_NUMBER)
        .matches(/[A-Z]/, messages.ENTER_UPPERCASE_CHAR)
        .matches(/[!@#$%^&*]/, messages.ENTER_SPECL_CHAR),
        confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password"), undefined], messages.ENTERED_PASS_MATCH)
        .required(messages.ENTER_CONFIRM_PASS),
      })
      }
      else if(!OtpState && changepassword){
        return Yup.object({
          new_password: Yup.string()
        .required("new password is Required")
        .min(8, messages.ENTER_PASS_MIN_CHAR)
        .max(20,messages.ENTER_PASS_MAX_CHAR)
        .matches(/[a-z]/, messages.ENTER_LOWERCASE_CHAR)
        .matches(/[0-9]/, messages.ENTER_NUMBER)
        .matches(/[A-Z]/, messages.ENTER_UPPERCASE_CHAR)
        .matches(/[!@#$%^&*]/, messages.ENTER_SPECL_CHAR),
        confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password"), undefined], messages.ENTERED_PASS_MATCH)
        .required(messages.ENTER_CONFIRM_PASS),
        })
      }
      
      
    }
    else if (selectform && isDiscardButton) {
      return Yup.object({
        name: Yup.string().required("Name is Required"),
        email: Yup.string().required("required"),
        phoneNumber: Yup.string().required("Enter Phone Number"),
        about: Yup.string().required("Required"),
      });
    } else if(!selectform && isDiscardButton) {
      return Yup.object({
        city: Yup.string().required("Enter city"),
        country: Yup.string().required("Select Country"),
        postalCode: Yup.string().required("Enter Pin-code"),
        state: Yup.string().required("Enter State"),
        street: Yup.string().required("Enter Street"),
      });
    }

    
  };



  let formik = useFormik({
    initialValues: {
      name: userDetails?.name || "",
      email: userDetails?.email || "",
      phoneNumber: userDetails?.About?.phoneNumber || "",
      profileImage: userDetails?.About?.profilePictureLink || "",
      about: userDetails?.About?.about || "",
      city: (userDetails?.Address && userDetails?.Address[0]?.city) || "",
      country: (userDetails?.Address && userDetails?.Address[0]?.country) || "",
      postalCode:
        (userDetails?.Address && userDetails?.Address[0]?.postalCode) || "",
      state: (userDetails?.Address && userDetails?.Address[0]?.state) || "",
      street: (userDetails?.Address && userDetails?.Address[0]?.street) || "",

      old_password: "",
      new_password: "",
      confirm_password: "",

      otp : ""
    },
    enableReinitialize: true,
    validationSchema: Profilevalidationschema(),
    onSubmit: (val , {resetForm}) => {
      if(activeBtn === "Password"){
         if(!changepassword && OtpState){
          handleVerifyOtp()          
        }
        else if(!changepassword){
          handleChangePassword()
          resetForm()
        }
        else if(!OtpState && changepassword){
          handleChangePasswordWithOtp()
          resetForm()
        }
      }
      else if (selectform && isDiscardButton) {
        handleSaveProfile();
      } else if(!selectform && isDiscardButton) {
        handleSaveAddress();
      }
    },
  });


  async function handleSetImageValue(img: any) {
    if (img.length !== 0) {
      try {
        setIsLoading(true);
        let formdata = new FormData();
        formdata.append("file", img[0]);
        let res = await DOCUMENT_UPLOAD(formdata);
        return res?.data;
      } catch (error: any) {
        handleCustomError(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function handleSaveProfile() {
    try {
      setIsLoading(true);
      let body = {
        name: formik.values.name,
        about: formik.values.about,
        phone_number: formik.values.phoneNumber,
        profile_image: formik.values.profileImage,
      };
      await PROFILE(body);
      setUser({
        ...user,
        About: {
          ...user.About,
          ...body,
          phoneNumber: formik.values.phoneNumber,
          profilePictureLink: formik.values.profileImage,
        },
      });
      showToast("Profile Data Saved", "success");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSaveAddress() {
    try {
      setIsLoading(true);
      let body = {
        street: formik.values.street,
        city: formik.values.city,
        state: formik.values.state,
        postal_code: formik.values.postalCode,
        country: formik.values.country,
      };

      await ADDRESS(body);
      setUser({
        ...user,
        Address: [
          {
            ...user.Address[0],
            ...body,
            postalCode: formik.values.postalCode,
          },
        ],
      });
      showToast("Address save Successfully", "success");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleDiscardChanges() {
    formik.setErrors({})
    formik.setTouched({})
    if (selectform) {
      formik.setFieldValue("name", user?.name);
      formik.setFieldValue("phoneNumber", user?.About?.phoneNumber);
      formik.setFieldValue("profileImage", user?.About?.profilePictureLink);
      formik.setFieldValue("about", user?.About?.about);
    } else {
      formik.setFieldValue("city", user?.Address[0]?.city);
      formik.setFieldValue("country", user?.Address[0]?.country);
      formik.setFieldValue("postalCode", user?.Address[0]?.postalCode);
      formik.setFieldValue("state", user?.Address[0]?.state);
      formik.setFieldValue("street", user?.Address[0]?.street);
    }    
  }


  async function handleChangePassword() {
    try {
      setIsLoading(true);
      let body = {
        old_password: formik.values.old_password,
        new_password: formik.values.new_password,
        confirm_password: formik.values.confirm_password,
      };
      await CHANGE_PASSWORD(body);
      showToast("Password Changed Successfully", "success");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSendOtp(){
    try {
      setIsLoading(true);      
      await SEND_OTP();
      showToast("OTP Sent to Your Registered Email ID", "success");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const validator = () => {
    setOtpState(false);
    setchangepassword(true);
  };

  async function handleVerifyOtp(){
    try {
      setIsLoading(true);
      let paramobj = {
        otp : formik.values.otp
      } 
      let param = "?" + new URLSearchParams(paramobj)      
      await VERIFY_OTP(param);
      validator()
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }


  async function handleChangePasswordWithOtp(){
    try {
      setIsLoading(true);
      let body = {
        otp: formik.values.otp,
        new_password: formik.values.new_password,
        confirm_password: formik.values.confirm_password
      }     
      await CHANGE_PASSWORD_OTP(body);
      showToast("Password Saved Successfully", "success");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    setUserDetails({ ...user });
  }, [user]);

  if (!userDetails || Object.keys(userDetails).length === 0) {
    return <Loader />;
  }

  return (
    <Structure
      Heading={"My Profile"}
      optionText={
        <>
          <Button
            variant="line"
            label="Profile Setting"
            className={`pl-[6px] text-text-primary-300 font-bold text-sm leading-5 ${
              activeBtn === "Profile Setting"
                ? "border-b-4 border-text-secondary-50 "
                : ""
            }  `}
            onClick={() => {
              handleClick("Profile Setting");
            }}
            size="small"
          />
          <Button
            variant="line"
            label="Password"
            className={`pl-[6px] text-text-primary-300 font-bold text-sm leading-5 ${
              activeBtn === "Password"
                ? "border-b-4 border-text-secondary-50 "
                : ""
            }  `}
            onClick={() => {
              handleClick("Password");
            }}
            size="small"
          />
        </>
      }
      mainSection={
        <Activesection
          formik={formik}
          setSelectForm={setSelectForm}
          isLoading={isLoading}
          handleSetImageValue={handleSetImageValue}
          handleDiscardChanges={handleDiscardChanges}         
          changepassword={changepassword} 
          setchangepassword={setchangepassword}
          OtpState={OtpState}
          setOtpState={setOtpState}
          handleSendOtp={handleSendOtp}   
          otpval={otpval} 
          setOtpVal={setOtpVal}
          isDiscardButton={isDiscardButton} 
          setISDiscardButton={setISDiscardButton}       
        />
      }
    />
  );
};

export default Index;
