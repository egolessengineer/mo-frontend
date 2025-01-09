import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import {
  Button,
  Drag,
  HelperText,
  Textfield,
  Typography,
} from "../../../Components/Atoms";
import { AuthState } from "../../../Context/auth";
import { handleCustomError } from "../../../Utils/helper";
import { DOCUMENT_UPLOAD } from "../../../sevices";



interface AboutProps {
  handleBack?: () => void;
  handleContinue?: () => void;
  selected: string;
  protfoliolink:any, 
  setPortfolioLink: (val:any)=>any
  profile_image:any;
  setProfile_image: (val:any) => any
  formik:any
  loader:boolean
}

const About = ({
  handleBack = () => {},
  handleContinue = () => {},
  selected,
  protfoliolink, 
  setPortfolioLink = ()=> {},
  profile_image,
  setProfile_image=()=> {},
  formik,
  loader,
}: AboutProps) => {
  const { user } = AuthState();
  const { About, role, isAboutComplete } = user;
  const [isLoading, setIsLoading] = useState(false);
  const [linethroughStyle, setLineThroughStyle] = useState<null | number>(null);


  function handleSkip(){
    handleContinue();
  }

  function handleAddPortfolioLink() {
    if(formik.touched.portfolio_link && formik.errors.portfolio_link){
      return
    }

    if(formik.values.portfolio_link){
      setPortfolioLink([...protfoliolink, formik.values?.portfolio_link]);
      formik.setFieldValue("portfolio_link", "");
    }
  }
  function handleRemoveProtfoliolink(id: number) {
    let rmprotfoliolink = protfoliolink.filter((link:any, idx:any) => idx !== id);
    setPortfolioLink(rmprotfoliolink);
  }

  async function handleSetImageValue(img: any) {
    if (img.length !== 0) {
      try {
        setIsLoading(true);
        let formdata = new FormData();
        formdata.append("file", img[0]);
        let res = await DOCUMENT_UPLOAD(formdata);       
        setProfile_image(res?.data)
        formik.setFieldValue("profile_image", res.data);
      } catch (error: any) {
        handleCustomError(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    if (role === "PROVIDER" && About) {
      setPortfolioLink([...About["portfolioLink"]]);
    }
  }, []);


  

  return (
    <>
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="w-[332px] mt-[50px] m-auto">
          <div className="">
            <Typography
              label="Name"
              type="p"
              FontSize="sm"
              color="primary"
              variant={200}
              classname="font-bold "
            />
            <Textfield
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeHolder="Enter Name"
              name="name"
            ></Textfield>
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

          <div className="mt-[18px]">
            <Typography
              label="About"
              type="p"
              FontSize="sm"
              color="primary"
              variant={200}
              classname="font-bold "
            />
            <Textfield
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.about}
              multiline={true}
              placeHolder="Write few things about yourself"
              name="about"
            ></Textfield>
            {formik.touched.about && formik.errors.about && (
              <HelperText
                position="right"
                label={formik.errors.about}
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
          {role === "PROVIDER" && (
            <div className="mt-[18px]">
              <Typography
                label="Portfolio/Website Link"
                type="p"
                FontSize="sm"
                color="primary"
                variant={200}
                classname="font-bold "
              />
              <Textfield
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.portfolio_link}
                placeHolder="Enter Link"
                name="portfolio_link"
              ></Textfield>
              {formik.touched.portfolio_link && formik.errors.portfolio_link && (
                <HelperText
                  position="right"
                  label={formik.errors.portfolio_link}
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
              <Button
                onClick={handleAddPortfolioLink}
                className="bg-zinc-300 text-text-primary-200 !w-fit px-5 ml-auto mt-3"
                label="Add Link"
                variant="standard"
                color="secondary"
                size="small"
              />
              <div className="mt-3">
                {protfoliolink.length !== 0 &&
                  protfoliolink.map((link:any, idx:any) => {
                    return (
                      <div
                        key={link + idx}
                        className="flex gap-2 justify-between items-center w-full"
                      >
                        <Typography
                          label={link}
                          type="p"
                          FontSize="sm"
                          color="primary"
                          variant={200}
                          classname={`!text-[10px] transition-all !w-[90%] break-words text-justify font-bold before:content-['_↗'] before:px-2 before:text-xs ${
                            linethroughStyle === idx
                              ? "text-text-gray-100 line-through decoration-red-400"
                              : ""
                          }`}
                        />
                        <XMarkIcon
                          onClick={() => handleRemoveProtfoliolink(idx)}
                          onMouseEnter={() => setLineThroughStyle(idx)}
                          onMouseLeave={() => setLineThroughStyle(null)}
                          className="h-3 w-3 hover:h-4 hover:w-4 transition-all text-text-danger-50 cursor-pointer"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          <div className="mt-[18px]">
            <Typography
              label="Phone No."
              type="p"
              FontSize="sm"
              color="primary"
              variant={200}
              classname="font-bold "
            />
            <Textfield
              type="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone_number}
              placeHolder="+91-1234567890"
              name="phone_number"
            ></Textfield>
            {formik.touched.phone_number && formik.errors.phone_number && (
              <HelperText
                position="right"
                label={formik.errors.phone_number}
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
          <div className="mt-[18px]">
            <Typography
              label="Attach Photo"
              type="p"
              FontSize="sm"
              color="primary"
              variant={200}
              classname="font-bold "
            />

            {formik.values.profile_image ? (
              <div className="w-full h-[200px] rounded-sm overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={`${formik.values.profile_image}`}
                  alt="profile"
                />
              </div>
            ) : (
              <div className="border border-dashed  border-text-gray-50 h-[68px] flex justify-center items-center">
                <Drag                  
                  acceptFiles={['image/jpeg', 'image/png']}
                  handleSetImageValue={(e) => {                             
                    handleSetImageValue(e);                   
                  }}
                  label={
                    <div className="flex">
                      <Typography
                        label="Drop your file or"
                        type="p"
                        color="primary"
                        FontSize="sm"
                        variant={50}
                      />
                      {isLoading ? (
                        <div className="pb-[2px] !ml-2 ">Loading...</div>
                      ) : (
                        <div className="pb-[2px] cursor-pointer !ml-2">
                          <HelperText
                            label="browse"
                            color="secondary"
                            className="text-sm underline"
                          />
                        </div>
                      )}
                    </div>
                  }
                />
                {formik.touched.profile_image && formik.errors.profile_image && (
                  <HelperText
                    position="right"
                    label={formik.errors.profile_image}
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
            )}
            <div className="flex flex-row justify-between">
              <HelperText
                className="text-xxs text-text-primary-100"
                label="400400px recommended."
              />
              <div className=" pb-[2px]">
                <HelperText
                  className="text-xxs text-text-primary-100"
                  label="JPGs, JPEGs and PNG Supported."
                ></HelperText>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-[40px] w-full">
          
          <div>
            <div className=" flex  relative m-5 z-10 ">
              {isAboutComplete && (
                <div className="w-[100px] mx-5">
                  <Button
                    onClick={handleSkip}
                    label="Skip"
                    variant="Transparent"
                    color="secondary"
                    size="small"
                  />
                </div>
              )}
              <div className="w-[105px]">
                <Button                 
                  disable={isLoading || loader}
                  type="submit"
                  label="Continue"
                  variant="standard"
                  color="primary"
                  size="small"
                />
              </div>
              
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default About;
