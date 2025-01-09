import {
  ContractExecuteTransaction,
  ContractFunctionParameters,
} from "@hashgraph/sdk";
import { Tab } from "@headlessui/react";
import moment from "moment";
import React, { useState } from "react";
import { gasLimit } from "../../../Constants/Hedera";
import {
  getFilteredStatusList,
  getLabelForPenalty,
  milestoneStatus
} from "../../../Constants/MenuList";
import AssignRework from "../../../Pages/Project/Popups/AssignRework";
import IndivdualProviderList from "../../../Pages/Project/Popups/IndivdualProviderList";
import ReworkDetailsPopup from "../../../Pages/Project/Popups/ReworkDetails";
import { useHashConnect } from "../../../Providers/HasConnectAPIProvider";
import { findMilestoneIndex } from "../../../Utils/contractHelper";
import { handleCustomError, showToast, updateTransactionDetails } from "../../../Utils/helper";
import { Button, Typography } from "../../Atoms";
import { DropdownMolecule } from "../Dropdown";

export const CustomTab = ({
  viewProjectData,
  index,
  openIndex,
  refetch,
  formik,
}: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [FAQPenality, setFAQPenality] = useState(true);
  const [CurrentMilestoneEdit, setCurrentMilestoneEdit] = useState<any>(null);
  const [openAssignRework, setopenAssignRework] = useState(false);
  const { getProvider, getSigner, state } = useHashConnect();
  const { Escrow, ProjectDetails } = viewProjectData;
  const currency = ProjectDetails?.currency
  const [OpenModalState, setOpenModalState] = useState<any>("");

  const HandleFAQPenality = () => {
    setFAQPenality((prevValue) => !prevValue);
  };

  const updateMileStoneState = async (
    milestoneState: string,
    mileStoneId: string,
    subMilestoneId: string,
    endDate: any,
    reworkData?: any
  ) => {
    try {
      if (state === "Connected") {
        if (Escrow?.escrowContractId) {
          let stateIndex = findMilestoneIndex(milestoneState);
          const provider = getProvider();
          const signer = getSigner(provider);
          console.log("mileStoneId:", mileStoneId, "subMilestoneId:", subMilestoneId, "stateIndex:", stateIndex, "endDate:", Math.floor(Date.parse(endDate.toString()) / 1000), Escrow.escrowContractId, "subMilestone state change");
          const changeSubMilestoneStateExecTx =
            await new ContractExecuteTransaction()
              .setContractId(Escrow.escrowContractId)
              .setGas(gasLimit)
              .setFunction(
                "changeSubMilestoneState",
                new ContractFunctionParameters()
                  .addString(mileStoneId)
                  .addString(subMilestoneId)
                  .addUint8(stateIndex)
                  .addUint32(Math.floor(Date.parse(endDate.toString()) / 1000))
              )
              .freezeWithSigner(signer);
          let milestoneTx = await changeSubMilestoneStateExecTx.executeWithSigner(
            signer
          );
          if (milestoneTx?.transactionId) {
            let transactionIDSplit = milestoneTx?.transactionId
              .toString()
              .split("@");
            let transactionid = transactionIDSplit[1].replace(".", "-");
            transactionid = transactionIDSplit[0] + "-" + transactionid;
            console.log("transactionid", transactionid);
            let reworkBody = {};
            if (milestoneState == "REWORK") {
              reworkBody = {
                ...reworkData
              }
            }
            await updateTransactionDetails(transactionid, 'changeSubMilestoneState', 'SubMilestoneStateChanged', reworkBody)
          }
          await refetch();
        } else {
          showToast("The escrow has not been created yet.", "info");
        }
      } else {
        showToast("Please connect your wallet", "info");
      }
      closeAssignRework()
    } catch (error) {
      handleCustomError(error)
      console.log(error);
    }
  };
  const HandleSubMenu = (
    name: string,
    mileStoneId: string,
    subMilestoneId: string,
    endDate: any,
    reworkCount?: any
  ) => {
    if (state === "Connected") {
      if (name === "REWORK") {
        if (reworkCount == 0) {
          showToast('Revision limit reached', 'info');
        } else {
          setCurrentMilestoneEdit({
            mileStoneId: mileStoneId,
            subMilestoneId: subMilestoneId,
            endDate: endDate,
          });
          setopenAssignRework((prev) => !prev);
        }
      } else {
        updateMileStoneState(name, mileStoneId, subMilestoneId, endDate);
      }
    } else {
      showToast("Please connect your wallet", "info");
    }
  };
  const closeAssignRework = () => {
    setopenAssignRework(false);
  };
  const [assignIpIndex, setassignIpIndex] = useState("");

  const [pops, setpops] = useState(false);
  const OpenPopup = (index: any) => {
    setassignIpIndex(index);
    setpops((prev) => !prev);
  };
  const closePop = () => {
    setpops(false);
  };
  const handleSave = () => {
    closePop();
  };
  return (
    <>
      {viewProjectData?.Milestones[index]?.Milestones &&
        viewProjectData?.Milestones[index]?.Milestones.length > 0 && (
          <div className="w-full  px-2 sm:px-0 border-t border-text-gray-50 ">
            <Tab.Group
              selectedIndex={selectedIndex}
              onChange={setSelectedIndex}
            >
              <div className="flex flex-row items-center justify-between relative">
                <Tab.List className="flex bg-black bg-opacity-[0.15] w-[calc(100%-200px)] flex-wrap">
                  {viewProjectData?.Milestones[index]?.Milestones.map(
                    (element: any, subIndex: number) => (
                      <>
                        {OpenModalState == 'ReworkDetails' && (
                          <ReworkDetailsPopup
                            close={() => setOpenModalState("")}
                            open={OpenModalState == 'ReworkDetails' ? true : false}
                            reworkDetails={{ reworkComment: element?.reworkComment, reworkDocs: element?.reworkDocs }}
                          />
                        )}
                        <Tab
                          key={subIndex}
                          className={({ selected }) =>
                            `text-text-HeadLine-100 py-3 text-sm font-medium leading-5 
                               ${selected
                              ? "bg-text-HeadLine-200  border-x border-t border-black border-opacity-25"
                              : "rounded-bl-lg "
                            }`
                          }
                        >
                          <div className="px-3 min-w-[100px]">
                            {`Sub-Milestone ${index + 1}.${subIndex + 1}`}
                          </div>
                        </Tab>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 min-w-[32px] min-h-[32px] flex justify-center items-center">
                              {element?.User?.About?.profilePictureLink ?
                                <img
                                  src={element?.User?.About?.profilePictureLink}
                                  className="rounded-full min-w-[32px] min-h-[32px]"
                                /> :
                                <div className="capitalize bg-[#3498db] min-w-[32px] min-h-[32px] flex justify-center items-center w-full rounded-full text-white text-base font-medium ">
                                  {element?.User?.name.charAt(0)}
                                </div>}
                            </div>
                            {viewProjectData?.Milestones[index]?.Milestones[
                              selectedIndex
                            ]?.isDeployedOnContract && <DropdownMolecule
                                BtnClass="w-[125px] h-[32px] bg-text-sucess-100 rounded-[5px]  text-white flex items-center justify-center space-x-[10px] cursor-default"
                                BtnData={
                                  <>
                                    <div>
                                      {
                                        milestoneStatus[
                                        viewProjectData?.Milestones[index]?.Milestones[
                                          selectedIndex
                                        ]?.milestoneStatus
                                        ]
                                      }{" "}
                                    </div>
                                    <div className="h-[32px] w-[1px] bg-white"></div>
                                    <div>
                                      <img src="/Assets/Option.svg" />
                                    </div>
                                  </>
                                }
                                BtnMenu="absolute right-[-50px] top-[50px] mt-2 w-[174px] z-10"
                                MenuList={getFilteredStatusList(viewProjectData?.projectRole,
                                  viewProjectData?.Milestones[index]?.Milestones[selectedIndex]?.milestoneStatus,
                                  viewProjectData?.Milestones[index]?.Milestones[selectedIndex]?.milestoneType)}
                                active=""
                                disable={getFilteredStatusList(viewProjectData?.projectRole,
                                  viewProjectData?.Milestones[index]?.Milestones[selectedIndex]?.milestoneStatus,
                                  viewProjectData?.Milestones[index]?.Milestones[selectedIndex]?.milestoneType).length === 0}
                                functionHandle={(e) =>
                                  HandleSubMenu(
                                    e,
                                    viewProjectData?.Milestones[index]?.Milestones[
                                      selectedIndex
                                    ]?.milestoneId,
                                    viewProjectData?.Milestones[index]?.Milestones[
                                      selectedIndex
                                    ]?.id,
                                    viewProjectData?.Milestones[index]?.Milestones[
                                      selectedIndex
                                    ]?.endDate,
                                    Number(viewProjectData?.Milestones[index]?.Milestones[
                                      selectedIndex
                                    ]?.revisions) - Number(viewProjectData?.Milestones[index]?.Milestones[
                                      selectedIndex
                                    ]?.revisionsCounter)
                                  )
                                }
                              />}
                          </div>
                        </div>
                      </>
                    )
                  )}
                </Tab.List>

                <div className="flex space-x-5 ">
                  <>
                    {openAssignRework && (
                      <AssignRework
                        close={closeAssignRework}
                        open={openAssignRework}
                        saveData={(reworkData: any) =>
                          updateMileStoneState(
                            "REWORK",
                            CurrentMilestoneEdit?.mileStoneId,
                            CurrentMilestoneEdit?.subMilestoneId,
                            CurrentMilestoneEdit?.endDate,
                            reworkData
                          )
                        }
                      />
                    )}

                    {pops && (
                      <IndivdualProviderList
                        open={pops}
                        close={closePop}
                        formik={formik}
                        assignIpIndex={assignIpIndex}
                        handleSave={handleSave}
                        viewProjectData={viewProjectData}
                      />
                    )}

                  </>
                </div>
              </div>

              <Tab.Panels>
                {viewProjectData?.Milestones[index]?.Milestones &&
                  viewProjectData?.Milestones[index]?.Milestones.length > 0 &&
                  viewProjectData?.Milestones[index]?.Milestones.map(
                    (element: any, subIndex: number) => (
                      <Tab.Panel
                        key={subIndex}
                        className={`w-full  bg-text-HeadLine-200 py-3
                ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2`}
                      >
                        <div>
                          <div className="p-5 border-text-gray-50">
                            {((element?.reworkComment && element?.reworkComment !== "")
                              || (element?.reworkDocs && element?.reworkDocs.length > 0)) &&
                              <div className="flex justify-end">
                                <div className="max-w-max py-1 px-2 text-[#353535] bg-[#FFD700]  rounded cursor-pointer" onClick={() => setOpenModalState("ReworkDetails")}>Rework Details</div>
                              </div>}
                            <div className="flex">
                              <Typography
                                label={"Title"}
                                color="primary"
                                variant={200}
                                classname="font-bold "
                                FontSize="sm"
                                type="p"
                              />
                            </div>
                            <Typography
                              label={element?.title || "-"}
                              color="primary"
                              variant={300}
                              FontSize="sm"
                              type="p"
                            />
                            <div className="mt-[10px]">
                              <div className="flex">
                                <Typography
                                  label={"Description"}
                                  color="primary"
                                  variant={200}
                                  classname="font-bold "
                                  FontSize="sm"
                                  type="p"
                                />
                              </div>
                              <Typography
                                label={element?.description || "-"}
                                color="primary"
                                variant={300}
                                FontSize="sm"
                                type="p"
                              />
                            </div>
                            <div className="mt-[10px]">
                              <div className="flex">
                                <Typography
                                  label={"Requirements"}
                                  color="primary"
                                  variant={200}
                                  classname="font-bold "
                                  FontSize="sm"
                                  type="p"
                                />
                              </div>
                              <Typography
                                label={element?.requirements || "-"}
                                color="primary"
                                variant={300}
                                FontSize="sm"
                                type="p"
                              />
                            </div>
                            <div className={"mt-[10px] flex justify-between"}>
                              <div>
                                <Typography
                                  label={"Fund Allocation"}
                                  color="primary"
                                  variant={200}
                                  classname="font-bold "
                                  FontSize="sm"
                                  type="p"
                                />

                                <Typography
                                  label={(element?.fundAllocation || "-") + " " + (currency || "-")}
                                  color="primary"
                                  variant={300}
                                  FontSize="sm"
                                  type="p"
                                />
                              </div>
                              <div>
                                <Typography
                                  label={"Submilestone Start"}
                                  color="primary"
                                  variant={200}
                                  classname="font-bold "
                                  FontSize="sm"
                                  type="p"
                                />

                                <Typography
                                  label={
                                    element?.startDate
                                      ? element?.endPointType == "DATE"
                                        ? moment(element?.startDate).format(
                                          "MMMM D, YYYY"
                                        )
                                        : moment(element?.startDate).format(
                                          "MMMM D, YYYY HH:mm a"
                                        )
                                      : "-"
                                  }
                                  color="primary"
                                  variant={300}
                                  FontSize="sm"
                                  type="p"
                                />
                              </div>
                              <div>
                                <Typography
                                  label={"Submilestone End"}
                                  color="primary"
                                  variant={200}
                                  classname="font-bold "
                                  FontSize="sm"
                                  type="p"
                                />

                                <Typography
                                  label={
                                    element?.endDate
                                      ? element?.endPointType == "DATE"
                                        ? moment(element?.endDate).format(
                                          "MMMM D, YYYY"
                                        )
                                        : moment(element?.endDate).format(
                                          "MMMM D, YYYY HH:mm a"
                                        )
                                      : "-"
                                  }
                                  color="primary"
                                  variant={300}
                                  FontSize="sm"
                                  type="p"
                                />
                              </div>

                              <div>
                                <Typography
                                  label={"No of Revision"}
                                  color="primary"
                                  variant={200}
                                  classname="font-bold "
                                  FontSize="sm"
                                  type="p"
                                />

                                <Typography
                                  label={
                                    (element?.revisionsCounter || element?.revisionsCounter >= 0)
                                      ? `${element?.revisionsCounter || 0}/${element?.revisions || 0
                                      }`
                                      : "-"
                                  }
                                  color="primary"
                                  variant={300}
                                  FontSize="sm"
                                  type="p"
                                />
                              </div>
                            </div>
                            <div className="mt-[10px]">
                              <Typography
                                label={"Acceptance criteria"}
                                color="primary"
                                variant={200}
                                classname="font-bold "
                                FontSize="sm"
                                type="p"
                              />

                              <Typography
                                label={element?.acceptanceCriteria || "-"}
                                color="primary"
                                variant={300}
                                FontSize="sm"
                                type="p"
                              />
                            </div>
                            <div className="mt-[10px] border-b-[1px] border-text-gray-50 py-[10px]">
                              <Typography
                                label={`Sub-Milestone ${index + 1}.${subIndex + 1} Deliverables`}
                                classname="text-text-HeadLine-100 font-bold "
                                FontSize="base"
                                type="p"
                              />
                            </div>
                            <div className="py-[10px]">
                              <div className="flex flex-col gap-2 mx-auto w-full">
                                {element?.uploadDeliverables &&
                                  element?.uploadDeliverables.length > 0 ?
                                  element?.uploadDeliverables.map(
                                    (element: any, idx: any) => {
                                      return (
                                        <React.Fragment key={element?.url + idx}>
                                          <div className="flex flex-row items-center justify-between">
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
                                  ) :
                                  <Typography
                                    label={"No Docs Uploaded Yet"}
                                    color="primary"
                                    variant={200}
                                    classname=""
                                    FontSize="sm"
                                    type="p"
                                  />
                                }
                              </div>
                            </div>
                          </div>
                          {element?.PenalityBreach &&
                            element?.PenalityBreach.length > 0 &&
                            <div className="px-4">
                              {element?.isPenaltyExcluded !== true && (
                                <div className="w-full flex justify-between bg-primary-600 p-[10px] rounded-[5px] border-[1px] border-text-gray-50 ">
                                  <Typography
                                    label={"Penalty"}
                                    FontSize="sm"
                                    type="p"
                                    classname="text-text-HeadLine-100 "
                                  />
                                  <Button
                                    variant="line"
                                    icon={
                                      FAQPenality ? (
                                        <img
                                          src="/Assets/FAQOpen.svg"
                                          alt="Open FAQ"
                                        />
                                      ) : (
                                        <img
                                          src="/Assets/FAQClose.svg"
                                          alt="Open FAQ"
                                        />
                                      )
                                    }
                                    label=""
                                    onClick={HandleFAQPenality}
                                  />
                                </div>
                              )}
                              {FAQPenality && openIndex === index ? (
                                <div className="p-5">
                                  {element?.isPenaltyExcluded !== true && (
                                    <div className="flex justify-between">
                                      <div>
                                        <Typography
                                          label={"Penalty Value in"}
                                          color="primary"
                                          variant={200}
                                          classname="font-bold "
                                          FontSize="sm"
                                          type="p"
                                        />
                                        <Typography
                                          label={
                                            element?.PenalityBreach?.[0]?.valueIn ==
                                              "PERCENT"
                                              ? "Percent"
                                              : "Amount"
                                          }
                                          color="primary"
                                          variant={300}
                                          FontSize="sm"
                                          type="p"
                                        />
                                        <div className="mt-[10px]">
                                          <Typography
                                            label={"Duration"}
                                            color="primary"
                                            variant={200}
                                            classname="font-bold "
                                            FontSize="sm"
                                            type="p"
                                          />
                                          <Typography
                                            label={
                                              element?.PenalityBreach?.[0]
                                                ?.pentalityDuration === "ByHour"
                                                ? "By Hour"
                                                : "By Day"
                                            }
                                            color="primary"
                                            variant={300}
                                            FontSize="sm"
                                            type="p"
                                          />
                                        </div>
                                      </div>
                                      <div className="border-[1px] border-text-gray-50 p-[10px] rounded-[5px]">
                                        <div className="flex justify-center">
                                          <Typography
                                            label={
                                              element?.PenalityBreach?.[0]
                                                ?.pentalityDuration === "ByHour"
                                                ? "By Hour"
                                                : "By Day"
                                            }
                                            type="p"
                                            classname="font-bold text-text-danger-100 "
                                            FontSize="base"
                                          />
                                        </div>
                                        {element?.PenalityBreach &&
                                          element?.PenalityBreach.length > 0 &&
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
                                                  label={`${ele?.penalityType === "WARNING"
                                                    ? "Warning"
                                                    : `${ele?.pentality} ${ele?.valueIn == "AMOUNT"
                                                      ? currency
                                                      : "%"
                                                    }`
                                                    } for `}
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
                                                  label={`  ${ele?.pentalityDuration === "ByHour"
                                                    ? `${Number(ele?.timeperiod) / 3600
                                                    } Hours`
                                                    : `${Number(ele?.timeperiod) / (3600 * 24)
                                                    } Days`
                                                    }`}
                                                  type="p"
                                                  color="primary"
                                                  variant={300}
                                                  FontSize="xs"
                                                />
                                              </div>
                                            )
                                          )}
                                      </div>
                                    </div>
                                  )}
                                  {element?.PenalityBreach &&
                                    element?.PenalityBreach.length > 0 &&
                                    element?.PenalityBreach.map(
                                      (ele: any, index: number) => {
                                        return (
                                          <div key={index}>
                                            <div className="mt-[20px] border-b-[1px] border-text-gray-50">
                                              <Typography
                                                label={`Breach ${index + 1}`}
                                                type="p"
                                                FontSize="sm"
                                                classname="font-bold text-text-HeadLine-100"
                                              />
                                            </div>
                                            <div className="flex justify-between mt-[10px]">
                                              <div>
                                                {" "}
                                                <Typography
                                                  label={"Select"}
                                                  color="primary"
                                                  variant={200}
                                                  classname="font-bold "
                                                  FontSize="sm"
                                                  type="p"
                                                />
                                                <Typography
                                                  label={
                                                    ele?.penalityType == "PENALTY"
                                                      ? "Penalty"
                                                      : "Send Warning"
                                                  }
                                                  color="primary"
                                                  variant={300}
                                                  FontSize="sm"
                                                  type="p"
                                                />
                                              </div>
                                              <div>
                                                {" "}
                                                <Typography
                                                  label={"Penalty"}
                                                  color="primary"
                                                  variant={200}
                                                  classname="font-bold "
                                                  FontSize="sm"
                                                  type="p"
                                                />
                                                <Typography
                                                  label={`${ele?.pentality} ${ele?.valueIn == "AMOUNT" ? currency : "%"
                                                    }`}
                                                  color="primary"
                                                  variant={300}
                                                  FontSize="sm"
                                                  type="p"
                                                />
                                              </div>
                                              <div>
                                                {" "}
                                                <Typography
                                                  label={"Time Period"}
                                                  color="primary"
                                                  variant={200}
                                                  classname="font-bold "
                                                  FontSize="sm"
                                                  type="p"
                                                />
                                                <Typography
                                                  label={`  ${ele?.pentalityDuration === 'ByHour'
                                                    ? `${Number(ele?.timeperiod) / 3600} Hours`
                                                    : `${Number(ele?.timeperiod) / (3600 * 24)} Days`}`}
                                                  color="primary"
                                                  variant={300}
                                                  FontSize="sm"
                                                  type="p"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>}
                        </div>
                      </Tab.Panel>
                    )
                  )}
              </Tab.Panels>
            </Tab.Group>
          </div >
        )}
    </>
  );
};
