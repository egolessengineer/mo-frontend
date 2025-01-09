import moment from "moment";
import { useState } from "react";
import { Button, Typography } from "../../../../Components/Atoms";
import { getLabelForPenalty } from "../../../../Constants/MenuList";
import { AuthState } from "../../../../Context/auth";
import { handleCustomError } from "../../../../Utils/helper";
import { ADD_ESCROW } from "../../../../sevices";
import CreateEscrowPopup from "../../Popups/CreateEscrowPopup";

const EscrowDetails = ({
  SaveExit,
  handleCloseModal,
  nextpage,
  prevpage,
  viewProjectData,
  handleGetUnAssignProjectDetails,
}: any) => {
  const [projectDetail, setprojectDetail] = useState(false);
  const [projectFund, setprojectFund] = useState(false);
  const [partiesInvolved, setpartiesInvolved] = useState(false);
  const [Stage, setStage] = useState("one");
  const [escrowPopup, setEscrowPopup] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  const handleFAQ = (name: string) => {
    switch (name) {
      case "ProjectDetails":
        setprojectDetail((prev) => !prev);
        break;
      case "ProjectFund":
        setprojectFund((prev) => !prev);
        break;
      case "partiesInvolved":
        setpartiesInvolved((prev) => !prev);
        break;
      default:
    }
  };
  function handlePopuopOpen() {
    setEscrowPopup(true);
  }
  function handlePopuopClose() {
    setEscrowPopup(false);
  }
  async function handleAddEscrow(id: any) {
    try {
      setIsLoading(true);
      let res = await ADD_ESCROW({ projectId: id });
      console.log(res, "accepted");
      handleGetUnAssignProjectDetails(viewProjectData?.id);
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const { user } = AuthState();
  return (
    <div className="w-full">
      {viewProjectData.Escrow && viewProjectData.Escrow?.transferOwnershipStatus === "SUCCESS"
        ? (
          <div className="flex flex-col space-y-[20px]">
            {/* //!project ID. */}
            <div className="flex justify-between p-5 shadow-navbar rounded-[5px]">
              <div>
                <Typography
                  type="p"
                  label={"Contract ID"}
                  classname="font-bold text-text-HeadLine-100 "
                  FontSize="base"
                />
                <Typography
                  type="p"
                  label={viewProjectData?.Escrow?.escrowContractId || '-'}
                  color="primary"
                  variant={300}
                  FontSize="sm"
                />
              </div>
              <div>
                <Typography
                  type="p"
                  label={"Project ID"}
                  classname="font-bold text-text-HeadLine-100 "
                  FontSize="base"
                />
                <Typography
                  type="p"
                  label={viewProjectData?.Escrow?.projectId || "-"}
                  color="primary"
                  variant={300}
                  FontSize="sm"
                />
              </div>
            </div>
            {/* //!Project Details */}
            <div className="shadow-navbar rounded-[5px]">
              <div className="flex justify-between px-5 pt-5 pb-[10px] border-b-[1px] border-text-primary-50 ">
                <Typography
                  type="p"
                  label={"Project Details"}
                  classname="font-bold text-text-HeadLine-100 "
                  FontSize="base"
                />
                <Button
                  variant="line"
                  label=""
                  onClick={() => {
                    handleFAQ("ProjectDetails");
                  }}
                  icon={
                    projectDetail ? (
                      <img src="/Assets/FAQOpen.svg" alt="Open FAQ" />
                    ) : (
                      <img src="/Assets/FAQClose.svg" alt="Open FAQ" />
                    )
                  }
                />
              </div>
              {projectDetail && (
                <div className="flex justify-between px-5 pt-[10px] pb-5">
                  <div className="flex flex-col space-y-[10px]">
                    <div>
                      <Typography
                        label={"Title of Project"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                      <Typography
                        label={viewProjectData?.ProjectDetails?.title || "-"}
                        type="p"
                        color="primary"
                        variant={300}
                        FontSize="sm"
                      />
                    </div>
                    <div>
                      <Typography
                        label={"No. of milestones"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                      <Typography
                        label={viewProjectData?.Milestones.length || "-"}
                        type="p"
                        color="primary"
                        variant={300}
                        FontSize="sm"
                      />
                    </div>
                    <div>
                      <Typography
                        label={"Project Duration"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                      <Typography
                        label={viewProjectData?.ProjectDetails?.duration ?
                          viewProjectData?.ProjectDetails?.duration +
                          " " +
                          viewProjectData?.ProjectDetails?.durationType : "-"
                        }
                        type="p"
                        color="primary"
                        variant={300}
                        FontSize="sm"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-[10px]">
                    <div>
                      <Typography
                        label={"Project Start Date"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                      <Typography
                        label={
                          moment(viewProjectData?.Milestones[0].startDate).format(
                            "MMMM D, YYYY"
                          ) || "-"
                        }
                        type="p"
                        color="primary"
                        variant={300}
                        FontSize="sm"
                      />
                    </div>
                    <div>
                      <Typography
                        label={"Project End Point"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                      <Typography
                        label={
                          moment(
                            viewProjectData?.Milestones[
                              viewProjectData?.Milestones.length - 1
                            ]?.endDate
                          ).format("MMMM D, YYYY") || "-"
                        }
                        type="p"
                        color="primary"
                        variant={300}
                        FontSize="sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* //!Project Fund Details  */}
            <div className="shadow-navbar rounded-[5px]">
              <div className="flex justify-between px-5 pt-5 pb-[10px] border-b-[1px] border-text-primary-50 ">
                <Typography
                  type="p"
                  label={"Project Fund Details"}
                  classname="font-bold text-text-HeadLine-100 "
                  FontSize="base"
                />
                <Button
                  variant="line"
                  label=""
                  onClick={() => {
                    handleFAQ("ProjectFund");
                  }}
                  icon={
                    projectFund ? (
                      <img src="/Assets/FAQOpen.svg" alt="Open FAQ" />
                    ) : (
                      <img src="/Assets/FAQClose.svg" alt="Open FAQ" />
                    )
                  }
                />
              </div>
              {projectFund && (
                <div className="flex justify-between px-5 pt-[10px] pb-5">
                  <div className="flex flex-col space-y-[10px]">
                    <div>
                      <Typography
                        label={"Total Fund Allocated"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                      <Typography
                        label={
                          viewProjectData?.ProjectDetails?.totalProjectFund
                          || "-"
                        }
                        type="p"
                        color="primary"
                        variant={300}
                        FontSize="sm"
                      />
                    </div>
                    <div>
                      <Typography
                        label={"Currency Type"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                      <Typography
                        label={viewProjectData?.ProjectDetails?.currency || "-"}
                        type="p"
                        color="primary"
                        variant={300}
                        FontSize="sm"
                      />
                    </div>
                    {viewProjectData?.projectRole === "PURCHASER" && <>
                      <div className="pt-[10px]">
                        <Typography
                          label={"Release fund from Wallet to ESCROW"}
                          classname="font-bold text-text-HeadLine-100 "
                          FontSize="sm"
                          type="p"
                        />
                      </div>

                      <div>
                        <Typography
                          label={"Assign Fund to"}
                          type="p"
                          variant={200}
                          color="primary"
                          classname="font-bold "
                          FontSize="sm"
                        />
                        <Typography
                          label={viewProjectData?.Funds?.walletToEscorw?.fundAssignedTo == "MILESTONE" ? 'Each Milestone' : 'Project Completion'}
                          type="p"
                          color="primary"
                          variant={300}
                          FontSize="sm"
                        />
                      </div>
                      
                    </>}
                  </div>
                  <div className="flex flex-col space-y-[10px] items-end text-right">
                    <div>
                      <Typography
                        label={"Fund Assigned to"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                      <Typography
                        label={viewProjectData?.assignedFundTo?.toLowerCase() || "-"}
                        type="p"
                        color="primary"
                        variant={300}
                        FontSize="sm"
                        classname="capitalize"
                      />
                    </div>
                    <div>
                      <Typography
                        label={"Fund Transfer Type"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                      <Typography
                        label={viewProjectData?.fundTransferType ? viewProjectData?.fundTransferType == "MilestoneCompleted" ? 'Milestone Completed' : 'Project Completed' : "-"}
                        type="p"
                        color="primary"
                        variant={300}
                        FontSize="sm"
                      />
                    </div>
                    <div className="pt-[10px]">
                      <Typography
                        label={"Release fund from ESCROW to CP"}
                        classname="font-bold text-text-HeadLine-100 "
                        FontSize="sm"
                        type="p"
                      />
                    </div>

                    <div>
                      <Typography
                        label={"Assign Fund to"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                      <Typography
                        label={viewProjectData?.Funds?.escorwToCp?.fundAssignedTo == "MILESTONE" ? 'Each Milestone' : 'Project Completion'}
                        type="p"
                        color="primary"
                        variant={300}
                        FontSize="sm"
                      />
                    </div>
                    <div>
                      <Typography
                        label={"Fund Transfer Type"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                    </div>
                    <Typography
                      label={viewProjectData?.Funds?.escorwToCp?.fundTransferType == "MilestoneCompleted" ? 'Milestone Completed' : 'Project Completed'}
                      type="p"
                      color="primary"
                      variant={300}
                      FontSize="sm"
                    />
                  </div>
                </div>
              )}
            </div>
            {/* //! parties involved */}

            <div className="shadow-navbar rounded-[5px]">
              <div className="flex justify-between px-5 pt-5 pb-[10px] border-b-[1px] border-text-primary-50 ">
                <Typography
                  type="p"
                  label={"Parties Involved"}
                  classname="font-bold text-text-HeadLine-100 "
                  FontSize="base"
                />
                <Button
                  variant="line"
                  label=""
                  onClick={() => {
                    handleFAQ("partiesInvolved");
                  }}
                  icon={
                    partiesInvolved ? (
                      <img src="/Assets/FAQOpen.svg" alt="Open FAQ" />
                    ) : (
                      <img src="/Assets/FAQClose.svg" alt="Open FAQ" />
                    )
                  }
                />
              </div>
              {partiesInvolved && (
                <div className="flex justify-between px-5 pt-[10px] pb-5">
                  <div className="flex flex-col space-y-[10px]">
                    <div>
                      <Typography
                        label={"Purchaser"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                      <Typography
                        label={
                          viewProjectData?.ProjectMembers?.PURCHASER?.User
                            ?.name || "-"
                        }
                        type="p"
                        color="primary"
                        variant={300}
                        FontSize="sm"
                      />
                    </div>
                    <div>
                      <Typography
                        label={"Purchaser ID"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                      <Typography
                        label={
                          viewProjectData?.ProjectMembers?.PURCHASER?.User?.id ||
                          "-"
                        }
                        type="p"
                        color="primary"
                        variant={300}
                        FontSize="sm"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-[10px] items-end">
                    <div className="text-right">
                      <Typography
                        label={"Provider"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                      <Typography
                        label={
                          viewProjectData?.ProjectMembers?.CP?.User?.name || "-"
                        }
                        type="p"
                        color="primary"
                        variant={300}
                        FontSize="sm"
                      />
                    </div>
                    <div className="text-right">
                      <Typography
                        label={"Provider ID"}
                        type="p"
                        variant={200}
                        color="primary"
                        classname="font-bold "
                        FontSize="sm"
                      />
                      <Typography
                        label={
                          viewProjectData?.ProjectMembers?.CP?.User?.id || "-"
                        }
                        type="p"
                        color="primary"
                        variant={300}
                        FontSize="sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* //!milestone Details */}
            <div className="shadow-navbar rounded-[5px]">
              <div className="px-5 pt-5 pb-[10px] border-b-[1px] border-text-gray-50">
                <Typography
                  label={"Milestone Details"}
                  classname="font-bold text-text-HeadLine-100 "
                  FontSize="base"
                  type="p"
                />
              </div>
              {viewProjectData?.Milestones.map((element: any, index: number) => {
                return (
                  <>
                    <div className="flex justify-between p-5 border-b-[1px] border-text-gray-50">
                      <Typography
                        label={`Milestone ${index + 1}`}
                        type="p"
                        classname="font-bold text-text-HeadLine-100 "
                        FontSize="base"
                      />
                      <Button
                        label=""
                        icon={
                          openIndex === index ? (
                            <img src="/Assets/FAQOpen.svg" alt="Open FAQ" />
                          ) : (
                            <img src="/Assets/FAQClose.svg" alt="Open FAQ" />
                          )
                        }
                        variant="line"
                        size="small"
                        onClick={() => {
                          toggleFAQ(index);
                        }}
                      />
                    </div>
                    {openIndex === index && (
                      <>
                        <div className="px-5 pt-[10px] pb-5 flex flex-col space-y-5 border-b-[1px] border-text-gray-50 ">
                          <div className="flex justify-between">
                            <div>
                              <Typography
                                label={"Title"}
                                color="primary"
                                variant={200}
                                FontSize="sm"
                                classname="font-bold "
                                type="p"
                              />{" "}
                              <Typography
                                label={element?.title || "-"}
                                color="primary"
                                variant={300}
                                FontSize="sm"
                                type="p"
                              />
                            </div>
                            <div>
                              <Typography
                                label={"MileStone ID"}
                                color="primary"
                                variant={200}
                                FontSize="sm"
                                classname="font-bold "
                                type="p"
                              />{" "}
                              <Typography
                                label={element?.id || "-"}
                                color="primary"
                                variant={300}
                                FontSize="sm"
                                type="p"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <Typography
                                label={"Fund Allocated"}
                                type="p"
                                color="primary"
                                variant={200}
                                classname="font-bold "
                                FontSize="sm"
                              />
                              <Typography
                                FontSize="sm"
                                label={element?.fundAllocation || "-"}
                                type="p"
                                color="primary"
                                variant={300}
                              />
                            </div>
                            <div>
                              <Typography
                                label={"Start Date"}
                                type="p"
                                color="primary"
                                variant={200}
                                classname="font-bold "
                                FontSize="sm"
                              />
                              <Typography
                                FontSize="sm"
                                label={element?.endPointType == 'DATE' ? moment(element?.startDate).format(
                                  "MMMM D, YYYY"
                                ) : moment(element?.startDate).format(
                                  "MMMM D, YYYY HH:mm a"
                                ) || "-"}
                                type="p"
                                color="primary"
                                variant={300}
                              />
                            </div>
                            <div>
                              <Typography
                                label={"End Date"}
                                type="p"
                                color="primary"
                                variant={200}
                                classname="font-bold "
                                FontSize="sm"
                              />
                              <Typography
                                FontSize="sm"
                                label={element?.endPointType == 'DATE' ? moment(element?.endDate).format(
                                  "MMMM D, YYYY"
                                ) : moment(element?.endDate).format(
                                  "MMMM D, YYYY HH:mm a"
                                ) || "-"
                                }
                                type="p"
                                color="primary"
                                variant={300}
                              />
                            </div>
                            <div>
                              <Typography
                                label={"No. of Revision"}
                                type="p"
                                color="primary"
                                variant={200}
                                classname="font-bold "
                                FontSize="sm"
                              />
                              <Typography
                                FontSize="sm"
                                label={element?.revisionsCounter ? element?.revisions : "-"}
                                type="p"
                                color="primary"
                                variant={300}
                              />
                            </div>
                          </div>
                          <div>
                            <Typography
                              label={"Acceptance Criteria"}
                              type="p"
                              color="primary"
                              variant={200}
                              classname="font-bold "
                              FontSize="sm"
                            />
                            <Typography
                              FontSize="sm"
                              label={element?.acceptanceCriteria || "-"}
                              type="p"
                              color="primary"
                              variant={300}
                            />
                          </div>
                          <div className="flex justify-between">
                            {element?.PenalityBreach && <div>
                              <Typography
                                classname="font-bold text-text-HeadLine-100 "
                                FontSize="sm"
                                type="p"
                                label={"Penalty"}
                              />
                              <div className="mt-[10px]">
                                {(element?.PenalityBreach &&
                                  element?.PenalityBreach.length > 0) ?
                                  element?.PenalityBreach.map(
                                    (ele: any, index: number) => (
                                      <div className="flex mt-[5px] gap-1">
                                        <Typography
                                          label={`Breach ${index + 1}:`}
                                          type="p"
                                          color="primary"
                                          variant={200}
                                          classname="font-bold "
                                          FontSize="xs"
                                        />

                                        <Typography
                                          label={`${ele?.penalityType === 'WARNING'
                                            ? "Warning"
                                            : `${ele?.pentality} ${ele?.valueIn == "AMOUNT" ? '$' : '%'}`} for `}
                                          type="p"
                                          color="primary"
                                          variant={300}
                                          FontSize="xs"
                                        />
                                        <Typography
                                          label={getLabelForPenalty(index + 1)}
                                          type="p"
                                          color="primary"
                                          variant={300}
                                          FontSize="xs"
                                        />
                                        <Typography
                                          label={`  ${ele?.pentalityDuration === 'ByHour'
                                            ? `${Number(ele?.timeperiod) / 3600} Hours`
                                            : `${Number(ele?.timeperiod) / (3600 * 24)} Days`}`}
                                          type="p"
                                          color="primary"
                                          variant={300}
                                          FontSize="xs"
                                        />
                                      </div>
                                    )) : 'No Penalty'}
                              </div>
                            </div>}
                            {element?.royaltyAmount && <div className="flex flex-col space-y-[10px]">
                              <Typography
                                label={"Success Bonus"}
                                classname="text-text-HeadLine-100 font-bold "
                                FontSize="sm"
                                type="p"
                              />
                              <div>
                                <Typography
                                  label={"Success Bonus Type"}
                                  classname="font-bold "
                                  color="primary"
                                  variant={200}
                                  type="p"
                                  FontSize="sm"
                                />
                                <Typography
                                  label={`${element?.royaltyType == "PRE_PAYMENT_ROYALTY" ? "Prepayment" : "PostPayment"} Success Bonus ` || '-'}
                                  color="primary"
                                  variant={300}
                                  type="p"
                                  FontSize="sm"
                                />
                              </div>
                              <div>
                                <Typography
                                  label={"Success Bonus (in percent)"}
                                  classname="font-bold "
                                  color="primary"
                                  variant={200}
                                  type="p"
                                  FontSize="sm"
                                />
                                <Typography
                                  label={element?.royaltyAmount + "%" || "-"}
                                  color="primary"
                                  variant={300}
                                  type="p"
                                  FontSize="sm"
                                />
                              </div>
                            </div>}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className=" h-[calc(100vh-50%)] flex flex-col justify-center items-center ">
              <div className="shadow-navbar p-5 rounded-[5px]">
                <div className="flex justify-center">
                  <Typography
                    label={"“No ESCROW Created”"}
                    classname="text-text-HeadLine-100 text-[36px] "
                    type="p"
                  />
                </div>
                <div className="mt-[10px] flex  justify-center-center ">
                  <div className="w-[482px]">
                    <Typography
                      label={
                        "You do not have any active ESCROW transaction  at the moment. Create an ESCROW to securely manage the funds for your project."
                      }
                      type="p"
                      FontSize="base"
                      color="primary"
                      variant={300}
                      classname="font-medium "
                    />
                  </div>
                </div>
              </div>
              {viewProjectData?.projectRole === "PURCHASER" && (
                <div className="mt-5 flex justify-center">
                  <div className="w-[190px]">
                    <Button
                      onClick={handlePopuopOpen}
                      label="Create ESCROW"
                      size="small"
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      {escrowPopup && (
        <CreateEscrowPopup
          project_name={viewProjectData?.ProjectDetails?.title}
          provider_name={viewProjectData?.ProjectMembers?.CP?.User?.name}
          project_id={viewProjectData?.id}
          fund_allocation={viewProjectData?.ProjectDetails?.totalProjectFund}
          OpenInfoPOP={escrowPopup}
          POPInfoClose={handlePopuopClose}
          handlecreateEscrow={() => handleAddEscrow(viewProjectData?.id)}
          prevpage={handlePopuopClose}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default EscrowDetails;
