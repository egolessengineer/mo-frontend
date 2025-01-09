import { useState } from "react";
import { CloseHamBurger } from "../../../Assets/SVG";
import {
  Button,
  Drag,
  HelperText,
  Textfield,
  Typography,
} from "../../../Components/Atoms";
import { ModalAtom, Option } from "../../../Components/Molecules";
import { handleCustomError } from "../../../Utils/helper";
import { DOCUMENT_UPLOAD } from "../../../sevices";


const ResolutionPopUp = ({ open, close, formik , disputeDetails}: any) => {

  const [isLoading , setIsLoading] = useState(false)
  
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
        <div className="flex justify-between bg-primary-100 rounded-t-[5px] p-5">
          <Typography
            label={"Provide Resolution"}
            classname="font-bold text-text-white-50 "
            FontSize="base"
            type="p"
          />
          <Button
            variant="line"
            label=""
            icon={<img src="/Assets/Close.svg" alt=""/>}
            size="small"
            onClick={close}
          />
        </div>
      }
      description={
        <form onSubmit={formik.handleSubmit}>
          <div className="m-5 lg:w-[960px] md:w-[700px] sm:[500px] shadow-navbar rounded-[5px]">
            <div className="pt-[20px] pl-[20px] border-b-[1px] border-text-gray-50 ">
              <Typography
                classname="font-bold text-text-HeadLine-100  "
                type="p"
                label={"Describe your Resolution"}
              />
            </div>
            <div className="p-5 relative">
              <Option
                placeholder="select"
                value={formik.values.resolutionFavor}
                handledropDown={(e:any)=>{              
                  formik.setFieldValue('resolutionFavor',e.raisedata.User.name)
                  formik.setFieldValue('inFavourOfType',e.raisedata.projectUsers)
                  formik.setFieldValue('inFavourOfID',e.id)
                }}
                Title={
                  <Typography
                    label={"Resolution in Favor of"}
                    color="primary"
                    variant={200}
                    classname="font-bold "
                    FontSize="sm"
                    type="p"
                  />
                }
                options={[{id:disputeDetails.raisedBy, raisedata:disputeDetails.RaisedBy},{id:disputeDetails.raisedTo, raisedata:disputeDetails.RaisedTo}]}
                optionLabel="raisedata.User.name"
              />
              {formik.touched.resolutionFavor && formik.errors.resolutionFavor && (
              <HelperText
                position="right"
                label={formik.errors.resolutionFavor}
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
              <div className="mt-[10px]">
                <Typography
                  label={"Resolution Description"}
                  color="primary"
                  variant={200}
                  classname="font-bold "
                  FontSize="sm"
                  type="p"
                />
                <Textfield
                  placeHolder="Describe Resolution"
                  name="resolutionDescription"
                  id="ResolutionDesc"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.resolutionDescription}                  
                />
                {formik.touched.resolutionDescription && formik.errors.resolutionDescription && (
              <HelperText
                position="right"
                label={formik.errors.resolutionDescription}
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
              {!formik.values.resolutionEvidene && <div className="mt-[20px] h-[170px] border-[2px] border-primary-300 border-dashed rounded-[5px] flex flex-col  justify-center ">
                <Drag
                  handleSetImageValue={async (file)=>{  
                    const {name, type} = file[0]              
                    let img = await handleUploadEvidence(file)
                    formik.setFieldValue('resolutionEvidene',img)
                    formik.setFieldValue('resolutionDocLink',[{
                      url: img,
                      fileName: name,
                      mimeType: type
                    }])
                  }}
                  allfilesAccepted={true}
                  label={
                    <>
                      <div className="flex justify-center">
                        <Typography
                          label={"Drag and drop file here"}
                          type="p"
                          classname="font-medium text-primary-300 "
                          FontSize="sm"
                        />
                      </div>

                      <div className="flex space-x-1 justify-center ">
                        <div className="w-[100px] border-[1px] h-[0px] border-dashed mt-[20px] "></div>
                        <Typography
                          label={"or"}
                          type="p"
                          FontSize="sm"
                          classname="mt-[10px]"
                        />
                        <div className="w-[100px] border-[1px] h-[0px] border-dashed mt-[20px]"></div>
                      </div>
                      <div className="flex justify-center mt-[10px]">
                        <div className="w-[122px]">
                          {isLoading? <div className="text-center">Loading...</div> : <Button
                            label="Browse File"
                            variant="Transparent"
                            color="secondary"
                            size="small"
                          />}
                        </div>
                      </div>
                    </>
                  }
                />
              </div>}
                {formik.touched.resolutionEvidene && formik.errors.resolutionEvidene && (
              <HelperText
                position="right"
                label={formik.errors.resolutionEvidene}
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
              {formik.values.resolutionEvidene && <div className="flex justify-between mt-5">
                <div className="flex  space-x-[20px]">
                  <Typography
                    label={formik.values.resolutionEvidene}
                    type="p"
                    FontSize="sm"
                    color="primary"
                    variant={300}
                  />
                  <Button
                    label=""
                    icon={
                      <img src="/Assets/Download.svg" className="mt-[-4px]" alt=""/>
                    }
                    variant="line"
                  />
                </div>
                <div className="mt-[-4px] flex justify-center items-center">
                  <Button
                    label=""
                    icon={<CloseHamBurger color="#E33629" width="20px" />}
                    variant="line"
                  />
                </div>
              </div>}
              <div className="mt-[20px]">
                <Typography
                  label={"Add Comment (if any)"}
                  classname="font-bold "
                  color="primary"
                  variant={200}
                  type="p"
                  FontSize="sm"
                />
                <Textfield
                  placeHolder="Enter comment about evidence"
                  name="resolutionComment"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.resolutionComment}
                  id="AddComment"
                  multiline={true}
                />
              </div>
            </div>
          </div>
          <div className=" p-5 flex justify-between ">
            <div className="w-[100px]">
              <Button
                label="Cancel"
                variant="Transparent"
                color="secondary"
                size="small"
              />
            </div>
            <div className="w-[105px]">
              <Button type="submit" disable={isLoading} label="Continue" size="small" />
            </div>
          </div>
        </form>
      }
      PanelPosition={""}
      open={open}
    />
  );
};

export default ResolutionPopUp;
