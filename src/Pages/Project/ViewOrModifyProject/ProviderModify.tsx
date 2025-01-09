import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "../../../Components/Atoms";
import { handleCustomError } from "../../../Utils/helper";
import { TOGGLE_IP_INFO } from "../../../sevices";
import AddIndivdualProvider from "../Popups/AddIndivdualProvider";

const ProviderModify = (props: any) => {
  const navigation = useNavigate();

  const { project_Details, formik, setIsLoading, editMode, viewProjectData, handleBack, silentRefetch } =
    props;
  const ToggleIpInfo = async (status: boolean) => {
    try {
      setIsLoading(true);
      let body = {
        projectId: project_Details?.id,
        ipViewState: status,
      };
      await TOGGLE_IP_INFO(body);
      formik.setFieldValue("isIndividualProvidersVisible", status);
      silentRefetch()
    } catch (error) {
      console.log(error, "error");
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [pops, setpops] = useState(false);
  const OpenPopup = () => {
    setpops((prev) => !prev);
  };
  const closePop = () => {
    setpops(false);
  };
  const ViewProfile = (id: string) => {
    navigation("/user-details", { state: { id, activeBtn: 'all' } });
  };
  const { ProjectMembers } = project_Details;
  return (
    <div className="w-full">
      {pops && (
        <AddIndivdualProvider
          open={pops}
          close={closePop}
          indexFormik={formik}
          viewProjectData={viewProjectData}
          silentRefetch={silentRefetch}
        />
      )}
      <div className="flex flex-col items-center space-y-[20px] mt-[10px] w-full">
        <div className="flex flex-col items-center space-y-[20px] mt-[10px] w-full">
          <div className="w-full shadow-navbar rounded-[5px]">
            <div className="border-b-[1px] border-text-primary-100 pt-[20px] pl-[20px] pb-[10px]">
              <Typography
                label="Group Provider"
                classname="text-text-HeadLine-100 font-bold "
                FontSize="base"
                type="h2"
              />
            </div>
            <div className="pt-[10px] pl-[20px] pb-[20px]">
              <div className="flex space-x-[20px]  items-center">
                <img
                  src={ProjectMembers?.CP?.User?.About?.profilePictureLink}
                  className="rounded-[50%] w-14 h-14"
                  alt={""}
                />
                <div className="flex flex-col space-y-[5px]">
                  <Typography
                    label={ProjectMembers?.CP?.User?.name}
                    type="h3"
                    FontSize="3xl"
                    color="primary"
                    variant={200}
                  />
                  <Typography
                    label={
                      ProjectMembers?.CP?.User?.Experiences?.[0]?.position
                    }
                    type="p"
                    FontSize="sm"
                    color="primary"
                    variant={200}
                    classname="font-bold capitalize"
                  />
                </div>
              </div>
            </div>
          </div>
          {(viewProjectData?.projectRole == "CP" || (viewProjectData?.projectRole == 'PURCHASER' && viewProjectData?.isIndividualProvidersVisible)) &&
            <div className=" shadow-navbar rounded-[5px] w-full">
              <div className="border-b-[1px] border-text-primary-100 pt-[20px] pl-[20px] pb-[10px] pr-[20px] ">
                <div className="flex justify-between">
                  <Typography
                    label="Individual"
                    classname="text-text-HeadLine-100 font-bold text-xs md:text-base  "
                    type="h2"
                  />
                  {viewProjectData?.projectRole === 'CP' &&
                    <div className="flex space-x-[10px]">
                      <Typography
                        label={
                          viewProjectData?.isIndividualProvidersVisible
                            ? "Visible to Purchaser"
                            : "Not Visible to Purchaser"
                        }
                        type="p"
                        classname="text-xs md:text-sm "
                      />
                      <label className="relative inline-flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          checked={viewProjectData.isIndividualProvidersVisible}
                          onChange={() => {
                            ToggleIpInfo(
                              !viewProjectData.isIndividualProvidersVisible
                            );
                          }}
                        />

                        <div className="w-11 h-6 bg-text-gray-50 peer-focus:outline-none shadow-toggle peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-danger-100 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-text-primary-25 peer-checked:after:bg-text-sucess-100"></div>

                        {/* Add a tooltip */}
                        <div className="hidden group-hover:block absolute bg-white border border-gray-300 shadow-navbar w-[217px] h-[68px] rounded-[5px]  -left-2/4 transform -translate-x-1/2 top-full p-[10px]">
                          <Typography
                            type="p"
                            label={
                              "Toggle ON/OFF to make visible/Restrict Individual Provider to purchaser"
                            }
                            FontSize="xs"
                          />
                        </div>
                      </label>
                    </div>}
                </div>
              </div>
              {viewProjectData?.ProjectMembers?.IP &&
                viewProjectData?.ProjectMembers?.IP.length > 0 ?
                viewProjectData?.ProjectMembers?.IP.map(
                  (data: any, index: number) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="pt-[10px] pb-[20px] px-5 border-b-[1px] border-text-primary-100"
                        >
                          <div className="flex  justify-between">
                            <div className="flex space-x-[20px] ">
                              <img
                                src={data?.User?.About?.profilePictureLink}
                                className="rounded-[50%] w-[68px] h-[68px]"
                              />
                              <div className="flex flex-col space-y-[5px] justify-center">
                                <Typography
                                  label={data?.User?.About?.name}
                                  type="h3"
                                  FontSize="3xl"
                                  color="primary"
                                  variant={200}
                                />
                                <Typography
                                  label={data?.User?.Experiences?.[0]?.position}
                                  type="p"
                                  FontSize="sm"
                                  color="primary"
                                  variant={200}
                                  classname="font-bold "
                                />
                              </div>
                            </div>
                            {!editMode && <div className="mt-[20px]">
                              <Button
                                onClick={() => ViewProfile(data?.userId)}
                                label="View Profile"
                                size="small"
                                variant="line"
                                className="px-4 text-text-secondary-50"
                                icon2={
                                  <ChevronRightIcon
                                    className="h-4 w-4 text-text-secondary-50"
                                    strokeWidth={3}
                                  />
                                }
                              />
                            </div>}

                           
                          </div>
                        </div>
                      </>
                    );
                  }
                ) :
                <Typography
                  label={`No IP's Added yet`}
                  type="p"
                  FontSize="sm"
                  color="primary"
                  variant={200}
                  classname="text-center p-2"
                />
              }

              {viewProjectData?.projectRole == 'CP' && viewProjectData?.state !== "ADD_ESCROW" &&
                viewProjectData?.state !== "CONTRACT_DEPLOYED" &&
                viewProjectData?.state !== "COMPLETE" &&
                <div className="pt-[10px] pb-[20px] pr-[20px] pl-[20px] ">
                  <div className="flex justify-center mt-[20px]">
                    <div className="w-[250x]">
                      <Button
                        label="Manage Individual"
                        size="medium"
                        onClick={OpenPopup}
                      />
                    </div>
                  </div>
                  <Typography
                    label="Note: Add individual here. Customize fund details, transfer type, Success Bonus and restrict specific info after project acceptance by purchaser and CP. Send requests on provider detail page after making changes."
                    type="p"
                    classname="text-text-danger-50 font-bold "
                    FontSize="sm"
                  />
                </div>}
            </div>
          }
        </div>
        <br />
        {editMode && <form onSubmit={formik.handleSubmit} className="w-full flex justify-between">
          <div className="w-[100px]">
            <Button
              variant="Transparent"
              color="secondary"
              label="Back"
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
        </form>}
      </div>
    </div>
  )
};

export default ProviderModify;
