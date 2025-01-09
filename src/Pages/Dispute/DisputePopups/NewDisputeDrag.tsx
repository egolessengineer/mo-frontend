import { useState } from "react";
import { Link } from "react-router-dom";
import { CloseHamBurger } from "../../../Assets/SVG";
import {
  Button,
  Drag,
  HelperText,
  Textfield,
  Typography,
} from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";
import { handleCustomError } from "../../../Utils/helper";
import { DOCUMENT_UPLOAD } from "../../../sevices";

const NewDisputeDrag = ({ open, close, handlepopupBack, formik }: any) => {
  let [isLoading, setIsLoading] = useState(false);
  let downname = formik.values?.evidencefile?.toString()?.split("/");
  downname = (downname && downname[downname?.length - 1]) || null;
  async function handleUploadEvidence(file: any) {
    if (file.length !== 0) {
      try {
        setIsLoading(true);
        let formdata = new FormData();
        formdata.append("file", file[0]);
        let res = await DOCUMENT_UPLOAD(formdata);
        return res?.data;
      } catch (error: any) {
        handleCustomError(error);
      } finally {
        setIsLoading(false);
      }
    }
  }
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
          <div className="shadow-navbar rounded-[5px] ">
            <div className="flex border-b-[1px] border-text-primary-100 px-5 pt-5 pb-[10px]">
              <Typography
                label={"Upload Evidence"}
                type="p"
                FontSize="base"
                classname="font-bold text-text-HeadLine-100 "
              />
            </div>
            <div className="p-5">
             {!formik.values.evidencefile && <div className="flex justify-center">
                <Drag
                  handleSetImageValue={async (file) => { 
                    const {type , name} = file[0]               
                    let res = await handleUploadEvidence(file);
                    formik.setFieldValue("evidencefile", res);
                    formik.setFieldValue("evidenceDocLink", [{
                      "url": res,
                      "fileName": name,
                      "mimeType": type
                    }]);
                  }}
                  allfilesAccepted={true}
                  label={
                    <div className="border-[1px] border-dashed border-primary-300 w-[60vw] md:w-[441px] h-[171px] rounded-[5px] flex flex-col items-center justify-evenly">
                      <Typography
                        label={"Drag and drop file here"}
                        type="p"
                        classname="font-medium text-primary-300 "
                        FontSize="sm"
                      />
                      <div className="flex ">
                        <div className="w-[60%] h-[1px] border-[1px] border-dashed mt-[10px] mr-[10px]"></div>
                        <Typography
                          label={"or"}
                          type="p"
                          FontSize="sm"
                          color="primary"
                          variant={200}
                        />
                        <div className="w-[100px] h-[1px] border-[1px] border-dashed mt-[10px] ml-[10px] "></div>
                      </div>
                      <div className="w-[122px]">
                       {isLoading?<>Loading...</> :<Button
                          variant="Transparent"
                          color="secondary"
                          size="small"
                          label="Browse File"
                        />}
                      </div>
                    </div>
                  }
                />
              </div>}
              {formik.touched.evidencefile && formik.errors.evidencefile && (
                <HelperText
                  position="right"
                  label={formik.errors.evidencefile}
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
              {formik.values.evidencefile && (
                <div className="flex mt-5 justify-between">
                  <div className="flex gap-5">
                    <Typography
                      label={downname}
                      type="p"
                      FontSize="sm"
                      color="primary"
                      variant={300}
                    />
                    <Link to={formik.values.evidencefile} download={downname} target="_blank" rel="noreferrer">                    
                      <img src="/Assets/Download.svg" alt="" />
                    </Link>
                  </div>
                  <Button
                    icon={<CloseHamBurger color={"red"} width={"24"} />}
                    label=""
                    onClick={()=>{
                      formik.setFieldValue('evidencefile',null)
                    }}
                    variant="line"
                  />
                </div>
              )}
              <div className="mt-[10px]">
                <Typography
                  label={"Add Comment"}
                  variant={200}
                  color="primary"
                  FontSize="sm"
                  classname="font-bold "
                  type="p"
                />
                <Textfield
                  placeHolder="Enter comment"
                  name="comment"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.comment}
                  multiline={true}
                />
                {formik.touched.comment && formik.errors.comment && (
                  <HelperText
                    position="right"
                    label={formik.errors.comment}
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
          <div className="mt-5 flex justify-between">
            <div className="w-[100px]">
              <Button
                label="Back"
                size="small"
                variant="Transparent"
                color="secondary"
                onClick={() => {
                  handlepopupBack(1, true);
                }}
              />
            </div>
            <div className="w-[100px]">
              <Button
                type="submit"
                disable={isLoading}
                label="Submit"
                size="small"
              />
            </div>
          </div>
        </form>
      }
      open={open}
      PanelPosition={"lg:w-[636px]"}
    />
  );
};

export default NewDisputeDrag;
