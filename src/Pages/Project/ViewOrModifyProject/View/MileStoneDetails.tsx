import {
  ContractExecuteTransaction,
  ContractFunctionParameters
} from "@hashgraph/sdk";
import moment from "moment";
import React, { useState } from "react";
import {
  Button,
  Typography
} from "../../../../Components/Atoms";
import { NoDataFound } from "../../../../Components/Atoms/CustomNoDataPage";
import { ButtonLoader } from "../../../../Components/Atoms/Loader";
import { DropdownMolecule } from "../../../../Components/Molecules/Dropdown";
import { CustomTab } from "../../../../Components/Molecules/Structure/CustomTab";
import { gasLimit } from "../../../../Constants/Hedera";
import { getFilteredStatusList, getLabelForPenalty, milestoneStatus } from "../../../../Constants/MenuList";
import { AuthState } from "../../../../Context/auth";
import { useHashConnect } from '../../../../Providers/HasConnectAPIProvider';
import { findMilestoneIndex } from "../../../../Utils/contractHelper";
import { handleCustomError, showToast, updateTransactionDetails } from "../../../../Utils/helper";
import { DOCUMENT_UPLOAD, UPLOAD_MILESTONES_DELIVERABLES } from "../../../../sevices";
import ReworkDetailsPopup from "../../Popups/ReworkDetails";
import AssignRework from "./../../Popups/AssignRework";
import CreateNftPopup from "./../../Popups/CreateNftPopup";
import PostWorkTransferPopup from "./../../Popups/PostWorkTransferPopup";
import SucessFullNftCreatePopup from "./../../Popups/SucessFullNftCreatePopup";
import CreateSubMileStone from "./CreateSubMileStone";
import SubMileStoneDetails from "./SubMileStoneDetails";
import CustomTooltip from "../../../../Components/Molecules/CustomTooltip";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const MileStoneDetails = ({ viewProjectData, formik, refetch, handleNumberInputChange }: any) => {
  const [openIndex, setOpenIndex] = useState(-1);
  const [FAQPenality, setFAQPenality] = useState(true);
  const [FAQRoyality, setFAQRoyality] = useState(false);
  const [UploadDeliverables, setUploadDeliverables] = useState(false);
  const { connectWith } = AuthState();
  const [openAssignRework, setopenAssignRework] = useState(false);
  const [SubMileStone, setSubMileStone] = useState(false);
  const [openedIndex, setOpenedIndex] = useState(0);
  const [SubmilestoneDetail, setSubmilestoneDetail] = useState(false);
  const [CreateNft, setCreateNft] = useState(false);
  const [SuccessNft, setSucessNft] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getProvider, getSigner, state } = useHashConnect();
  const { Escrow, ProjectDetails } = viewProjectData;
  const currency = ProjectDetails?.currency
  const [CurrentMilestoneEdit, setCurrentMilestoneEdit] = useState<any>(null);
  const [OpenModalState, setOpenModalState] = useState<any>("");

  const SubmileStoneFunction = (index: number) => {
    if (state === "Connected") {
      setSubMileStone((prev) => {
        setOpenedIndex(index);
        return !prev;
      });
    } else {
      showToast("Please connect your wallet", "info");
    }
  };

  const SubMileStoneClose = () => {
    setSubMileStone(false);
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  const HandleFAQPenality = () => {
    setFAQPenality((prevValue) => !prevValue);
  };
  const HandleFAQRoyality = () => {
    setFAQRoyality((prevValue) => !prevValue);
  };

  const HandleSubMenu = (name: string, mileStoneId: string, endDate: any, milestoneType: any, element: any, reworkCount?: any) => {
    if (state === "Connected") {
      if (name === "REWORK") {
        if (reworkCount === 0) {
          showToast('Revision limit reached', 'info');
        } else {
          setCurrentMilestoneEdit({
            mileStoneId: mileStoneId,
            endDate: endDate,
            element: element
          });
          setopenAssignRework((prev) => !prev);
        }
      } else {
        updateMileStoneState(name, mileStoneId, endDate, milestoneType, element);
      }
    } else {
      showToast("Please connect your wallet", "info");
    }
  };

  const closeAssignRework = () => {
    setopenAssignRework(false);
  };
  const closeSubmileStone = () => {
    setSubmilestoneDetail(false);
  };
  const openSubmileStone = () => {
    setSubmilestoneDetail((prev) => !prev);
  };
  const UploadDeliverablesClose = () => {
    setUploadDeliverables(false);
  };
  const CreateNftOpen = () => {
    setCreateNft((prev) => !prev);
  };
  const CreateNftClose = () => {
    setCreateNft(false);
  };
  const sucessNftOpen = () => {
    setSucessNft((prev) => !prev);
  };
  const sucessNftClose = () => {
    setSucessNft(false);
  };

  const updateMileStoneState = async (
    milestoneState: string,
    mileStoneId: string,
    endDate: any,
    milestoneType: any,
    element: any,
    reworkData?: any
  ) => {
    try {
      if (state === "Connected") {
        if (Escrow?.escrowContractId) {
          let stateIndex = findMilestoneIndex(milestoneState);
          const provider = getProvider();
          const signer = getSigner(provider);
          let milestoneFunction = milestoneType === "submilestone" ? "changeSubMilestoneState" : "changeMilestoneState"
          let milestoneEvent = milestoneType === "submilestone" ? "SubMilestoneStateChanged" : "MilestoneStateChanged"
          console.log(milestoneType, milestoneFunction, milestoneEvent, mileStoneId, stateIndex, moment(endDate).unix(), Escrow.escrowContractId, element, "Milestone state change");

          let changeMilestoneStateExecTx: any;
          if (milestoneType === "submilestone") {
            changeMilestoneStateExecTx = await new ContractExecuteTransaction()
              .setContractId(Escrow.escrowContractId)
              .setGas(gasLimit)
              .setFunction(
                milestoneFunction,
                new ContractFunctionParameters()
                  .addString(element?.milestoneId) //milestone ID
                  .addString(element?.id) //submilestone ID
                  .addUint8(stateIndex)
                  .addUint32(moment(endDate).unix()) //endDate
              )
              .freezeWithSigner(signer);
          } else {
            changeMilestoneStateExecTx = await new ContractExecuteTransaction()
              .setContractId(Escrow.escrowContractId)
              .setGas(gasLimit)
              .setFunction(
                milestoneFunction,
                new ContractFunctionParameters()
                  .addString(mileStoneId) //milestone ID
                  .addUint8(stateIndex)
                  .addUint32(moment(endDate).unix()) //endDate
              )
              .freezeWithSigner(signer);
          }
          let milestoneTx = await changeMilestoneStateExecTx.executeWithSigner(
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
            await updateTransactionDetails(transactionid, milestoneFunction, milestoneEvent, reworkBody)
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

  const uploadDeliverablesOnMilestone = async (milestoneData: any, e: any) => {
    try {
      setIsLoading(true)
      let file = e.target.files[0]
      let formdata = new FormData();
      formdata.append("file", file);
      let res = await DOCUMENT_UPLOAD(formdata)
      let body = {
        milestoneId: milestoneData?.id,
        deliverables: milestoneData?.uploadDeliverables && milestoneData?.uploadDeliverables.length > 0
          ? [...milestoneData.uploadDeliverables, {
            "url": res?.data,
            "fileName": file?.name,
            "mimeType": file?.type
          }]
          : [{
            "url": res?.data,
            "fileName": file?.name,
            "mimeType": file?.type
          }]
      };
      let data = await UPLOAD_MILESTONES_DELIVERABLES(body)
      await refetch();
    } catch (error) {
      handleCustomError(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      {SubMileStone && (
        <CreateSubMileStone
          open={SubMileStone}
          close={SubMileStoneClose}
          nextpop={openSubmileStone}
          openedIndex={openedIndex}
          viewProjectData={viewProjectData}
        />
      )}
      {/* //! nft pop  */}
      {SuccessNft && (
        <SucessFullNftCreatePopup open={SuccessNft} close={sucessNftClose} />
      )}
      {CreateNft && (
        <CreateNftPopup
          open={CreateNft}
          close={CreateNftClose}
          nextpop={sucessNftOpen}
        />
      )}
      {UploadDeliverables && (
        <PostWorkTransferPopup
          open={UploadDeliverables}
          close={UploadDeliverablesClose}
          nextpop={CreateNftOpen}
        />
      )}
      {SubmilestoneDetail && (
        <SubMileStoneDetails
          open={SubmilestoneDetail}
          close={closeSubmileStone}
          openedIndex={openedIndex}
          viewProjectData={viewProjectData}
          IndividulaProvider={formik}
          handleNumberInputChange={handleNumberInputChange}
          refetch={refetch}
        />
      )}
      <div className="w-full">
        {viewProjectData?.Milestones &&
          viewProjectData?.Milestones.length > 0 ? (
          viewProjectData?.Milestones.map((element: any, index: number) => {
            return (
              <>
                {openAssignRework && (
                  <AssignRework
                    close={closeAssignRework}
                    open={openAssignRework}
                    saveData={(reworkData: any) =>
                      updateMileStoneState(
                        "REWORK",
                        CurrentMilestoneEdit?.mileStoneId,
                        CurrentMilestoneEdit?.endDate,
                        CurrentMilestoneEdit?.milestoneType,
                        CurrentMilestoneEdit?.element,
                        reworkData
                      )
                    }
                  />
                )}
                {OpenModalState == `ReworkDetails${index}` && (
                  <ReworkDetailsPopup
                    close={() => setOpenModalState("")}
                    open={OpenModalState == `ReworkDetails${index}` ? true : false}
                    reworkDetails={{ reworkComment: element?.reworkComment, reworkDocs: element?.reworkDocs }}
                  />
                )}
                <div
                  className={`shadow-navbar rounded-[5px]  ${index > 0 && " my-5 "
                    }  ${openIndex != -1 && "pb-5"} `}
                >
                  <div className="flex justify-between  px-5 pb-[10px] pt-5 ">
                    <Typography
                      label={`Milestone ${index + 1}`}
                      classname="text-text-HeadLine-100 font-bold "
                      type="h2"
                    />

                    <div className="flex  space-x-5 ">
                      {((element?.reworkComment && element?.reworkComment !== "")
                        || (element?.reworkDocs && element?.reworkDocs.length > 0)) && <div className="py-1 px-2 text-[#353535] bg-[#FFD700] rounded cursor-pointer" onClick={() => setOpenModalState(`ReworkDetails${index}`)}>Rework Details</div>}
                      {/* //Status Button */}
                      <>
                        {element.Funds &&
                          ((element.Funds?.fundTranscationIdToEscrow &&
                            element.Funds?.fundTranscationIdToEscrow != "") || element?.milestoneType === "submilestone") &&
                          <DropdownMolecule
                            BtnClass="w-[125px] h-[32px] bg-text-sucess-100 rounded-[5px]  text-white flex items-center justify-center space-x-[10px] cursor-default"
                            BtnData={
                              <>
                                <div>
                                  {milestoneStatus[element?.milestoneStatus]}{" "}
                                </div>
                                <div className="h-[32px] w-[1px] bg-white"></div>
                                <div>
                                  <img src="/Assets/Option.svg" />
                                </div>
                              </>
                            }
                            BtnMenu="absolute right-[-50px] top-[50px] mt-2 w-[174px] z-10"
                            MenuList={getFilteredStatusList(viewProjectData?.projectRole, element?.milestoneStatus, element?.milestoneType)}
                            active=""
                            disable={getFilteredStatusList(viewProjectData?.projectRole, element?.milestoneStatus, element?.milestoneType).length == 0}
                            functionHandle={(e) =>
                              HandleSubMenu(e, element.id, element.endDate, element?.milestoneType, element, Number(element?.revisions) - Number(element?.revisionsCounter))
                            }
                          />
                        }
                      </>
                      <div>
                        <Button
                          label={""}
                          size="small"
                          variant="line"
                          onClick={() => {
                            toggleFAQ(index);
                          }}
                          icon={
                            openIndex === index ? (
                              <img src="/Assets/FAQOpen.svg" alt="Open FAQ" />
                            ) : (
                              <img src="/Assets/FAQClose.svg" alt="Open FAQ" />
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {openIndex === index ? (
                    <>
                      <div className="p-5 border-t-[1px] border-text-gray-50">
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
                        <div
                          className={`flex justify-between`}
                        >

                          <div>
                            <Typography
                              label={"Fund Allocated"}
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
                            {" "}
                            <Typography
                              label={"Revision Count"}
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
                          <div>
                            <Typography
                              label={"Milestone Start"}
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
                            {" "}
                            <Typography
                              label={"Milestone End"}
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
                        </div>
                        <div className="my-[10px] ">
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
                        {viewProjectData.Escrow && viewProjectData.Escrow?.transferOwnershipStatus === "SUCCESS" &&
                          <>
                            <div className="flex  justify-between">
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
                            <div className="py-2">
                              <div className="bg-primary-400 rounded-sm w-full h-[12px] relative  ">
                                <div
                                  className="bg-primary-100  h-[12px]  rounded-[2px]  "
                                  style={{ width: `${Number(element?.burnRate?.actualPercentage > 100 ? 100 : element?.burnRate?.actualPercentage) || 0.5}%` }}
                                ></div>
                                <div
                                  className="bg-text-warning-50 h-[4px]  rounded-[2px] mb-[6px] absolute top-[40%]  "
                                  style={{ width: `${Number(element?.burnRate?.predictedPercentage > 100 ? 100 : element?.burnRate?.predictedPercentage) || 0.5}%` }}
                                ></div>
                              </div>
                            </div>
                          </>
                        }
                        <>

                          {connectWith ===
                            "Connect with Individual Provider" &&
                            viewProjectData?.projectRole === "CP" &&
                            Escrow &&
                            element?.milestoneStatus !== "IN_PROGRESS" &&
                            element?.milestoneStatus !== "IN_REVIEW" &&
                            element?.milestoneStatus !== "FORCE_CLOSED" &&
                            element?.milestoneStatus !== "REWORK" &&
                            element?.milestoneStatus !== "COMPLETED" && (
                              <div className="mt-5  flex justify-center gap-5 ">
                                <div className="w-[250px]">
                                  <Button
                                    label="Create Sub-Milestones"
                                    size="small"
                                    color="secondary"
                                    onClick={() =>
                                      SubmileStoneFunction(index)
                                    }
                                    variant="Transparent"
                                  />{" "}
                                </div>
                              </div>
                            )}
                        </>
                      </div>
                      <>
                        <div className="border-b-[1px] border-text-gray-50 px-5 py-[10px]">
                          <Typography
                            label={`Milestone ${index + 1} Deliverables`}
                            classname="text-text-HeadLine-100 font-bold "
                            FontSize="base"
                            type="p"
                          />
                        </div>
                        <div className=" px-5 py-[10px]">
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
                      </>
                      {((element?.milestoneStatus == "IN_PROGRESS") &&
                        ((element?.milestoneType === 'milestone' && viewProjectData?.projectRole === 'CP') ||
                          (element?.milestoneType === 'submilestone' && viewProjectData?.projectRole === 'IP'))) && (
                          <div className="flex justify-center py-2">
                            <input
                              type="file"
                              id="fileInputuploadDeliverables"
                              style={{ display: "none" }}
                              onChange={(e: any) =>
                                uploadDeliverablesOnMilestone(element, e)
                              }
                              disabled={isLoading}
                            />
                            <label
                              className={`flex items-center gap-x-2 bg-transparent font-medium py-2 px-[0.5rem] rounded-md border-[1px]  border-text-secondary-50 font-base text-text-secondary-50 hover:bg-text-secondary-100 ${isLoading ? "cursor-not-allowed" : 'cursor-pointer'}`}
                              htmlFor="fileInputuploadDeliverables"
                            >
                              <div className="min-w-max">
                                Upload Deliverables{" "}
                              </div>
                              {isLoading && <ButtonLoader />}
                            </label>
                          </div>
                        )}
                      {element?.PenalityBreach && <>
                        {element?.isPenaltyExcluded !== true && (
                          <div className="flex justify-between bg-primary-600 p-[10px] mx-5 rounded-[5px] border-[1px] border-text-gray-50 ">
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
                                  <img src="/Assets/FAQOpen.svg" alt="Open FAQ" />
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
                      </>}
                      {element?.royaltyAmount && (
                        <>
                          <div className="flex justify-between bg-primary-600 p-[10px] m-5   rounded-[5px] border-[1px] border-text-gray-50 ">
                            <Typography
                              label={"Success Bonus"}
                              FontSize="sm"
                              type="p"
                              classname="text-text-HeadLine-100 "
                            />
                            <Button
                              variant="line"
                              icon={
                                FAQRoyality ? (
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
                              onClick={HandleFAQRoyality}
                            />
                          </div>
                          {FAQRoyality && openIndex === index ? (
                            <div className="flex justify-between p-5">
                              <div>
                                <Typography
                                  label={"Success Bonus Type"}
                                  type="p"
                                  color="primary"
                                  variant={200}
                                  FontSize="sm"
                                  classname="font-bold "
                                />
                                <Typography
                                  label={`${element?.royaltyType == "PRE_PAYMENT_ROYALTY" ? "Prepayment" : "PostPayment"} Success Bonus ` || '-'}
                                  type="p"
                                  color="primary"
                                  variant={300}
                                  FontSize="sm"
                                />
                              </div>
                              <div>
                                <Typography
                                  label={"Success Bonus (in percent)"}
                                  type="p"
                                  color="primary"
                                  variant={200}
                                  FontSize="sm"
                                  classname="font-bold "
                                />
                                <Typography
                                  label={`${element?.royaltyAmount | 0}%`}
                                  type="p"
                                  color="primary"
                                  variant={300}
                                  FontSize="sm"
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                      <div>
                        {connectWith ===
                          "Connect with Individual Provider" &&
                          <CustomTab
                            viewProjectData={viewProjectData}
                            index={index}
                            openIndex={openIndex}
                            refetch={refetch}
                            formik={formik}
                          />}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </>
            );
          })
        ) : (
          <NoDataFound />
        )}
      </div>
    </>
  );
};

export default MileStoneDetails;