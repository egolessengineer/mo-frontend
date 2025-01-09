import {
  AccountId,
  ContractExecuteTransaction,
  ContractFunctionParameters,
} from "@hashgraph/sdk";
import { useFormik } from "formik";
import moment from "moment";
import { useState } from "react";
import * as Yup from "yup";
import {
  Button,
  CheckBoxAtom,
  HelperText,
  Textfield,
  Typography,
} from "../../../../Components/Atoms";
import { NoDataFound } from "../../../../Components/Atoms/CustomNoDataPage";
import { ModalAtom } from "../../../../Components/Molecules";
import CustomDropdown from "../../../../Components/Molecules/Structure/CustomDropdown";
import { HBAR_VALUE, USDC_VALUE, gasLimit } from "../../../../Constants/Hedera";
import { getLabelForPenalty } from "../../../../Constants/MenuList";
import { messages } from "../../../../Constants/messages";
import { useHashConnect } from "../../../../Providers/HasConnectAPIProvider";
import {
  getCurrentDate,
  handleCustomError,
  showToast,
  updateTransactionDetails,
} from "../../../../Utils/helper";
import { CREATE_SUBMILESTONE } from "../../../../sevices";
import IndivdualProviderList from "../../Popups/IndivdualProviderList";
import { TrashIcon } from "@heroicons/react/24/outline";

