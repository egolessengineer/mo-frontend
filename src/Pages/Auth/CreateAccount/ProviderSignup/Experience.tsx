import moment from "moment";
import {
  Button,
  HelperText,
  Textfield,
  Typography,
} from "../../../../Components/Atoms";
import { AuthState } from "../../../../Context/auth";
interface ExperienceProps {
  handleBack?: () => void;
  handleContinue?: () => void;
  selected: string;
  formik:any;
  loader:boolean
}

const Experience = ({
  handleBack = () => { },
  handleContinue = () => { },
  selected,
  formik,
  loader,
}: ExperienceProps) => {
  const { user } = AuthState();

  const { isExperienceComplete } = user;

 
  function handleSkip() {
    handleContinue();
  }

  return (
    <>
      <form
        className="w-full h-full flex flex-col justify-between"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-[332px] mt-[30px] m-auto">
          <div className="felx-col  space-y-2.5 items-center ">
            <div className="">
              <Typography
                label="Position"
                type="p"
                FontSize="sm"
                color="primary"
                variant={200}
                classname="font-bold "
              />
              <Textfield
                type="text"
                name="position"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.position}
                placeHolder="select"
              />
              {formik.touched.position && formik.errors.position && (
                <HelperText
                  position="right"
                  label={formik.errors.position}
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
                label="Company"
                type="p"
                FontSize="sm"
                color="primary"
                variant={200}
                classname="font-bold "
              />
              <Textfield
                type="text"
                name="company"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.company}
                placeHolder="Search institute"
              />
              {formik.touched.company && formik.errors.company && (
                <HelperText
                  position="right"
                  label={formik.errors.company}
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
              {isExperienceComplete && <div className="w-[100px]">
                <Button
                  onClick={handleSkip}
                  label="Skip"
                  variant="Transparent"
                  color="secondary"
                  size="small"
                />
              </div>}
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

export default Experience;
