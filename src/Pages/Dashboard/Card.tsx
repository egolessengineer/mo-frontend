import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "../../Components/Atoms";
import { NoDataFound } from "../../Components/Atoms/CustomNoDataPage";
import CustomStatusText from "../../Components/Atoms/CustomStatusLabel";
import { Loader } from "../../Components/Atoms/Loader";
import { DropdownMolecule } from "../../Components/Molecules/Dropdown";
import { projectStatus } from "../../Constants/MenuList";
import { AuthState } from "../../Context/auth";
import { handleCustomError, showToast } from "../../Utils/helper";
import { PROJECT_DELETE } from "../../sevices";
import DeleteProject from "./PopUpsDashboard/DeleteProject";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import CustomTooltip from "../../Components/Molecules/CustomTooltip";

const Card = ({ projectData, isLoading, refetchData }: any) => {
  const [IsLoading, setIsLoading] = useState(false);
  const [deletePopup, setdeletePopup] = useState<any>(null);
  const navigate = useNavigate();
  const { user } = AuthState();

  const handleDeleteProject = async (id: string) => {
    try {
      setIsLoading(true);
      await PROJECT_DELETE({ projectId: id });
      setdeletePopup(null);
      await refetchData();
      showToast("Project Deleted Successfully", "success");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex w-full h-full  flex-wrap gap-5">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {deletePopup && (
            <DeleteProject
              data={deletePopup}
              IsLoading={IsLoading}
              deleteFunction={handleDeleteProject}
              open={deletePopup?.id !== "" ? true : false}
              close={() => setdeletePopup(null)}
            />
          )}

          {projectData && projectData.length > 0 ? (
            projectData.map((element: any, idx: any) => (
              <div
                key={element?.id + idx}
                className="w-full md:w-[calc(50%-10px)] 2xl:w-[calc((100%/3)-14px)] shadow-navbar rounded-[5px] h-max min-h-[300px] max-h-fit flex justify-between flex-col"
              >
                <div className="flex justify-between pt-[15px] gap-2 h-[20%] px-4 items-center ">
                  <Typography
                    label={element?.title || "-"}
                    type="h3"
                    classname=" text-text-HeadLine-100 font-bold line-clamp-1 capitalize"
                  />
                  <div className="flex gap-x-2 items-center">
                    {element?.status !== "UNASSIGNED" && <CustomStatusText
                      title={projectStatus[element?.status] || "-"}
                      status={element?.status}
                    />}
                    {element?.state !== "CONTRACT_DEPLOYED" &&
                      element?.state !== "COMPLETED" &&
                      user?.role === "PURCHASER" && (
                        <DropdownMolecule
                          BtnClass="w-6 h-6 bg-text-primary-100 rounded-[5px]  text-white flex items-center justify-center space-x-[10px] cursor-default"
                          BtnData={
                            <div>
                              <img src="/Assets/Option.svg" alt="" />
                            </div>
                          }
                          BtnMenu="absolute right-0 top-8 max-w-max z-10 px-2"
                          MenuList={[{ label: "Delete", value: "Delete" }]}
                          active=""
                          functionHandle={(e) => setdeletePopup(element)}
                        />)}
                  </div>
                </div>
                <div className="flex flex-col  space-y-[10px]  px-4 h-1/2">
                  <Typography
                    label={element?.category || "-"}
                    type="h3"
                    variant={50}
                    color="primary"
                    FontSize="xxs"
                    classname=" mt-[9px] "
                  />
                  <div className="flex items-center gap-x-1">
                    <Typography
                      label={`${element?.role === 'Purchaser' || element?.role === 'Ip' ? "Assigned by:" : "Assigned to:"}`}
                      type="h3"
                      color="primary"
                      variant={200}
                      FontSize="xs"
                      classname=""
                    />
                    <Typography
                      label={element?.roleUser || '-'}
                      type="h3"
                      color="primary"
                      variant={200}
                      FontSize="xs"
                      classname="font-bold uppercase"
                    />
                  </div>
                  <Typography
                    label={
                      element.scope?.length > 300
                        ? `${element.scope.slice(0, 300)}...`
                        : element.scope || "-"
                    }
                    type="p"
                    color="primary"
                    variant={300}
                    FontSize="xs"
                    classname=" leading-[16px] h-[30%] overflow-hidden whitespace-normal text-overflow-ellipsis  line-clamp-2"
                  />
                  <div className="flex flex-row justify-between">
                    {element?.type === "ASSIGNED" && (
                      <div className="flex space-x-[3px]">
                        <Typography
                          label="Milestones:"
                          type="h3"
                          color="primary"
                          variant={300}
                          FontSize="xxs"
                          classname="font-medium "
                        />
                        <Typography
                          label={element?.milestones || "0/0"}
                          type="h3"
                          color="primary"
                          variant={200}
                          FontSize="xs"
                          classname="font-medium "
                        />
                      </div>
                    )}
                    <div className="flex space-x-[3px]">
                      <Typography
                        label="Funds:"
                        type="p"
                        color="primary"
                        variant={300}
                        classname="font-medium "
                        FontSize="xs"
                      />
                      <Typography
                        label={
                          <div className="flex items-center gap-x-1">
                            <div>{element?.funds ?? "N/A"}</div>
                            <div>{element?.currency}</div>
                          </div>
                        }
                        type="p"
                        color="primary"
                        variant={200}
                        classname="font-medium "
                        FontSize="xs"
                      />
                    </div>
                  </div>
                  {/* //!progresssbar */}
                </div>
                {element?.type === "ASSIGNED" && (element?.state === "CONTRACT_DEPLOYED" || element?.state === "COMPLETED")
                  && (
                    <>
                      <div className="flex px-4 justify-between">
                        <div className="flex items-center gap-x-1">
                          <Typography
                            label="Burn Rate"
                            type="p"
                            classname="font-medium text-text-pink-50 leading-[16px]"
                            FontSize="xs"
                          />
                          <CustomTooltip className="relative" classNameChild="!bg-[#60A3BA]" content={<div className="max-w-[500px] w-screen text-white">
                            <div>Our user-friendly Burn Rate bar dynamically displays progress based on milestones, time allocation, and budget use. Quick tip: If one stage in a four-part, 20-hour task takes 15 hours, the Burn Rate shows 25% planned progress and 75% actual usage. </div>
                          </div>}>
                            <InformationCircleIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                          </CustomTooltip>
                        </div>
                        <div className="flex space-x-[5px]">
                          <Typography
                            label="Projected Burn Rate"
                            type="p"
                            classname="font-medium text-text-warning-50 "
                            FontSize="xs"
                          />
                          <Typography
                            label="Actual Burn Rate"
                            type="p"
                            classname="font-medium  text-text-HeadLine-100"
                            FontSize="xs"
                          />
                        </div>
                      </div>
                      <div className="px-4">
                        <div className="bg-primary-400 rounded-sm w-full h-[12px] relative  ">
                          <div
                            className="bg-primary-100  h-[12px]  rounded-[2px]  "
                            style={{
                              width: `${Number(
                                element?.burnRate?.actualPercentage > 100
                                  ? 100
                                  : element?.burnRate?.actualPercentage
                              ) || 0.5
                                }%`,
                            }}
                          ></div>
                          <div
                            className="bg-text-warning-50 h-[4px]  rounded-[2px] mb-[6px] absolute top-[40%]  "
                            style={{
                              width: `${Number(
                                element?.burnRate?.predictedPercentage > 100
                                  ? 100
                                  : element?.burnRate?.predictedPercentage
                              ) || 0.5
                                }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </>
                  )}
                {/* //!card Footer */}
                <div className="border-t-[1px] border-text-gray-50 mt-[8px] h-[20%]">
                  <div className=" flex justify-between items-center px-4 pb-2 ">
                    {element?.type === "ASSIGNED" ? (
                      <>
                        {element?.upcomingMilestone?.title &&
                          element?.upcomingMilestone?.title !== "" ? (
                          <Typography
                            label={`${element?.upcomingMilestone?.title
                              }: ${moment(
                                element?.upcomingMilestone?.startDate
                              ).format("MMM DD, YYYY")}`}
                            type="p"
                            color="primary"
                            variant={200}
                            FontSize="xxs"
                            classname="font-medium "
                          />
                        ) : (
                          <Typography
                            label={"No upcoming milstones"}
                            type="p"
                            color="primary"
                            variant={200}
                            FontSize="xxs"
                            classname="font-medium "
                          />
                        )}
                      </>
                    ) : (
                      <div></div>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-[120px] ">
                        <Button
                          label="See Details"
                          variant="Transparent"
                          color="secondary"
                          size="small"
                          onClick={() => {
                            element?.type === "ASSIGNED"
                              ? navigate(`/project/${element?.id}`)
                              : navigate("/create-project", {
                                state: {
                                  id: element?.id,
                                  type: element?.type,
                                },
                              });
                          }}
                          className="font-medium "
                          icon={<img src="Assets/Next.svg" alt="" />}
                          iconPosition="left"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : user?.role === "PROVIDER" ? (
            <div className="w-full h-full flex justify-center">
              <div className="mt-6 w-[40%] h-[40%] min-h-[120px]  rounded-md shadow-pop flex justify-center items-center">
                <Typography
                  label={"Please wait until project is assigned to you"}
                  type="p"
                  color="primary"
                  variant={200}
                  FontSize="xl"
                  classname="font-medium capitalize tracking-wide"
                />
              </div>
            </div>
          ) : user?.role === "PURCHASER" ? (
            <div className="w-full h-full flex justify-center">
              <div className="mt-6 w-[40%] h-[40%] min-h-[120px] rounded-md shadow-pop flex justify-center items-center">
                <Typography
                  label={"Please Create New Project"}
                  type="p"
                  color="primary"
                  variant={200}
                  FontSize="xl"
                  classname="font-medium "
                />
              </div>
            </div>
          ) : (
            <NoDataFound />
          )}
        </>
      )}
    </div>
  );
};

export default Card;