const SubMileStoneDetails = ({
  open,
  close,
  viewProjectData,
  openedIndex,
  IndividulaProvider,
  refetch,
}: any) => {
  const [openIndex, setOpenIndex] = useState(-1);
  const [FAQPenality, setFAQPenality] = useState(true);
  const [IsLoading, setIsLoading] = useState(false);
  const { getProvider, getSigner, state } = useHashConnect();
  const { Escrow } = viewProjectData;
  const [assignIpIndex, setassignIpIndex] = useState("");

  const Exclude = (e: any, milestoneIndex: number) => {
    if (e.target.checked) {
      formik.setFieldValue(
        `subMileStones[${milestoneIndex}].penalityBreach`,
        []
      );
      formik.setFieldValue(`subMileStones[${milestoneIndex}].valueIn`, "");
      formik.setFieldValue(
        `subMileStones[${milestoneIndex}].pentalityDuration`,
        ""
      );
    }
    formik.setFieldValue(
      `subMileStones[${milestoneIndex}].isPenaltyExcluded`,
      e.target.checked
    );
  };

  let initialValues = {
    subMileStones: [],
  };
  const handleProjectCreation = async () => {
    try {
      setIsLoading(true)
      let values: any = formik.values.subMileStones;
      const modifiedMileStones: any = [];
      values?.forEach((milestone: any) => {
        let tempBreaches: any = [];
        milestone?.penalityBreach &&
          milestone?.penalityBreach.forEach((breaches: any) => {
            tempBreaches.push({
              ...breaches,
              valueIn: milestone?.valueIn,
              pentalityDuration: milestone?.pentalityDuration,
              timeperiod:
                milestone?.pentalityDuration === "ByHour"
                  ? Number(breaches?.timeperiod) * 3600 * 1
                  : Number(breaches?.timeperiod) * 3600 * 24,
              pentality:
                breaches?.penalityType === "WARNING"
                  ? 0
                  : Number(breaches?.pentality),
            });
          });
        modifiedMileStones.push({
          ...milestone,
          penalityBreach: tempBreaches,
          fundAllocation: Number(milestone?.fundAllocation),
          revisions: Number(milestone?.revisions),
          startDate: Date.parse(milestone?.startDate) / 1000,
          endDate: Date.parse(milestone?.endDate) / 1000,
          pentality: Number(milestone?.pentality),
          dateAssigned: Math.floor(new Date().getTime() / 1000),
          milestoneId: viewProjectData?.Milestones[openedIndex].id,
          AssignedTo: milestone?.AssignedTo?.id
        });
      });
      let body: any = {
        projectId: viewProjectData?.id,
        subMilestones: modifiedMileStones,
        milestoneId: viewProjectData?.Milestones[openedIndex].id,
      };
      let res = await CREATE_SUBMILESTONE(body)
      let data = res.data;
      if (data && data.length > 0) {
        if (state === "Connected") {
          if (Escrow.escrowContractId) {
            const provider = getProvider();
            const signer = getSigner(provider);
            const batchSize = 7;
            let addSubMilestonesExecTx: any;
            for (let i = 0; i < data.length; i += batchSize) {
              const batch = data.slice(i, i + batchSize);
              const firstBatchItem = data[0];
              let milestoneIds = firstBatchItem.milestoneId || "";
              const individualProviders: any = [];
              const functionParams = new ContractFunctionParameters();
              const subMilestoneIds: string[] = [];
              const startDates: number[] = [];
              const endDates: number[] = [];
              const fundAllocations: number[] = [];
              const revisions: number[] = [];
              const penaltyDurations: string[] = [];
              const penaltyValues: string[] = [];

              await Promise.all(
                batch.map(async (batchItem: any) => {
                  if (batchItem) {
                    if (batchItem.isDeployedOnContract == null) {
                      const fundAllocation =
                        viewProjectData.ProjectDetails.currency === "HBAR"
                          ? batchItem.fundAllocation * HBAR_VALUE
                          : batchItem.fundAllocation * USDC_VALUE;
                      subMilestoneIds.push(batchItem.id || "");
                      individualProviders.push(AccountId.fromString(batchItem?.User?.walletAddress).toSolidityAddress())
                      startDates.push(Math.floor(typeof batchItem.startDate == "number" ? batchItem.startDate : Date.parse(batchItem.startDate.toString()) / 1000));//convert
                      endDates.push(Math.floor(typeof batchItem.endDate == "number" ? batchItem.endDate : Date.parse(batchItem.endDate.toString()) / 1000));//convert
                      // endDates.push(Math.floor(Date.parse(batchItem.endDate.toString()) / 1000));//convert
                      fundAllocations.push(fundAllocation || 0);//conert  USDC *10^6 , HBAR *10^8
                      revisions.push(batchItem.revisions || 0);
                      const submilestonePenaltyDurations =
                        batchItem?.PenalityBreach?.map((penaltyBreachItem: any) => {
                          return penaltyBreachItem?.timeperiod || 0;
                        });
                      const submilestonePenaltyValues =
                        batchItem?.PenalityBreach?.map((penaltyBreachItem: any) => {
                          let penaltyAmount;
                          if (penaltyBreachItem.valueIn === 'AMOUNT') {
                            penaltyAmount = penaltyBreachItem.pentality;
                          } else if (penaltyBreachItem.valueIn === 'PERCENT') {
                            const percentage = parseFloat(penaltyBreachItem.pentality) / 100;
                            penaltyAmount = batchItem.fundAllocation * percentage;
                          }
                          viewProjectData.ProjectDetails.currency === "HBAR" ?
                            penaltyAmount = penaltyAmount * HBAR_VALUE :
                            penaltyAmount = penaltyAmount * USDC_VALUE
                          return Math.round(penaltyAmount || 0); // calculate Amount if type %
                        });

                      const formattedPenaltyDurations =
                        submilestonePenaltyDurations.length > 1
                          ? submilestonePenaltyDurations.join("-")
                          : submilestonePenaltyDurations.join("");

                      const formattedPenaltyValues =
                        submilestonePenaltyValues.length > 1
                          ? submilestonePenaltyValues.join("-")
                          : submilestonePenaltyValues.join("");

                      penaltyDurations.push(formattedPenaltyDurations);
                      penaltyValues.push(formattedPenaltyValues);
                    } else {
                      console.log(
                        "Skipped subMilestone due to isDeployedOnContract:",
                        batchItem
                      );
                    }
                  } else {
                    console.log(
                      "Skipped batchItem without subMilestone:",
                      batchItem
                    );
                  }
                })
              );
              console.log("individualProviders:", individualProviders);
              console.log("milestoneIds:", milestoneIds);
              console.log("subMilestoneIds:", subMilestoneIds);
              console.log("startDates:", startDates);
              console.log("endDates:", endDates);
              console.log("fundAllocations:", fundAllocations);
              console.log("revisions:", revisions);
              console.log("penaltyDurations:", penaltyDurations);
              console.log("penaltyValues:", penaltyValues);
              functionParams
                .addAddressArray(individualProviders)
                .addString(milestoneIds)
                .addStringArray(subMilestoneIds)
                .addUint32Array(startDates)
                .addUint32Array(endDates)
                .addUint256Array(fundAllocations)
                .addUint8Array(revisions)
                .addStringArray(penaltyDurations)
                .addStringArray(penaltyValues);

              addSubMilestonesExecTx = await new ContractExecuteTransaction()
                .setContractId(Escrow.escrowContractId)
                .setGas(gasLimit)
                .setFunction("addSubMilestones", functionParams)
                .freezeWithSigner(signer);
            }
            let fundProjecteTx = await addSubMilestonesExecTx.executeWithSigner(
              signer
            );
            console.log("fundProjecteTx: ", fundProjecteTx);
            if (fundProjecteTx?.transactionId) {
              let transactionIDSplit = fundProjecteTx?.transactionId
                .toString()
                .split("@");
              let transactionid = transactionIDSplit[1].replace(".", "-");
              transactionid = transactionIDSplit[0] + "-" + transactionid;
              await updateTransactionDetails(
                transactionid,
                "addSubMilestones",
                "SubMilestoneAdded"
              );
              console.log("transactionid", transactionid);
            }
            await refetch();
            // }
            showToast("Sub Milestone Created", "success");
            // navigation("/");
          } else {
            showToast("The escrow has not been created yet.", "info");
          }
        } else {
          showToast("Please connect your wallet", "info");
        }
      }
    } catch (error) {
      handleCustomError(error);
      console.log(error, "error");
    } finally {
      setIsLoading(false)
    }
  };

  const getValidationSchema = () => {
    return Yup.object().shape({
      subMileStones: Yup.array().of(
        Yup.object().shape({
          // id: Yup.string(),
          title: Yup.string()
            .required("Title is required")
            .min(5, messages.ENTER_MIN_CHAR)
            .max(50, messages.ENTER_MAX_CHAR),
          description: Yup.string()
            .required("Description is required")
            .min(5, messages.ENTER_MIN_CHAR),
          requirements: Yup.string()
            .required("Requirements are required")
            .min(5, messages.ENTER_MIN_CHAR),
          AssignedTo: Yup.object().shape({
            id: Yup.string().required("Assign IP"),
            name: Yup.string().required("Assign IP"),
            profileLink: Yup.string(),
          }),
          endPointType: Yup.string().required("End Point is required"),
          startDate: Yup.string().required("date is required"),
          endDate: Yup.string().required("Date is required"),
          fundAllocation: Yup.number()
            .required("Fund Allocation is required")
            .typeError("Please enter number value only")
            .moreThan(0, "Please enter more than 0"),
          revisions: Yup.number()
            .integer("Please enter integer only")
            .required("No. of revisions is required")
            .typeError("Please enter number value only")
            .moreThan(-1, "Please enter valid revision"),
          acceptanceCriteria: Yup.string()
            .required("Acceptance Criteria is required")
            .min(5, messages.ENTER_MIN_CHAR),

          valueIn: Yup.string().when(["isPenaltyExcluded"], {
            is: (isPenaltyExcluded: boolean) => !isPenaltyExcluded,
            then: () => Yup.string().required("Penalty Value is required"),
            otherwise: () => Yup.string(),
          }),

          pentalityDuration: Yup.string().when(["isPenaltyExcluded"], {
            is: (isPenaltyExcluded: boolean) => !isPenaltyExcluded,
            then: () => Yup.string().required("duration is required"),
            otherwise: () => Yup.string(),
          }),

          penalityBreach: Yup.array().when(["isPenaltyExcluded", "valueIn"], {
            is: (isPenaltyExcluded: boolean, valueIn: string) =>
              !isPenaltyExcluded && valueIn === "AMOUNT",
            then: () =>
              Yup.array()
                .min(1)
                .of(
                  Yup.object().shape({
                    penalityType: Yup.string().required("duration is required"),
                    pentality: Yup.string().when(["penalityType"], {
                      is: (penalityType: string) => penalityType === "PENALTY",
                      then: () =>
                        Yup.number()
                          .required("penality is required")
                          .typeError("Please enter number value only")
                          .moreThan(0, "Please enter more than 0"),
                      otherwise: () => Yup.string(),
                    }),
                    timeperiod: Yup.number()
                      .integer("Please enter integer only")
                      .required("Time Period is required")
                      .typeError("Please enter number value only")
                      .moreThan(-1, "Please enter valid revision"),
                  })
                ),
            otherwise: () => Yup.array(),
          }),
        })
      ),
    });
  };
  const validate = (values: any) => {
    const { subMileStones }: any = values;
    const expectedTotal = Number(
      viewProjectData?.Milestones[openedIndex]?.fundAllocation
    );
    let actualTotal = 0
    actualTotal = subMileStones.reduce((sum: any, item: any) => {
      sum += Number(item.fundAllocation);
      return sum;
    }, actualTotal);
    if (viewProjectData?.Milestones?.[openedIndex]?.Milestones.length > 0) {
      actualTotal = viewProjectData?.Milestones?.[openedIndex]?.Milestones.reduce((sum: any, item: any) => {
        sum += Number(item.fundAllocation);
        return sum;
      }, actualTotal);
    }
    let error: any = {};
    subMileStones &&
      subMileStones.length > 0 &&
      subMileStones.forEach((subMileStone: any, subMileStoneIndex: any) => {
        if (subMileStone?.startDate) {
          let startDate = new Date(subMileStone?.startDate);
          let minStartDate = new Date(viewProjectData?.Milestones?.[openedIndex]?.startDate);
          if (subMileStone.endPointType === 'DATE') {
            // Compare dates without time
            startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            minStartDate = new Date(minStartDate.getFullYear(), minStartDate.getMonth(), minStartDate.getDate());
          }
          if (minStartDate > startDate) {
            if (!error.subMileStones) {
              error.subMileStones = [];
            }
            if (!error.subMileStones[subMileStoneIndex]) {
              error.subMileStones[subMileStoneIndex] = {};
            }
            error.subMileStones[subMileStoneIndex].startDate = `Submiletone start Date should be more than milestone start date`;
          }
        }
        if (subMileStone?.endDate) {
          let endDate = new Date(subMileStone?.endDate);
          let maxEndDate = new Date(viewProjectData?.Milestones?.[openedIndex]?.endDate);
          if (subMileStone.endPointType === 'DATE') {
            // Compare dates without time
            endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
            maxEndDate = new Date(maxEndDate.getFullYear(), maxEndDate.getMonth(), maxEndDate.getDate());
          }
          if (endDate > maxEndDate) {
            if (!error.subMileStones) {
              error.subMileStones = [];
            }
            if (!error.subMileStones[subMileStoneIndex]) {
              error.subMileStones[subMileStoneIndex] = {};
            }
            error.subMileStones[subMileStoneIndex].endDate = `Submiletone End Date should not exceed milestone end date`;
          }
        }
        subMileStone?.penalityBreach &&
          subMileStone?.penalityBreach.length > 0 &&
          subMileStone?.penalityBreach.forEach(
            (penality: any, penalityIndex: any) => {
              if (
                (subMileStone?.valueIn === "PERCENT" &&
                  Number(penality.pentality) > 100) ||
                (subMileStone?.valueIn === "AMOUNT" &&
                  Number(penality?.pentality) >
                  Number(subMileStone?.fundAllocation))
              ) {
                if (!error.subMileStones) {
                  error.subMileStones = [];
                }

                if (!error.subMileStones[subMileStoneIndex]) {
                  error.subMileStones[subMileStoneIndex] = {
                    penalityBreach: [],
                  };
                }

                if (!error.subMileStones[subMileStoneIndex].penalityBreach) {
                  error.subMileStones[subMileStoneIndex].penalityBreach = [];
                }

                if (
                  !error.subMileStones[subMileStoneIndex].penalityBreach[
                  penalityIndex
                  ]
                ) {
                  error.subMileStones[subMileStoneIndex].penalityBreach[
                    penalityIndex
                  ] = {};
                }

                error.subMileStones[subMileStoneIndex].penalityBreach[
                  penalityIndex
                ].pentality =
                  subMileStone?.valueIn === "PERCENT"
                    ? "Max 100 is Possible"
                    : "Exceeding Milestone fund";
              }
            }
          );
      });
    if (actualTotal > expectedTotal) {
      error.mileStoneFunds = "Exceeding total Milestone fund";
      showToast('Total of Submilestone funds exceeding Milestone fund', 'warning')
    }

    return error;
  };

  const formik: any = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: getValidationSchema(),
    validate: validate as any,
    onSubmit: (values) => {
      handleProjectCreation();
    },
  });

  const handleNumberInputChange = (e: any, fieldName: string) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    formik.setFieldValue(fieldName, inputValue);
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevOpenIndex) => (prevOpenIndex === index ? -1 : index));
  };
  const HandleFAQPenality = () => {
    setFAQPenality((prevValue) => !prevValue);
  };

  const AddMileStone = () => {
    formik.setValues((prevValues: any) => ({
      ...prevValues,
      subMileStones: [
        ...prevValues.subMileStones,
        {
          title: "",
          description: "",
          requirements: "",
          endPoint: 0,
          endPointType: "",
          startDate: viewProjectData?.Milestones?.[openedIndex]?.endPointType == "DATETIME"
            ? moment(viewProjectData?.Milestones?.[openedIndex]?.startDate).format("yyyy-MM-DDTHH:MM")
            : moment(viewProjectData?.Milestones?.[openedIndex]?.startDate).format("yyyy-MM-DD") || "",
          endDate: viewProjectData?.Milestones?.[openedIndex]?.endPointType == "DATETIME"
            ? moment(viewProjectData?.Milestones?.[openedIndex]?.endDate).format("yyyy-MM-DDTHH:MM")
            : moment(viewProjectData?.Milestones?.[openedIndex]?.endDate).format("yyyy-MM-DD") || "",
          fundAllocation: "",
          revisions: "",
          revisionsCounter: 0,
          acceptanceCriteria: "",
          isPenaltyExcluded: true,
          milestoneStatus: "INIT",
          milestoneType: "submilestone",
          AssignedTo: "",
          penalityBreach: [
            {
              pentality: "",
              timeperiod: "",
              penalityType: "",
              valueIn: "",
              pentalityDuration: "",
            },
          ],
        },
      ],
    }));
  };
  const handleDiscardMilesStone = (index: any) => {
    let tempMilestone = formik.values.subMileStones;
    if (index >= 0 && index < tempMilestone.length) {
      tempMilestone.splice(index, 1);
    } else {
      console.error("Index out of bounds");
    }
    formik.setFieldValue("subMileStones", tempMilestone);
  };
  const handleDiscardAllMileStones = () => {
    formik.setFieldValue("subMileStones", []);
  };
  const handleAddBreachRule = (milestoneIndex: number) => {
    formik.setFieldValue(`subMileStones[${milestoneIndex}].penalityBreach`, [
      ...formik.values.subMileStones[milestoneIndex].penalityBreach,
      {
        penalityType: "",
        pentality: "",
        timeperiod: "",
      },
    ]);
  };
  const handleRemoveBreachRule = (milestoneIndex: number, penaltyIndex: number) => {
    const updatedPenalties = [
      ...formik.values.subMileStones[milestoneIndex].penalityBreach
    ];
    updatedPenalties.splice(penaltyIndex, 1);
    formik.setFieldValue(`subMileStones[${milestoneIndex}].penalityBreach`, updatedPenalties);
  };
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
    <ModalAtom
      Title={
        <div className="bg-primary-100 flex justify-between px-[20px] py-[15px] rounded-t-[5px] ">
          <Typography
            label={"Create Sub-MileStone"}
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
      open={open}
      description={
        <>
          {pops && (
            <IndivdualProviderList
              open={pops}
              close={closePop}
              IndividulaProvider={IndividulaProvider}
              formik={formik}
              assignIpIndex={assignIpIndex}
              handleSave={handleSave}
              viewProjectData={viewProjectData}
            />
          )}
          <div className="items-center justify-center">
            {viewProjectData?.Milestones[openedIndex] ? (
              viewProjectData?.Milestones[openedIndex] && (
                <>
                  <div className="mx-[30px] flex flex-col gap-5 shadow-navbar rounded-[5px] my-[10px] ">
                    <div className="px-5 pt-5 pb-[10px] border-b-[1px] border-text-gray-50 ">
                      <Typography
                        label={`Milestone ${openedIndex + 1}`}
                        type="p"
                        classname="font-bold  text-text-HeadLine-100 "
                        FontSize="base"
                      />
                    </div>
                    <div className="px-5 pb-5 pt-[10px] flex flex-col gap-y-[10px]">
                      <div>
                        <Typography
                          label={"Title"}
                          color="primary"
                          variant={200}
                          classname="font-bold "
                          FontSize="sm"
                          type="p"
                        />
                        <Typography
                          label={
                            viewProjectData?.Milestones[openedIndex]?.title ||
                            "-"
                          }
                          color="primary"
                          variant={300}
                          FontSize="sm"
                          type="p"
                        />
                      </div>
                      <div>
                        <Typography
                          label={"Description"}
                          color="primary"
                          variant={200}
                          classname="font-bold "
                          FontSize="sm"
                          type="p"
                        />
                        <Typography
                          label={
                            viewProjectData?.Milestones[openedIndex]
                              ?.description || "-"
                          }
                          color="primary"
                          variant={300}
                          FontSize="sm"
                          type="p"
                        />
                      </div>
                      <div>
                        <Typography
                          label={"Requirements"}
                          color="primary"
                          variant={200}
                          classname="font-bold "
                          FontSize="sm"
                          type="p"
                        />
                        <Typography
                          label={
                            viewProjectData?.Milestones[openedIndex]
                              ?.requirements || "-"
                          }
                          color="primary"
                          variant={200}
                          FontSize="sm"
                          type="p"
                        />
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <Typography
                            label={"End Point"}
                            color="primary"
                            variant={200}
                            classname="font-bold "
                            FontSize="sm"
                            type="p"
                          />
                          <Typography
                            label={
                              viewProjectData?.Milestones[openedIndex]
                                ?.endPointType || "-"
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
                              moment(
                                viewProjectData?.Milestones[openedIndex]
                                  ?.startDate
                              ).format("MMMM D, YYYY") || "-"
                            }
                            color="primary"
                            variant={300}
                            FontSize="sm"
                            type="p"
                          />
                        </div>
                        <div>
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
                              moment(
                                viewProjectData?.Milestones[openedIndex]
                                  ?.endDate
                              ).format("MMMM D, YYYY") || "-"
                            }
                            color="primary"
                            variant={300}
                            FontSize="sm"
                            type="p"
                          />
                        </div>
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
                            label={
                              viewProjectData?.Milestones[openedIndex]
                                ?.fundAllocation +
                              " " +
                              "$" || "-"
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
                              "0/" +
                              viewProjectData?.Milestones[openedIndex]
                                ?.revisions || "-"
                            }
                            color="primary"
                            variant={300}
                            FontSize="sm"
                            type="p"
                          />
                        </div>
                      </div>
                      <div>
                        <Typography
                          label={"Acceptance criteria"}
                          color="primary"
                          variant={200}
                          FontSize="sm"
                          classname="font-bold "
                          type="p"
                        />
                        <Typography
                          type="p"
                          label={
                            viewProjectData?.Milestones[openedIndex]
                              ?.acceptanceCriteria || "-"
                          }
                          color="primary"
                          variant={300}
                          FontSize="sm"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )
            ) : (
              <NoDataFound />
            )}
            {viewProjectData?.Milestones[openedIndex]?.Milestones ? (
              viewProjectData?.Milestones[openedIndex]?.Milestones &&
              viewProjectData?.Milestones[openedIndex]?.Milestones.map(
                (subElement: any, subIndex: number) => {
                  return (
                    <>
                      <div
                        className="mx-[30px] flex flex-col gap-5 shadow-navbar rounded-[5px] my-[10px] "
                        key={subIndex}
                      >
                        <div className="px-5 pt-5 pb-[10px] border-b-[1px] border-text-gray-50 ">
                          <Typography
                            label={`Sub-Milestone ${openedIndex + 1}.${subIndex + 1
                              }`}
                            type="p"
                            classname="font-bold  text-text-HeadLine-100 "
                            FontSize="base"
                          />
                        </div>
                        <div className="px-5 pb-5 pt-[10px] flex flex-col gap-y-[10px]">
                          <div>
                            <Typography
                              label={"Title"}
                              color="primary"
                              variant={200}
                              classname="font-bold "
                              FontSize="sm"
                              type="p"
                            />
                            <Typography
                              label={subElement?.title || "-"}
                              color="primary"
                              variant={300}
                              FontSize="sm"
                              type="p"
                            />
                          </div>
                          <div>
                            <Typography
                              label={"Description"}
                              color="primary"
                              variant={200}
                              classname="font-bold "
                              FontSize="sm"
                              type="p"
                            />
                            <Typography
                              label={subElement?.description || "-"}
                              color="primary"
                              variant={300}
                              FontSize="sm"
                              type="p"
                            />
                          </div>
                          <div>
                            <Typography
                              label={"Requirements"}
                              color="primary"
                              variant={200}
                              classname="font-bold "
                              FontSize="sm"
                              type="p"
                            />
                            <Typography
                              label={subElement?.requirements || "-"}
                              color="primary"
                              variant={200}
                              FontSize="sm"
                              type="p"
                            />
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <Typography
                                label={"End Point"}
                                color="primary"
                                variant={200}
                                classname="font-bold "
                                FontSize="sm"
                                type="p"
                              />
                              <Typography
                                label={subElement?.endPointType || "-"}
                                color="primary"
                                variant={300}
                                FontSize="sm"
                                type="p"
                              />
                            </div>
                            <div>
                              <Typography
                                label={"Start Date "}
                                color="primary"
                                variant={200}
                                classname="font-bold "
                                FontSize="sm"
                                type="p"
                              />
                              <Typography
                                label={
                                  moment(subElement?.startDate).format(
                                    "MMMM D, YYYY"
                                  ) || "-"
                                }
                                color="primary"
                                variant={300}
                                FontSize="sm"
                                type="p"
                              />
                            </div>
                            <div>
                              <Typography
                                label={"End Date"}
                                color="primary"
                                variant={200}
                                classname="font-bold "
                                FontSize="sm"
                                type="p"
                              />
                              <Typography
                                label={
                                  moment(subElement?.endDate).format(
                                    "MMMM D, YYYY"
                                  ) || "-"
                                }
                                color="primary"
                                variant={300}
                                FontSize="sm"
                                type="p"
                              />
                            </div>
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
                                label={
                                  subElement?.fundAllocation + " " + "$" || "-"
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
                                label={"0/" + subElement?.revisions || "-"}
                                color="primary"
                                variant={300}
                                FontSize="sm"
                                type="p"
                              />
                            </div>
                          </div>
                          <div>
                            <Typography
                              label={"Acceptance criteria"}
                              color="primary"
                              variant={200}
                              FontSize="sm"
                              classname="font-bold "
                              type="p"
                            />
                            <Typography
                              type="p"
                              label={subElement?.acceptanceCriteria || "-"}
                              color="primary"
                              variant={300}
                              FontSize="sm"
                            />
                          </div>
                          <div className="">
                            {subElement?.isPenaltyExcluded !== true && (
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
                                      subElement?.PenalityBreach?.[0]?.valueIn ==
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
                                        subElement?.PenalityBreach?.[0]
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
                                        subElement?.PenalityBreach?.[0]
                                          ?.pentalityDuration === "ByHour"
                                          ? "By Hour"
                                          : "By Day"
                                      }
                                      type="p"
                                      classname="font-bold text-text-danger-100 "
                                      FontSize="base"
                                    />
                                  </div>
                                  {subElement?.PenalityBreach &&
                                    subElement?.PenalityBreach.length > 0 &&
                                    subElement?.PenalityBreach.map(
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
                                                ? "$"
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
                            {subElement?.PenalityBreach &&
                              subElement?.PenalityBreach.length > 0 &&
                              subElement?.PenalityBreach.map(
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
                                            label={`${ele?.pentality} ${ele?.valueIn == "AMOUNT" ? "$" : "%"
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
                        </div>
                      </div>
                    </>
                  );
                }
              )
            ) : (
              <NoDataFound />
            )}
            <form onSubmit={formik.handleSubmit} className="px-[30px]">
              <>
                {formik.values.subMileStones &&
                  formik.values.subMileStones.map(
                    (element: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="pb-[10px] shadow-navbar rounded-[5px] mt-[10px]"
                        >
                          <div className="flex justify-between px-5 py-[5px] h-full  ">
                            <Typography
                              label={
                                "Sub-Milestone" +
                                " " +
                                `${openedIndex + 1}.${viewProjectData?.Milestones[openedIndex]
                                  ?.Milestones.length +
                                index +
                                1
                                }`
                              }
                              classname="text-text-HeadLine-100 font-bold "
                              type="p"
                            />
                            <div className="flex gap-5">

                              <Button
                                label={""}
                                size="small"
                                variant="line"
                                onClick={() => {
                                  toggleFAQ(index);
                                }}
                                icon={
                                  openIndex === index ? (
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
                              />
                            </div>
                          </div>
                          {openIndex === index && (
                            <>
                              <div className="flex gap-x-5 gap-y-[10px] flex-wrap  px-5 pt-[10px] pb-5  border-t-[1px] border-text-gray-50">
                                <div className="w-[48%]">
                                  <Typography
                                    label={"Title"}
                                    type="p"
                                    color="primary"
                                    variant={200}
                                    FontSize="sm"
                                    classname="font-bold "
                                  />
                                  <Textfield
                                    placeHolder="Enter here"
                                    name={`subMileStones[${index}].title`}
                                    value={element.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.touched.subMileStones?.[index]
                                    ?.title &&
                                    formik.errors.subMileStones?.[index]
                                      ?.title && (
                                      <HelperText
                                        position="right"
                                        label={
                                          formik.errors.subMileStones?.[index]
                                            .title
                                        }
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
                                <div className="w-[48%]">
                                  <Typography
                                    label={"No. of Revisions"}
                                    type="p"
                                    color="primary"
                                    variant={200}
                                    FontSize="sm"
                                    classname="font-bold "
                                  />
                                  <Textfield
                                    placeHolder="Enter here"
                                    name={`subMileStones[${index}].revisions`}
                                    value={element.revisions}
                                    onChange={(e: any) =>
                                      handleNumberInputChange(
                                        e, `subMileStones[${index}].revisions`)}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.touched.subMileStones?.[index]
                                    ?.revisions &&
                                    formik.errors.subMileStones?.[index]
                                      ?.revisions && (
                                      <HelperText
                                        position="right"
                                        label={
                                          formik.errors.subMileStones?.[index]
                                            .revisions
                                        }
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
                                <div className="w-[48%] relative">
                                  <CustomDropdown
                                    Title="End Point"
                                    placeHolder={element.endPointType}
                                    value={element.endPointType}
                                    onChange={(selected) => {
                                      formik.setFieldValue(
                                        `subMileStones[${index}].endPointType`,
                                        selected
                                      );
                                    }}
                                    options={[{ key: "DATE", value: 'Date' }, { key: "DATETIME", value: 'Date/Time' }]}
                                  />
                                  {formik.touched.subMileStones?.[index]
                                    ?.endPointType &&
                                    formik.errors.subMileStones?.[index]
                                      ?.endPointType && (
                                      <HelperText
                                        position="right"
                                        label={
                                          formik.errors.subMileStones?.[index]
                                            .endPointType
                                        }
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
                                <div className="w-[48%]">
                                  <div className=" flex gap-x-5 gap-y-[10px] ">
                                    <div className="w-[50%]">
                                      <Typography
                                        label={"Submilestone Start"}
                                        type="p"
                                        color="primary"
                                        variant={200}
                                        FontSize="sm"
                                        classname="font-bold "
                                      />
                                      <Textfield
                                        name={`subMileStones[${index}].startDate`}
                                        onChange={(e: any) => {
                                          formik.handleChange(e);
                                          const selectedDate = new Date(
                                            e.target.value
                                          );
                                          const endDateField = `subMileStones[${index}].endDate`;
                                          formik.setFieldValue(
                                            endDateField,
                                            ""
                                          );
                                          formik.setFieldTouched(
                                            endDateField,
                                            false
                                          );
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={element.startDate}
                                        placeholder="June 21, 2023"
                                        type={
                                          element.endPointType === "DATETIME"
                                            ? "datetime-local"
                                            : "date"
                                        }
                                        min={element.endPointType === "DATETIME" ?
                                          moment(viewProjectData?.Milestones?.[openedIndex]?.startDate).format("YYYY-MM-DD HH:mm:ss")
                                          : moment(viewProjectData?.Milestones?.[openedIndex]?.startDate).format("yyyy-MM-DD")
                                        }
                                      // min={getCurrentDate(
                                      //   element.endPointType
                                      // )}
                                      />

                                      {formik.touched.subMileStones?.[index]
                                        ?.startDate &&
                                        formik.errors.subMileStones?.[index]
                                          ?.startDate && (
                                          <HelperText
                                            position="right"
                                            label={
                                              formik.errors.subMileStones?.[
                                                index
                                              ].startDate
                                            }
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
                                    <div className="w-[50%]">
                                      <Typography
                                        label={"Submilestone End"}
                                        type="p"
                                        color="primary"
                                        variant={200}
                                        FontSize="sm"
                                        classname="font-bold "
                                      />
                                      <Textfield
                                        name={`subMileStones[${index}].endDate`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={element.endDate}
                                        placeholder="June 21, 2023"
                                        type={
                                          element.endPointType === "DATETIME"
                                            ? "datetime-local"
                                            : "date"
                                        }
                                        min={getCurrentDate(
                                          element.endPointType,
                                          new Date(element.startDate)
                                        )}
                                      />
                                      {formik.touched.subMileStones?.[index]
                                        ?.endDate &&
                                        formik.errors.subMileStones?.[index]
                                          ?.endDate && (
                                          <HelperText
                                            position="right"
                                            label={
                                              formik.errors.subMileStones?.[
                                                index
                                              ].endDate
                                            }
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
                                <div className="w-full">
                                  <Typography
                                    label={"Description"}
                                    type="p"
                                    color="primary"
                                    variant={200}
                                    FontSize="sm"
                                    classname="font-bold "
                                  />
                                  <Textfield
                                    name={`subMileStones[${index}].description`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={element.description}
                                    placeHolder="1. For completion of milestone freelancer must transfer all assets related to research."
                                    multiline={true}
                                  />
                                  {formik.touched.subMileStones?.[index]
                                    ?.description &&
                                    formik.errors.subMileStones?.[index]
                                      ?.description && (
                                      <HelperText
                                        position="right"
                                        label={
                                          formik.errors.subMileStones?.[index]
                                            .description
                                        }
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
                                <div className="w-full">
                                  <Typography
                                    label={"Requirements"}
                                    type="p"
                                    color="primary"
                                    variant={200}
                                    FontSize="sm"
                                    classname="font-bold "
                                  />
                                  <Textfield
                                    name={`subMileStones[${index}].requirements`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={element.requirements}
                                    placeHolder="1. For completion of milestone freelancer must transfer all assets related to research."
                                    multiline={true}
                                  />
                                  {formik.touched.subMileStones?.[index]
                                    ?.requirements &&
                                    formik.errors.subMileStones?.[index]
                                      ?.requirements && (
                                      <HelperText
                                        position="right"
                                        label={
                                          formik.errors.subMileStones?.[index]
                                            .requirements
                                        }
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
                                <div className="w-full">
                                  <Typography
                                    label={"Acceptance Criteria"}
                                    type="p"
                                    color="primary"
                                    variant={200}
                                    FontSize="sm"
                                    classname="font-bold "
                                  />
                                  <Textfield
                                    name={`subMileStones[${index}].acceptanceCriteria`}
                                    value={element.acceptanceCriteria}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    placeHolder="For completion of milestone freelancer must transfer all assets related to research."
                                  />
                                  {formik.touched.subMileStones?.[index]
                                    ?.acceptanceCriteria &&
                                    formik.errors.subMileStones?.[index]
                                      ?.acceptanceCriteria && (
                                      <HelperText
                                        position="right"
                                        label={
                                          formik.errors.subMileStones?.[index]
                                            .acceptanceCriteria
                                        }
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
                                <div className=" w-full flex gap-y-[10px] gap-x-5">
                                  <div className="w-[48%]">
                                    <Typography
                                      label={"Fund Allocation"}
                                      type="p"
                                      color="primary"
                                      variant={200}
                                      FontSize="sm"
                                      classname="font-bold "
                                    />
                                    <Textfield
                                      name={`subMileStones[${index}].fundAllocation`}
                                      value={element.fundAllocation}
                                      onChange={(e: any) =>
                                        handleNumberInputChange(
                                          e, `subMileStones[${index}].fundAllocation`)}
                                      onBlur={formik.handleBlur}
                                      placeHolder="50 $"
                                    />
                                    {formik.touched.subMileStones?.[index]
                                      ?.fundAllocation &&
                                      formik.errors.subMileStones?.[index]
                                        ?.fundAllocation && (
                                        <HelperText
                                          position="right"
                                          label={
                                            formik.errors.subMileStones?.[index]
                                              .fundAllocation
                                          }
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
                                    {formik.errors.mileStoneFunds && (
                                      <HelperText
                                        position="right"
                                        label={formik.errors.mileStoneFunds}
                                        className="text-xxs"
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
                                  </div>{" "}                                  
                                </div>
                              </div>
                              <div className="flex justify-between bg-primary-600 p-[10px] mx-5 mb-[10px] rounded-[5px] border-[1px] border-text-gray-50 ">
                                <Typography
                                  label={"Penalty"}
                                  FontSize="sm"
                                  type="p"
                                  classname="text-text-HeadLine-100 "
                                />
                                {/* <Button
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
                                /> */}
                              </div>
                              {FAQPenality ? (
                                <div className=" items-center px-5">
                                  <div className="flex mt-[8px] space-x-1 items-center py-5">
                                    <CheckBoxAtom
                                      label={""}
                                      checked={
                                        formik.values.subMileStones[index]
                                          .isPenaltyExcluded
                                      }
                                      Onchange={(e: any) => Exclude(e, index)}
                                      borderColor="text-primary-200"
                                    />
                                    <Typography
                                      label={
                                        "Exclude this milestone from Penalties"
                                      }
                                      color="primary"
                                      variant={300}
                                      type="p"
                                      FontSize="sm"
                                    />
                                  </div>
                                  {!formik.values.subMileStones[index]
                                    .isPenaltyExcluded && (
                                      <>
                                        <div className="flex justify-between gap-x-5">
                                          <div className="w-full flex items-start justify-between gap-x-2">
                                            <div className="relative w-full">
                                              <CustomDropdown
                                                Title="Penalty Value in"
                                                placeHolder={
                                                  formik.values.subMileStones?.[
                                                    index
                                                  ]?.valueIn
                                                }
                                                value={
                                                  formik.values.subMileStones?.[
                                                    index
                                                  ]?.valueIn ?? null
                                                }
                                                onChange={(selected) => {
                                                  formik.setFieldValue(
                                                    `subMileStones[${index}].valueIn`,
                                                    selected
                                                  );
                                                }}
                                                options={[{ key: "PERCENT", value: "Percent" }, { key: "AMOUNT", value: "Amount" }]}
                                                />

                                              {formik.errors.subMileStones?.[
                                                index
                                              ]?.valueIn && (
                                                  <HelperText
                                                    position="right"
                                                    label={
                                                      formik.errors.subMileStones?.[
                                                        index
                                                      ]?.valueIn
                                                    }
                                                    className="text-xxs"
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

                                            <div className="relative w-full">
                                              <CustomDropdown
                                                Title="Duration"
                                                placeHolder={
                                                  formik.values.subMileStones?.[
                                                    index
                                                  ]?.pentalityDuration
                                                }
                                                value={
                                                  formik.values.subMileStones?.[
                                                    index
                                                  ]?.pentalityDuration ?? null
                                                }
                                                onChange={(selected) => {
                                                  formik.setFieldValue(
                                                    `subMileStones[${index}].pentalityDuration`,
                                                    selected
                                                  );
                                                }}
                                              options={[{ key: "ByHour", value: 'By Hour' }, { key: "ByDay", value: 'By Day' }]}
                                              />

                                              {formik.errors.subMileStones?.[
                                                index
                                              ]?.pentalityDuration && (
                                                  <HelperText
                                                    position="right"
                                                    label={
                                                      formik.errors.subMileStones?.[
                                                        index
                                                      ]?.pentalityDuration
                                                    }
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

                                          <div className="border-[1px] border-text-gray-50 p-[10px] rounded-[5px]">
                                            <div className="flex justify-center">
                                              <Typography
                                                label={"Rule of Breaches"}
                                                type="p"
                                                classname="font-bold text-text-danger-100 "
                                                FontSize="base"
                                              />
                                            </div>
                                            <div className="flex mt-[5px]">
                                              <Typography
                                                label={
                                                  "Add values to breaches to see the Rules of Breaches"
                                                }
                                                type="p"
                                                color="primary"
                                                variant={300}
                                                FontSize="xs"
                                              />
                                            </div>
                                          </div>
                                        </div>{" "}
                                        {formik.values.subMileStones[index]
                                          ?.penalityBreach &&
                                          formik.values.subMileStones[index]
                                            ?.penalityBreach.length > 0 &&
                                          formik.values.subMileStones[
                                            index
                                          ]?.penalityBreach.map(
                                            (
                                              penalityBreachelement: any,
                                              penalityBreachindex: any
                                            ) => (
                                              <div
                                                key={penalityBreachindex}
                                                className="mt-[10px"
                                              >
                                                <div className="flex justify-between items-center py-1 mt-[20px] border-b-[1px] border-text-gray-50">
                                                  <Typography
                                                    label={`${penalityBreachindex + 1
                                                      }st Breach`}
                                                    type="p"
                                                    FontSize="sm"
                                                    classname="font-bold text-text-HeadLine-100"
                                                  />
                                                  <div onClick={() => handleRemoveBreachRule(index, penalityBreachindex)}>
                                                    <TrashIcon className="h-6 w-6 cursor-pointer text-text-danger-50" />
                                                  </div>
                                                </div>
                                                <div className="relative w-full mt-[10px]">
                                                  <CustomDropdown
                                                    Title="Select"
                                                    placeHolder={
                                                      formik.values
                                                        .subMileStones?.[index]
                                                        ?.penalityBreach?.[
                                                        penalityBreachindex
                                                      ]?.penalityType
                                                    }
                                                    value={
                                                      formik.values
                                                        .subMileStones?.[index]
                                                        ?.penalityBreach?.[
                                                        penalityBreachindex
                                                      ]?.penalityType
                                                    }
                                                    onChange={(selected) => {
                                                      formik.setFieldValue(
                                                        `subMileStones[${index}].penalityBreach[${penalityBreachindex}].penalityType`,
                                                        selected
                                                      );
                                                    }}
                                                    options={[{ key: "WARNING", value: 'Warning' }, { key: "PENALTY", value: 'Penalty' }]}
                                                  />
                                                  {formik.touched.subMileStones?.[
                                                    index
                                                  ]?.penalityBreach?.[
                                                    penalityBreachindex
                                                  ]?.penalityType &&
                                                    formik.errors.subMileStones?.[
                                                      index
                                                    ]?.penalityBreach?.[
                                                      penalityBreachindex
                                                    ]?.penalityType && (
                                                      <HelperText
                                                        position="right"
                                                        label={
                                                          formik.errors
                                                            .subMileStones?.[
                                                            index
                                                          ]?.penalityBreach?.[
                                                            penalityBreachindex
                                                          ]?.penalityType
                                                        }
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
                                                <div className="mt-[10px] flex items-start gap-x-2 ">
                                                  <div className="w-full">
                                                    <Typography
                                                      label="Penalty"
                                                      FontSize="sm"
                                                      color="primary"
                                                      variant={200}
                                                      classname="font-bold "
                                                      type="h3"
                                                    />
                                                    <Textfield
                                                      name={`subMileStones[${index}].penalityBreach[${penalityBreachindex}].pentality`}
                                                      onChange={(e: any) =>
                                                        handleNumberInputChange(
                                                          e, `subMileStones[${index}].penalityBreach[${penalityBreachindex}].pentality`)}
                                                      onBlur={formik.handleBlur}
                                                      value={
                                                        formik.values
                                                          .subMileStones?.[index]
                                                          ?.penalityBreach?.[
                                                          penalityBreachindex
                                                        ].pentality
                                                      }
                                                      placeHolder="0"
                                                      disable={
                                                        formik.values
                                                          .subMileStones?.[index]
                                                          ?.penalityBreach?.[
                                                          penalityBreachindex
                                                        ]?.penalityType ===
                                                          "WARNING"
                                                          ? true
                                                          : false
                                                      }
                                                    />
                                                    {formik.touched
                                                      .subMileStones?.[index]
                                                      ?.penalityBreach?.[
                                                      penalityBreachindex
                                                    ]?.pentality &&
                                                      formik.errors
                                                        .subMileStones?.[index]
                                                        ?.penalityBreach?.[
                                                        penalityBreachindex
                                                      ]?.pentality && (
                                                        <HelperText
                                                          position="right"
                                                          label={
                                                            formik.errors
                                                              .subMileStones?.[
                                                              index
                                                            ]?.penalityBreach?.[
                                                              penalityBreachindex
                                                            ].pentality
                                                          }
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
                                                  <div className="relative w-full">
                                                    <Typography
                                                      label="Time Period"
                                                      FontSize="sm"
                                                      color="primary"
                                                      variant={200}
                                                      classname="font-bold "
                                                      type="h3"
                                                    />
                                                    <Textfield
                                                      name={`subMileStones[${index}].penalityBreach[${penalityBreachindex}].timeperiod`}
                                                      onChange={(e: any) =>
                                                        handleNumberInputChange(
                                                          e, `subMileStones[${index}].penalityBreach[${penalityBreachindex}].timeperiod`)}
                                                      onBlur={formik.handleBlur}
                                                      value={
                                                        formik.values
                                                          .subMileStones?.[index]
                                                          ?.penalityBreach?.[
                                                          penalityBreachindex
                                                        ].timeperiod
                                                      }
                                                      placeHolder="0"
                                                    />

                                                    {formik.touched
                                                      .subMileStones?.[index]
                                                      ?.penalityBreach?.[
                                                      penalityBreachindex
                                                    ]?.timeperiod &&
                                                      formik.errors
                                                        .subMileStones?.[index]
                                                        ?.penalityBreach?.[
                                                        penalityBreachindex
                                                      ]?.timeperiod && (
                                                        <HelperText
                                                          position="right"
                                                          label={
                                                            formik.errors
                                                              .subMileStones?.[
                                                              index
                                                            ]?.penalityBreach?.[
                                                              penalityBreachindex
                                                            ]?.timeperiod
                                                          }
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
                                            )
                                          )}
                                        <div className="flex justify-center gap-5 mt-[20px] pb-10">
                                          <div className="w-[163px]">
                                            <Button
                                              type="button"
                                              onClick={() => {
                                                handleAddBreachRule(index);
                                              }}
                                              label="Add Breach Rule"
                                              variant="standard"
                                              color="primary"
                                              size="small"
                                            />
                                          </div>
                                        </div>
                                      </>
                                    )}
                                </div>
                              ) : (
                                ""
                              )}

                              <div className="mt-[20px] flex justify-between items-center space-x-2  mx-5  ">
                                <div className="flex gap-x-4 items-center">
                                  {formik.values.subMileStones?.[index]
                                    ?.AssignedTo?.id && (
                                      <img
                                        src={formik.values.subMileStones?.[index]
                                          ?.AssignedTo?.profileLink}
                                        alt="Ip"
                                        className="rounded-full w-[50px] h-[50px]"
                                      />
                                    )}
                                  <div>
                                    <div className="w-[113px]">
                                      <Button
                                        label="Assign IP"
                                        size="small"
                                        variant="Transparent"
                                        color="secondary"
                                        icon={<img src="/Assets/AssignIp.svg" />}
                                        onClick={() => OpenPopup(index)}
                                      />
                                    </div>
                                    {formik.errors.subMileStones?.[index]
                                      ?.AssignedTo?.id && (
                                        <HelperText
                                          position="left"
                                          label={
                                            formik.errors.subMileStones?.[index]
                                              .AssignedTo?.id
                                          }
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
                                <div className=" flex gap-5 ">
                                  <div className="w-[191px]">
                                    <Button
                                      label="Discard milestone"
                                      size="small"
                                      variant="Transparent"
                                      color="secondary"
                                      onClick={() => {
                                        handleDiscardMilesStone(index);
                                      }}
                                    />
                                  </div>

                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    }
                  )}

              </>
              <div className="flex justify-center pt-[15px]">
                <div className="w-[250px]">
                  <Button
                    label="Add Sub-Milestones"
                    size="small"
                    onClick={AddMileStone}
                  />
                </div>
              </div>
              <div className="flex justify-between py-[15px]">
                <div className="w-[100px]">
                  <Button
                    label="Discard"
                    size="small"
                    variant="Transparent"
                    color="secondary"
                    onClick={() => handleDiscardAllMileStones()}
                  />
                </div>
                <div className="w-[100px]">
                  <Button label="Save" size="small" type="submit" disable={IsLoading}/>
                </div>
              </div>
            </form>
          </div>
        </>
      }
    />
  );
};

export default SubMileStoneDetails;
