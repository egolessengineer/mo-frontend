import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  Button,
  HelperText,
  Textfield,
  Typography
} from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";
import { messages } from "../../../Constants/messages";
import { handleCustomError } from "../../../Utils/helper";
import { DOCUMENT_UPLOAD } from "../../../sevices";
const AssignRework = ({ open, close, saveData }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<any>([]);

  const {
    handleChange,
    values,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
    setFieldError,
  } = useFormik({
    initialValues: {
      reworkComment: "",
      reworkDocs: [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      reworkComment: Yup.string()
        .required('Please Enter Rework Details')
        .min(5, messages.ENTER_MIN_CHAR),
      reworkDocs: Yup.array().min(1).of(
        Yup.object().shape({
          url: Yup.string().required(messages.ENTER_UPLOAD_PHOTO),
          fileName: Yup.string().required(messages.ENTER_UPLOAD_PHOTO),
          mimeType: Yup.string().required(messages.ENTER_UPLOAD_PHOTO),
        })
      ),
    }),
    onSubmit: async () => {
      await saveData(values);
    },
  });

  const uploadReworkDocsOnMilestone = async (e: any) => {
    try {
      setIsLoading(true);
      let file = e.target.files[0]
      let formdata = new FormData();
      formdata.append("file", file);
      let res = await DOCUMENT_UPLOAD(formdata)
      let body = []
      values.reworkDocs && values.reworkDocs.length > 0
        ? body = [...values.reworkDocs, {
          "url": res?.data,
          "fileName": file?.name,
          "mimeType": file?.type
        }]
        : body = [{
          "url": res?.data,
          "fileName": file?.name,
          "mimeType": file?.type
        }]
      console.log('body', body);
      setFieldValue("reworkDocs", body);
    } catch (error) {
      handleCustomError(error)
    } finally {
      setIsLoading(false);

    }
  }

  return (
    <ModalAtom
      Title={
        <div className="bg-primary-100 flex justify-between px-[20px] py-[15px] rounded-t-[5px]">
          <Typography
            label={"Assign Work"}
            type="p"
            classname="font-bold text-text-white-50 "
            FontSize="base"
          />
          <Button
            variant="line"
            label=""
            onClick={close}
            icon={<img src="/Assets/Close.svg" />}
          />
        </div>
      }
      description={
        <form onSubmit={handleSubmit}>
          {" "}
          <div className="shadow-navbar border-[1px] border-text-gray-50 rounded-[5px] m-5">
            <div className="px-[20px] py-[10px]">
              <div className="py-[10px]">
                <div className="flex flex-col mx-auto w-full">
                  <Typography
                    label={values.reworkDocs && values.reworkDocs.length > 0 ? "Attached File": "Attach File"}
                    color="primary"
                    variant={200}
                    classname="font-bold "
                    FontSize="sm"
                    type="p"
                  />
                  {values?.reworkDocs &&
                    values?.reworkDocs.length > 0 &&
                    values?.reworkDocs.map(
                      (element: any, idx: any) => {
                        return (
                          <React.Fragment key={element?.url + idx}>
                            <div className="flex flex-row items-center justify-between py-[5px]">
                              <Typography
                                label={element?.fileName}
                                type="p"
                                FontSize="sm"
                                color="primary"
                                variant={200}
                              />
                              <a
                                href={element?.url}
                                download
                                target="_blank"
                              >
                                <Button
                                  label=""
                                  icon={
                                    <img
                                      src="/Assets/Download.svg"
                                      alt=""
                                    />
                                  }
                                  variant="line"
                                  size="small"
                                />
                              </a>
                            </div>
                          </React.Fragment>
                        );
                      }
                    )}
                </div>
              </div>
              <div className="flex justify-center py-2">
                <input
                  type="file"
                  id="fileInputuploadDeliverables"
                  style={{ display: "none" }}
                  onChange={(e: any) =>
                    uploadReworkDocsOnMilestone(e)
                  }
                />
                <label
                  className="bg-transparent font-medium py-2 px-[0.5rem] rounded-md border-[1px]  border-text-secondary-50 font-base text-text-secondary-50 hover:bg-text-secondary-100  cursor-pointer"
                  htmlFor="fileInputuploadDeliverables"
                >
                  {" "}
                  Upload Rework Documents{" "}
                </label>
              </div>
              {touched?.reworkDocs && errors?.reworkDocs && (
                <HelperText
                  position="right"
                  label={typeof errors?.reworkDocs == "string" ? errors?.reworkDocs : ""}
                  className="text-xxs "
                  color="danger"
                  icon={
                    <img
                      src="/Assets/Danger.svg"
                      alt=""
                      className="pt-[6px] ml-[4px]"
                    />
                  }
                />)}
              <div className="mt-[15px]">
                <Typography
                  label={"Comments"}
                  color="primary"
                  variant={200}
                  classname="font-bold "
                  FontSize="sm"
                  type="p"
                />
                <div className="rounded-[5px]">
                  <Textfield
                    multiline={true}
                    placeHolder="Add comment regarding this milestone."
                    name="reworkComment"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.reworkComment}
                    disable={isLoading}
                  />
                  {touched?.reworkComment && errors?.reworkComment && (
                    <HelperText
                      position="right"
                      label={errors?.reworkComment}
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
          </div>
          <div className="flex justify-between p-5">
            <div className="w-[100px]">
              <Button
                label="Cancel"
                size="small"
                color="secondary"
                variant="Transparent"
                onClick={() => {
                  close("");
                }}
              />
            </div>
            <div className="w-[162px]">
              <Button label="Send" size="small" type="submit" />
            </div>
          </div>
        </form>
      }
      PanelPosition={"w-[643px]"}
      open={open}
    />
  );
};

export default AssignRework;
