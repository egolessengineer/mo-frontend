import { useRef, useState } from "react";
import {
  Button,
  HelperText,
  Textfield,
  Typography,
} from "../../../Components/Atoms";
import { messages } from "../../../Constants/messages";
import { AuthState } from "../../../Context/auth";
import {
  getFileNameFromUrl,
  handleCustomError,
  showToast,
} from "../../../Utils/helper";
import { DOCUMENT_DELETE, DOCUMENT_UPLOAD } from "../../../sevices";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const Documents = (props: any) => {
  const { user } = AuthState();
  const { formik, handleBack } = props;
  const [isLoading, setIsLoading] = useState(false);

  const fileRequirementDetailsRef = useRef<HTMLInputElement>(null);
  const fileTCDetailsRef = useRef<HTMLInputElement>(null);

  const handleFileRequirementDetailsChange = () => {
    if (fileRequirementDetailsRef.current) {
      fileRequirementDetailsRef.current.click();
    }
  };

  const handleFileTCDetailsChange = () => {
    if (fileTCDetailsRef.current) {
      fileTCDetailsRef.current.click();
    }
  };

  async function handleRequirementDetailsDoc(img: any) {
    if (img.length !== 0) {
      try {
        setIsLoading(true);
        let formdata = new FormData();
        formdata.append("file", img[0]);
        let res = await DOCUMENT_UPLOAD(formdata);
        formik.setFieldValue("requirementDetailupload", [
          ...formik.values.requirementDetailupload,
          res.data,
        ]);
        showToast(messages.SUCCESS_FILE_UPLOAD, "success");
      } catch (error: any) {
        handleCustomError(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function handleTCDetailDetailsDoc(img: any) {
    if (img.length !== 0) {
      try {
        setIsLoading(true);
        let formdata = new FormData();
        formdata.append("file", img[0]);
        let res = await DOCUMENT_UPLOAD(formdata);
        formik.setFieldValue("tcDetailUpload", [
          ...formik.values.tcDetailUpload,
          res.data,
        ]);
        showToast(messages.SUCCESS_FILE_UPLOAD, "success");
      } catch (error: any) {
        handleCustomError(error);
      } finally {
        setIsLoading(false);
      }
    }
  }
  async function handleDeleteDoc(url: string, isRequirementDetails: boolean) {
    try {
      setIsLoading(true);
      await DOCUMENT_DELETE({ url: url });
      if (isRequirementDetails) {
        let urls = formik.values.requirementDetailupload.filter(
          (doc: any) => doc !== url
        );
        formik.setFieldValue("requirementDetailupload", urls);
      } else {
        let urls = formik.values.tcDetailUpload.filter(
          (doc: any) => doc !== url
        );
        formik.setFieldValue("tcDetailUpload", urls);
      }
      showToast(messages.SUCCESS_FILE_DELETE, "success");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col items-center mt-[10px] mb-[20px] space-y-[20px]">
        <div className="w-full lg:w-[828px]   shadow-navbar rounded-[5px]">
          <div className="pt-[20px] pb-[10px] pl-[20px] border-b-[1px] border-text-gray-50">
            <Typography
              classname="text-text-HeadLine-50 font-bold leading-6 "
              type="h2"
              label="Requirement Details"
              FontSize="base"
            />
          </div>
          <div className="flex flex-col p-[20px] xs:w-full md:w-full">
            <Typography
              label="Requirements"
              type="h3"
              FontSize="sm"
              color="primary"
              classname="font-bold mb-[3px]  "
              variant={200}
            />
            <Textfield
              multiline={true}
              placeHolder="Describe requirement of project"
              name="requirements"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.requirements}
              disable={isLoading}
            />
            <div className="flex justify-between py-1">
              <Typography
                label={
                  <div className="flex items-center gap-1">
                    <InformationCircleIcon className="h-6 w-6 text-text-HeadLine-100" />
                    <div>Please detail out your deliverables</div>
                  </div>}
                type="h3"
                FontSize="sm"
                color="HeadLine"
                classname="text-text-HeadLine-100 font-medium"
                variant={200}
              />
              {formik.errors.requirements && (
                <HelperText
                  position="right"
                  label={formik.errors.requirements}
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
            {formik.values.requirementDetailupload &&
              formik.values.requirementDetailupload.map(
                (doc: any, index: number) => (
                  <div className="mt-[10px] flex space-x-[20px]" key={index}>
                    <Typography
                      label={getFileNameFromUrl(doc)}
                      type="p"
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      FontSize="sm"
                    />
                    <div onClick={() => handleDeleteDoc(doc, true)}>
                      {
                        <img
                          src="/Assets/Error.svg"
                          className="mt-[3px]"
                          alt=""
                        />
                      }
                    </div>
                  </div>
                )
              )}
          </div>
          <div className="flex justify-center ">
            <div className="w-[159px] pb-[20px]">
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                ref={fileRequirementDetailsRef}
                onChange={(e) => {
                  handleRequirementDetailsDoc(e.target.files);
                }}
                accept=".jpg, .jpeg, .png, .pdf, .xls, .xlsx"
              />
              <Button
                label="Add Attachments"
                color="secondary"
                variant="Transparent"
                className="font-medium"
                size="small"
                onClick={handleFileRequirementDetailsChange}
                disable={isLoading}
              />
              {formik.errors.requirementDetailupload && (
                <HelperText
                  position="right"
                  label={formik.errors.requirementDetailupload}
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
        <div className="lg:w-[828px] w-full rounded-[5px] shadow-navbar">
          <div className="pt-[20px] pb-[10px] pl-[20px] border-b-[1px] border-text-gray-50">
            <Typography
              classname="text-text-HeadLine-50 font-bold leading-6 "
              type="h2"
              label="Term and Condition Details"
              FontSize="base"
            />
          </div>
          <div className="flex flex-col p-[20px]">
            <Typography
              label="Term and Condition"
              type="h3"
              FontSize="sm"
              color="primary"
              classname="font-bold leading-5 mb-[3px] "
              variant={200}
            />
            <Textfield
              multiline={true}
              placeHolder="Describe term and condition of project"
              name="termsAndConditions"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.termsAndConditions}
              disable={isLoading}
            />
            {formik.errors.termsAndConditions && (
              <HelperText
                position="right"
                label={formik.errors.termsAndConditions}
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
            {formik.values.tcDetailUpload &&
              formik.values.tcDetailUpload.map((doc: any, index: number) => (
                <div className="mt-[10px] flex space-x-[20px]" key={index}>
                  <Typography
                    label={getFileNameFromUrl(doc)}
                    type="p"
                    color="primary"
                    variant={200}
                    classname="font-bold "
                    FontSize="sm"
                  />
                  <div onClick={() => handleDeleteDoc(doc, false)}>
                    {
                      <img
                        src="/Assets/Error.svg"
                        className="mt-[3px]"
                        alt=""
                      />
                    }
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center ">
            <div className="w-[159px] pb-[20px]">
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                ref={fileTCDetailsRef}
                onChange={(e) => {
                  handleTCDetailDetailsDoc(e.target.files);
                }}
                accept=".jpg, .jpeg, .png, .pdf, .xls, .xlsx"
              />
              <Button
                label="Add Attachments"
                color="secondary"
                variant="Transparent"
                className="font-medium "
                size="small"
                onClick={handleFileTCDetailsChange}
                disable={isLoading}
              />
              {formik.errors.tcDetailUpload && (
                <HelperText
                  position="right"
                  label={formik.errors.tcDetailUpload}
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
        {user?.role === "PROVIDER" && (
          <div className="w-full lg:w-[828px]   shadow-navbar rounded-[5px]">
            <div className="flex flex-col p-[20px]">
              <Typography
                label="Remarks"
                type="h3"
                FontSize="sm"
                color="primary"
                classname="font-bold leading-5 mb-[3px] !text-text-danger-100"
                variant={200}
              />
              <Textfield
                multiline={true}
                placeHolder="Describe term and condition of project"
                name="remark"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.remark}
                disable={isLoading}
              />
              {formik.errors.remark && (
                <HelperText
                  position="right"
                  label={formik.errors.remark}
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
        )}
      </div>
      <div className="flex justify-between pb-[20px]">
        <div className="w-[100px]">
          <Button
            label="Back"
            color="secondary"
            className="font-medium "
            variant="Transparent"
            size="small"
            onClick={handleBack}
          />
        </div>

        <div className="w-[167px]">
          <Button
            label="Save & Continue"
            color="primary"
            variant="standard"
            size="small"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default Documents;
