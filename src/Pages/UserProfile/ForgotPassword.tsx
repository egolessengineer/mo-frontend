import { SmallCheck } from "../../Assets/SVG";
import {
  Button,
  HelperText,
  Textfield,
  Typography,
} from "../../Components/Atoms";

export const ForgotPassword = ({formik ,setchangepassword}:any) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col lg:flex-row space-x-5 px-5 pt-[10px] pb-5 ">
        <div className="flex flex-col  gap-y-[10px] w-full lg:w-[593px]">
          <div>
            <Typography
              label={"Create New Password"}
              color="primary"
              variant={200}
              classname="font-bold "
              type="p"
              FontSize="sm"
            />
            <div className="">
              <Textfield
                type="password"
                name="new_password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.new_password}
                placeHolder="Enter new password"
              />
            </div>
            {formik.touched.new_password && formik.errors.new_password && (
              <HelperText
                position="right"
                label={formik.errors.new_password}
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
              label={"Confirm New Password"}
              color="primary"
              variant={200}
              classname="font-bold "
              type="p"
              FontSize="sm"
            />
            <div className="">
              <Textfield
                type="password"
                name="confirm_password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirm_password}
                placeHolder="Confirm password"
              />
            </div>
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
          </div>
        </div>
        <div className="flex lg:flex-col flex-col sm:flex-row flex-wrap">
          <div className="w-1/2">
            <HelperText
              label="Atleast one lowercase character"
              className={`text-xxs font-medium ${
                /[a-z]/.test(formik.values.new_password)
                  ? "text-text-sucess-100"
                  : ""
              }`}
              color="primary"
              icon={
                <div className="pt-[6px] ml-[4px]">
                  <SmallCheck
                      fill={/[a-z]/.test(formik.values.new_password) ? "green" : ""}
                    />
                </div>
              }
            />
          </div>
          <div className="w-1/2">
            <HelperText
              label="Atleast one number character"
              className={` text-xxs font-medium  ${
                /[0-9]/.test(formik.values.new_password)
                  ? "text-text-sucess-100"
                  : ""
              }`}
              color="primary"
              icon={
                <div className="pt-[6px] ml-[4px]">
                  <SmallCheck
                      fill={/[0-9]/.test(formik.values.new_password) ? "green" : ""}
                    />
                </div>
              }
            />
          </div>
          <div className="w-1/2 ">
            <HelperText
              label="Atleast one uppercase character"
              className={` text-xxs font-medium  ${
                /[A-Z]/.test(formik.values.new_password)
                  ? "text-text-sucess-100"
                  : ""
              }`}
              color="primary"
              icon={
                <div className="pt-[6px] ml-[4px]">
                   <SmallCheck
                      fill={/[A-Z]/.test(formik.values.new_password) ? "green" : ""}
                    />
                </div>
              }
            />
          </div>
          <div className="w-1/2">
            <HelperText
              label="Atleast one special character"
              className={` text-xxs font-medium  ${
                /[!@#$%^&*]/.test(formik.values.new_password)
                  ? "text-text-sucess-100"
                  : ""
              }`}
              icon={
                <div className="pt-[6px] ml-[4px]">
                  <SmallCheck
                      fill={/[!@#$%^&*]/.test(formik.values.new_password) ? "green" : ""}
                    />
                </div>
              }
            />
          </div>
          
        </div>
      </div>
      <div className="flex justify-center gap-5 mb-5 flex-wrap ">
        <div className="w-[100px]">
          <Button
            label="Cancel"
            color="secondary"
            variant="Transparent"
            size="small"
            onClick={() => {
              setchangepassword(false);
            }}
          />
        </div>
        <div className="w-[100px]">
          <Button
            type="submit"
            label="Save"
            size="small"            
          />
        </div>
      </div>
    </form>
  );
};
