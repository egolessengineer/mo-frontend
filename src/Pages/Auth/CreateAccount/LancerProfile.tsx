import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import DefaultPhoto from "../../../Assets/IMAGES/DefaultPhoto.png";
import { Button, Logo } from "../../../Components/Atoms";
import { Loader } from "../../../Components/Atoms/Loader";
import { messages } from "../../../Constants/messages";
import { AuthState } from "../../../Context/auth";
import { handleCustomError, showToast } from "../../../Utils/helper";
import { ABOUT, ADDRESS, DOCUMENT_UPLOAD, EXPERIENCE } from "../../../sevices";
import About from "./About";
import Address from "./Address";
import Experience from "./ProviderSignup/Experience";
import Wallet from "./Wallet";

const LancerProfile = () => {
  const { user, refetch } = AuthState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [protfoliolink, setPortfolioLink] = useState<string[]>([]);
  const [profile_image, setProfile_image] = useState("");
  const [isfirstLoad, setISfirstLoad] = useState(true)
  const [userDetails, setUserDetails] = useState <any> ()
  let items: any;
  if (user) {
    let { role } = user;
    items =
      role === "PROVIDER"
        ? ["About", "Address", "Experience", "Wallet"]
        : ["About", "Address", "Wallet"];
  }
  const [Active, SetActive] = useState<number | null>(0);

  let initialValues = {
    name: userDetails?.About?.name || "",
    about: userDetails?.About?.about || "",
    phone_number: userDetails?.About?.phoneNumber || "",
    profile_image: userDetails?.About?.profilePictureLink || "",
    portfolio_link: "",
    street: (userDetails?.Address && userDetails?.Address[0]?.street as string) || "",
    city: (userDetails?.Address && userDetails?.Address[0]?.city as string) ||"",
    state: (userDetails?.Address && userDetails?.Address[0]?.state as string) ||"",
    postal_code: (userDetails?.Address && userDetails?.Address[0]?.postalCode as string) ||"",
    country: (userDetails?.Address && userDetails?.Address[0]?.country as string)  || "",
    position: (userDetails?.Experiences && userDetails?.Experiences[0]?.position as string) || "",
    company: (userDetails?.Experiences &&  userDetails?.Experiences[0]?.company as string) || "",
  };

  const handleformikvalidation = () => {
    if (Active === 0) {
      return yup.object({
        name: yup
          .string()
          .required(messages.ENTER_NAME)
          .matches(/^[^ \t][a-zA-Z_ ]*$/, "Please enter only character")
          .min(1, messages.ENTER_MIN_CHAR)
          .max(250, messages.ENTER_MAX_CHAR),
      });
    } else if (user?.role === "PROVIDER" && Active === 2) {
      return yup.object({
        position: yup
          .string()
          .required("Position required")
          .matches(/^[^ \t][a-zA-Z_ ]*$/, "Please enter only character")
          .min(1, messages.ENTER_MIN_CHAR)
          .max(50, messages.ENTER_MAX_CHAR),
        company: yup
          .string()
          .required("Company name required")
          .matches(/^[^ \t][a-zA-Z_ ]*$/, "Please enter only character")
          .min(1, messages.ENTER_MIN_CHAR)
          .max(50, messages.ENTER_MAX_CHAR)
      });
    }
  };

  let formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: handleformikvalidation(),
    onSubmit: () => {
      if (Active === 0) {
        handleAbout();
      } else if (Active === 1) {
        handleSubmitAddress();
      } else if (user?.role === "PROVIDER" && Active === 2) {
        handleSubmitExperience();
      }
    },
  });

  async function handleAbout() {
    try {
      setIsLoading(true);
      
      const {name, phone_number, about, profile_image} = formik.values
      let body: any = {
        portfolio: [...protfoliolink],
      };

      if(name) body['name'] = name
      if(phone_number) body['phone_number'] = +phone_number
      if (about) body['about'] = about
      if (profile_image){
        body["profile_image"] = profile_image
      }
      else{        
       await fetch(DefaultPhoto)
              .then(async response => {                
                const blob = await response.blob()
                const file = new File([blob], "defaultFile")               
                let formdata = new FormData();
                formdata.append("file", file);
                let res = await DOCUMENT_UPLOAD(formdata)                
                body["profile_image"] = res?.data
              })
      }

      await ABOUT(body);
      setUserDetails({
        ...userDetails,
        isAboutComplete : true,
        About: { ...userDetails.About, ...body, profilePictureLink: body?.profile_image  ,  phoneNumber: +phone_number, portfolioLink : [...protfoliolink] },
      });
      showToast("Data Saved", "success");
      handleContinue();
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmitAddress() {
    try {
      setIsLoading(true);
      let body :any = {};
      const {street , city , state, postal_code, country} = formik.values
      if (street) body["street"] = street;
      if (city) body["city"] = city;
      if (state) body["state"] = state;
      if (postal_code) body["postal_code"] = postal_code;
      if (country) body["country"] = country;
      
      await ADDRESS(body);
      setUserDetails({...userDetails, isAddressComplete: true, Address : [{...userDetails.Address[0] , ...body , postalCode:postal_code}]})
      showToast("Data Saved", "success");
      handleContinue();
      refetch()
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmitExperience() {
    try {
      setIsLoading(true);
      let body = {
        position: formik.values.position,
        company: formik.values.company,
      };

      await EXPERIENCE(body);
      setUserDetails({ ...userDetails, isExperienceComplete: true, Experiences: [...userDetails.Experiences, { ...body }] })
      showToast("Data Saved", "success");
      handleContinue();
      refetch()
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  let selected = items?.[0];
  if (Active !== null) {
    selected = items?.[Active];
  } else {
    console.log("Active is null");
  }

  function handleBack() {
    if (Active !== null && Active !== 0) {
      SetActive(Active - 1);
    }
  }

  function handleContinue() {
    if (Active !== null && Active !== items.length - 1) {
      SetActive(Active + 1);
    }
  }

  useEffect(() => {
    if(Active === 0){
      if (
        user?.role === "PURCHASER" &&
        user?.isAboutComplete
    ) {
      navigate("/");
    } else if (
      user?.role === "PROVIDER" &&
      user?.isAboutComplete &&      
      user?.isExperienceComplete &&
      (user?.walletAddress ||
      user?.walletAddress !== "")
    ) {
      navigate("/");
    }
    setUserDetails({...user})
  }
    setISfirstLoad(false);
  }, [user]);

  if (isfirstLoad) {
    return <Loader />;
  }
  return (
    <>
      <Logo />
      <div className="flex flex-col justify-between h-calc">
        <div className=" hidden sm:block">
          <div className="flex justify-center  ">
            {items &&
              items.map((element: any, index: any) => {
                const isActive = index === Active;
                return (
                  <div
                    key={index}
                    className=" border-b border-text-primary-300"
                  >
                    <div className="ml-[7px] mr-[7px]">
                      <Button
                        label={element}
                        variant="line"
                        color="primary"
                        size="large"
                        className={` pb-[20px] text-4xl text-text-gray-50  ${
                          index === Active
                            ? "text-4xl text-text-secondary-50 border-b-4 border-text-secondary-50"
                            : ""
                        } `}
                        onClick={() => {
                          // handleClick(index);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="flex  flex-col items-center  h-full">
          {selected === "About" && (
            <About
              handleBack={handleBack}
              handleContinue={handleContinue}
              selected={selected}
              protfoliolink={protfoliolink}
              setPortfolioLink={setPortfolioLink}
              profile_image={profile_image}
              setProfile_image={setProfile_image}
              formik={formik}
              loader={isLoading}
            />
          )}
          {selected === "Address" && (
            <Address
              handleBack={handleBack}
              handleContinue={handleContinue}
              selected={selected}
              role={user?.role}
              formik={formik}
              loader={isLoading}
            />
          )}
          {selected === "Experience" && (
            <Experience
              handleBack={handleBack}
              handleContinue={handleContinue}
              selected={selected}
              formik={formik}
              loader={isLoading}
            />
          )}
          {selected === "Wallet" && (
            <Wallet
              handleBack={handleBack}
              handleContinue={handleContinue}
              selected={selected}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LancerProfile;
