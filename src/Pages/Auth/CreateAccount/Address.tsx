import { useEffect } from "react";
import countryList from '../../../Assets/CountryData/index.json';
import {
  Button,
  HelperText,
  Textfield,
  Typography,
} from "../../../Components/Atoms";
import { Option } from "../../../Components/Molecules";
import { AuthState } from "../../../Context/auth";

interface AddressProps {
  handleBack?: () => void;
  handleContinue?: () => void;
  selected: string;
  role?: any;
  formik:any;
  loader:boolean
}

const Address = ({
  handleBack = () => {},
  handleContinue = () => {},
  selected,
  role,
  formik,
  loader
}: AddressProps) => {
  const { user, setUser } = AuthState();
  function handleSkip() {
    handleContinue();
  }

  useEffect(()=>{
    setUser({...user , isAboutComplete: true})
  },[])

  return (
    <>
      <form
        className="w-full h-full flex flex-col justify-between"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-[332px] mt-[50px] m-auto">
          <div className="">
            <Typography
              label="Street Address"
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
              value={formik.values.street}
              placeHolder="2201, Elite Apartments"
              name="street"
            ></Textfield>
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
          <div className="mt-[18px]">
            <Typography
              label="City"
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
              value={formik.values.city}
              placeHolder="city"
              name="city"
            ></Textfield>
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
          <div className="mt-[18px]">
            <Typography
              label="State/Province"
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
              value={formik.values.state}
              placeHolder="state"
              name="state"
            ></Textfield>
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
          <div className="mt-[18px]">
            <Typography
              label="ZIP/Postal Code"
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
              value={formik.values.postal_code}
              placeHolder="123456"
              name="postal_code"
            ></Textfield>
            {formik.touched.postal_code && formik.errors.postal_code && (
              <HelperText
                position="right"
                label={formik.errors.postal_code}
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
          <div className="mt-[18px] relative">
            <Option
              value={formik.values.country}
              placeholder="Select Country"
              handledropDown={(e: any) => {
                formik.setFieldValue("country", e.name);                
              }}
              Title={
                <Typography
                  label="Country"
                  type="p"
                  FontSize="sm"
                  color="primary"
                  variant={200}
                />
              }
              options={countryList}
              optionLabel="name"
              buttonClassName="w-[332px] "
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
        <div className="flex justify-between mt-[40px] w-full">
          <div className="flex items-start  m-5 w-[100px] ">
            <Button
              onClick={handleBack}
              label="Back"
              variant="Transparent"
              color="secondary"
              size="small"
            />
          </div>
          <div>
            <div className=" flex  relative m-5 z-10 gap-5">
              {(
                <div className="w-[100px]">
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
                  disable={loader}
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

export default Address;
