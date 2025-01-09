import {
  Button,
  HelperText,
  Textfield,
  Typography,
} from "../../../Components/Atoms";
import { ModalAtom, Option } from "../../../Components/Molecules";

const SendNotePopUp = ({
  open,
  close,
  members,
  formik,
  isLoading,
  milestonesData,
  dropdownload,
}: any) => {
  return (
    <ModalAtom
      close={close}
      Title={
        <div className="flex justify-between bg-primary-100 px-5 py-4">
          <Typography
            label={"Send Note"}
            type="p"
            FontSize="base"
            classname="font-bold text-white "
          />

          <Button
            variant="line"
            label=""
            onClick={close}
            icon={<img src="/Assets/Close.svg" alt="" />}
          />
        </div>
      }
      description={
        <form onSubmit={formik.handleSubmit} className="px-5 pt-[13px] pb-5">
          <div className="flex space-x-1">
            <Typography
              label={"To"}
              color="primary"
              variant={200}
              classname="font-bold mt-[5px] "
              type="p"
            />
            <div className="relative w-full ">
              {formik.values.toName ? (
                <div className="border broder-[1px] border-text-gray-50 h-full rounded-md pl-3 flex items-center gap-3 w-full">
                  <div className="border broder-[1px] border-text-gray-50 my-2 py-1 rounded-sm flex justify-between items-center gap-3 w-fit">
                  <Typography
                    label={formik.values.toName || ""}
                    type="h3"
                    FontSize="sm"
                    color="primary"
                    classname="font-bold leading-5 "
                    variant={200}
                  />
                  <HelperText
                    className="cursor-pointer"
                    onClick={() => {
                      formik.setFieldValue("toId", "");
                      formik.setFieldValue("toName", "");
                    }}
                    label=""
                    icon={
                      <img
                        src="/Assets/Error.svg"
                        className="mt-[3px]"
                        alt="remove"
                      />
                    }
                  />
                  </div>
                </div>
              ) : (
                <Option
                  Title=""
                  handledropDown={(e: any) => {
                    formik.setFieldValue("toId", e?.userId);
                    formik.setFieldValue("toName", e?.User?.name);
                  }}
                  placeholder="Select Recipient"
                  options={members && members}
                  value={formik.values.toName}
                  optionLabel="User.name"
                  optionBeforeImg={true}
                />
              )}
            </div>
            {formik.touched.toName && formik.errors.toName && (
              <HelperText
                position="right"
                label={formik.errors.toName}
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
          <div className="mt-[10px] relative">
            <Option
              disabled={formik.values.toName ? false : true}
              Title=""
              handledropDown={(e: any) => {
                formik.setFieldValue("milestoneId", e?.id);
                formik.setFieldValue("milestoneName", e?.title);
              }}
              placeholder={milestonesData?.length > 0 ? "Select Milestone" : "No Data"}
              value={formik.values.milestoneName}
              options={milestonesData && milestonesData}
              optionLabel="title"
            />
            {formik.touched.milestoneName && formik.errors.milestoneName && (
              <HelperText
                position="right"
                label={formik.errors.milestoneName}
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
          <div className="mt-5">
            <Textfield
              multiline={true}
              name="message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              placeHolder="Type Note here...."
            />
            {formik.touched.message && formik.errors.message && (
              <HelperText
                position="right"
                label={formik.errors.message}
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
          <div className="mt-5 flex justify-end">
            <div className="w-[100px]">
              <Button
                type="submit"
                label="Send"
                size="small"
                disable={isLoading}
              />
            </div>
          </div>
        </form>
      }
      open={open}
      PanelPosition={"w-[960px]"}
    />
  );
};

export default SendNotePopUp;
