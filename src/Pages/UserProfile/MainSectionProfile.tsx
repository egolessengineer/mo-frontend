import countryList from "../../Assets/CountryData/index.json";
import {
  Button,
  HelperText,
  Textfield,
  Typography,
} from "../../Components/Atoms";
import { Option } from "../../Components/Molecules";

const MainSectionProfile = ({
  formik,
  setSelectForm,
  isLoading,
  handleSetImageValue,
  handleDiscardChanges,
  isDiscardButton,
  setISDiscardButton,
}: any) => {
  return (
    <div className="flex flex-col items-center space-y-5 w-full">
      <form
        onMouseEnter={() => {
          setSelectForm(true);
        }}
        onSubmit={formik.handleSubmit}
        className="shadow-navbar rounded-[5px] min-w-fit w-full max-w-4xl"
      >
        <div className="px-5 pb-[10px] pt-5 border-b-[1px] border-text-gray-50">
          <Typography
            label={"Profile"}
            classname="font-bold text-text-HeadLine-100 "
            FontSize="base"
            type="p"
          />
        </div>
        <div className="mx-5 mt-[10px] mb-5   flex flex-col lg:flex-row gap-5 items-center lg:items-start  ">
          <div className="w-[14%] h-[100px] relative">
            {formik.values.profileImage ? (
              <img
                src={formik.values.profileImage}
                width="120px"
                height="120px"
                className="w-full h-full object-cover rounded-full"
                alt=""
              />
            ) : (
              <div className="bg-[#3498db] text-white flex justify-center items-center rounded-full w-full h-full text-2xl font-semibold">
                G
              </div>
            )}
            <div className="absolute lg:top-[70%] top-[76%] right-0 md:right-[40%] lg:right-0">
              <label className="cursor-pointer group" htmlFor="primage">
                <img
                  className="group-hover:scale-105 transition-all"
                  src="/Assets/ProfileCamera.svg"
                  alt=""
                />
              </label>
              <input
                type="file"
                id="primage"
                name="primage"
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={async (e) => {
                  const { files } = e.target;
                  let imgurl = await handleSetImageValue(files);
                  formik.setFieldValue("profileImage", imgurl);
                }}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <div className="  md:w-[314px] w-full  ">
                <Typography
                  label={"Name"}
                  color="primary"
                  variant={200}
                  FontSize="sm"
                  classname="font-bold "
                  type="p"
                />
                <Textfield
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeHolder="Enter Name"
                  type="text"
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
              <div className="  md:w-[314px] w-full ">
                <Typography
                  label={"Email"}
                  color="primary"
                  variant={200}
                  FontSize="sm"
                  classname="font-bold "
                  type="p"
                />
                <Textfield
                  type="text"
                  name="email"
                  placeHolder="Enter Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  disable={true}
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
            </div>
            <div className="flex flex-col md:flex-row justify-between mt-[10px]  gap-5">
              <div className="  md:w-[314px] w-full ">
                <Typography
                  label={"Mobile No."}
                  color="primary"
                  variant={200}
                  FontSize="sm"
                  classname="font-bold  "
                  type="p"
                />
                <div className="flex border-[1px] rounded-[5px] border-text-gray-50">
                  {/* <div className="relative">
                    <Option
                      options={["+91", "+01"]}
                      placeholder="+91"
                      buttonClassName="w-[60px]  border-none  "
                      Title=""
                    />
                  </div> */}
                  <Textfield
                    style={{ border: "none" }}
                    type="phone"
                    name="phoneNumber"
                    placeHolder="Enter phone number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                  />
                </div>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <HelperText
                      position="right"
                      label={formik.errors.phoneNumber}
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
            </div>
            <div className="">
              <Typography
                label={"About"}
                color="primary"
                variant={200}
                classname="font-bold "
                type="p"
              />
              <Textfield
                name="about"
                multiline={true}
                placeHolder="Write few things about yourself"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.about}
              />
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
          </div>
        </div>
        <div className="flex justify-center space-x-5 mb-5">
          <div className="w-[156px]">
            <Button
              onMouseEnter={() => setISDiscardButton(false)}
              label="Discard Changes"
              size="small"
              color="secondary"
              variant="Transparent"
              disable={isLoading}
              onClick={handleDiscardChanges}
            />
          </div>
          <div className="w-[100px]">
            <Button
              onMouseEnter={() => setISDiscardButton(true)}
              type="submit"
              label="Save"
              size="small"
              disable={isLoading}
            />
          </div>
        </div>
      </form>
      <form
        onMouseEnter={() => {
          setSelectForm(false);
        }}
        onSubmit={formik.handleSubmit}
        className="shadow-navbar rounded-[5px] min-w-fit w-full max-w-4xl"
      >
        <div className="px-5 pb-[10px] pt-5 border-b-[1px] border-text-gray-50 ">
          <Typography
            label={"Address"}
            classname="font-bold text-text-HeadLine-100 "
            FontSize="base"
            type="p"
          />
        </div>
        <div className="px-5 pt-[10px] b-5 flex flex-col gap-y-[10px] ">
          <div className="flex flex-col md:flex-row gap-5 ">
            <div className="md:w-[384px]  w-full ">
              {" "}
              <Typography
                label={"Street Address"}
                color="primary"
                variant={200}
                classname="font-bold "
                type="p"
                FontSize="sm"
              />
              <Textfield
                type="text"
                name="street"
                placeHolder="Enter Street Address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.street}
              />
              {formik.touched.street && formik.errors.street && (
                <HelperText
                  position="right"
                  label={formik.errors.street}
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
            <div className="lg:w-[384px] w-full ">
              {" "}
              <Typography
                label={"City"}
                color="primary"
                variant={200}
                classname="font-bold "
                FontSize="sm"
                type="p"
              />
              <Textfield
                type="text"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                placeHolder="Enter city"
              />
              {formik.touched.city && formik.errors.city && (
                <HelperText
                  position="right"
                  label={formik.errors.city}
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
          </div>
          <div className="flex flex-row gap-5">
            <div className="md:w-[384px] w-full ">
              {" "}
              <Typography
                label={"State/Province"}
                color="primary"
                variant={200}
                classname="font-bold "
                type="p"
                FontSize="sm"
              />
              <Textfield
                type="text"
                name="state"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
                placeHolder="state"
              />
              {formik.touched.state && formik.errors.state && (
                <HelperText
                  position="right"
                  label={formik.errors.state}
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
            <div className="lg:w-[384px] w-full ">
              <Typography
                label={"ZIP/Postal Code"}
                color="primary"
                variant={200}
                classname="font-bold "
                FontSize="sm"
                type="p"
              />
              <Textfield
                type="text"
                name="postalCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postalCode}
                placeHolder="123456"
              />
              {formik.touched.postalCode && formik.errors.postalCode && (
                <HelperText
                  position="right"
                  label={formik.errors.postalCode}
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
          </div>
          <div className="lg:w-[384px] w-full relative">
            <Option
              Title={"Country"}
              value={formik.values.country}
              handledropDown={(e: any) => {
                formik.setFieldValue("country", e.name);
              }}
              placeholder="select"
              options={countryList}
              optionLabel="name"
            />
            {formik.touched.country && formik.errors.country && (
              <HelperText
                position="right"
                label={formik.errors.country}
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
        </div>
        <div className="flex justify-center gap-x-5 my-5">
          <div className="w-[156px]">
            <Button
              onMouseEnter={() => setISDiscardButton(false)}
              label="Discard Changes"
              variant="Transparent"
              color="secondary"
              size="small"
              disable={isLoading}
              onClick={handleDiscardChanges}
            />
          </div>
          <div className="w-[100px]">
            <Button
              onMouseEnter={() => setISDiscardButton(true)}
              type="submit"
              label="Save"
              size="small"
              disable={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MainSectionProfile;
