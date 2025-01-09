import { useEffect, useState } from "react";
import {
  Button,
  HelperText,
  Textfield,
  Typography,
} from "../../../Components/Atoms";
import { ModalAtom, Option } from "../../../Components/Molecules";
import { handleCustomError } from "../../../Utils/helper";
import { GET_DISPUTE_MEMEBERS } from "../../../sevices";



const RaiseDisputeNaturePopup = ({
  open,
  close,
  nextPopup,
  handlepopupBack = () => { },
  formik,
}: any) => {
  const [disputeMembers, setDisputeMembers] = useState<any>([]);
  const [raisedBy, setRaisedBy] = useState<any>();

  async function handleGetAllDisputeMembers(projectId: any) {
    try {
      let res = await GET_DISPUTE_MEMEBERS(projectId)

      let raisedBydata = res?.data.slice(0, res.data.length - 1)
      let raisedTodata = res?.data.slice(res.data.length - 1)

      setDisputeMembers(raisedBydata);
      setRaisedBy(raisedTodata[0]?.id)
    } catch (error) {
      handleCustomError(error);
    }
  }

  useEffect(() => {
    handleGetAllDisputeMembers(formik.values.projectId);
  }, []);

  return (
    <ModalAtom
      Title={
        <div className="bg-primary-100 flex justify-between px-[20px] py-[15px] rounded-t-[5px]">
          <Typography
            label={"Raise New Dispute"}
            type="p"
            classname="font-bold text-text-white-50 "
            FontSize="base"
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
        <form onSubmit={formik.handleSubmit} className="p-5">
          <div className="shadow-navbar rounded-[5px]">
            <div className="px-5 pt-5 pb-[10px] border-b-[1px] border-text-primary-100">
              <Typography
                label={"Describe your dispute"}
                type="p"
                classname="text-text-HeadLine-100 font-bold "
                FontSize="base"
              />
            </div>
            <div className="p-5">
              <div className="relative">
                <Option
                  value={formik.values.natureOfDispute}
                  placeholder="Select Nature Of Dispute"
                  handledropDown={(e: any) => {
                    formik.setFieldValue("natureOfDispute", e.value);
                  }}
                  Title={
                    <Typography
                      label={"Nature of Dispute"}
                      type="p"
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      FontSize="sm"
                    />
                  }
                  optionLabel="label"
                  options={[{ label: "Funds", value: "FUNDS" }, { label: "Deadline", value: "DEADLINE" }, { label: "Other", value: "OTHER" }]}
                />
                {formik.touched.natureOfDispute &&
                  formik.errors.natureOfDispute && (
                    <HelperText
                      position="right"
                      label={formik.errors.natureOfDispute}
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
              <div className="relative">
                <Option
                  value={formik.values.memberDsipute}
                  placeholder="Select Member"
                  handledropDown={(e: any) => {
                    formik.setFieldValue("raisedBy", raisedBy);
                    formik.setFieldValue("raisedTo", e.id);
                  }}
                  Title={
                    <Typography
                      label={"Select Member to raise dispute against"}
                      type="p"
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      FontSize="sm"
                    />
                  }
                  options={
                    disputeMembers &&
                    disputeMembers?.map((memberdata: any) => memberdata)
                  }
                  optionLabel="User.name"
                />
                {formik.touched.raisedBy && formik.errors.raisedBy && (
                  <HelperText
                    position="right"
                    label={formik.errors.raisedBy}
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
              <Typography
                label={"Dispute Description"}
                color="primary"
                variant={200}
                classname="font-bold "
                type="p"
                FontSize="sm"
              />
              <Textfield
                placeHolder="Describe Dispute"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.discription}
                name="discription"
                multiline={true}
              />
              {formik.touched.discription && formik.errors.discription && (
                <HelperText
                  position="right"
                  label={formik.errors.discription}
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
          <div className="mt-5 flex justify-between">
            <div className="w-[100px]">
              <Button
                label="Back"
                color="secondary"
                variant="Transparent"
                onClick={() => {
                  handlepopupBack(0, true);
                }}
              />
            </div>
            <div className="w-[105px]">
              <Button
                type="submit"
                label="Continue"
                size="small"
                onClick={() => {
                  formik.validateForm().then((errors: any) => {
                    if (
                      !errors.hasOwnProperty("natureOfDispute") &&
                      !errors.hasOwnProperty("memberDsipute") &&
                      !errors.hasOwnProperty("discription")
                    ) {
                      nextPopup(2, true);
                    }
                  });
                }}
              />
            </div>
          </div>
        </form>
      }
      PanelPosition={"w-[868px]"}
      open={open}
    />
  );
};

export default RaiseDisputeNaturePopup;
