import { useFormik } from "formik";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { Settings } from "../../../Assets/SVG/Settings";
import { Button } from "../../../Components/Atoms";
import { Loader } from "../../../Components/Atoms/Loader";
import { Structure } from "../../../Components/Molecules";
import CustomDropdown from "../../../Components/Molecules/Structure/CustomDropdown";
import { ShowActiveFlow } from "../../../Constants/MenuList";
import { messages } from "../../../Constants/messages";
import { AuthState } from "../../../Context/auth";
import { HashConnectAPIContext } from "../../../Providers/HasConnectAPIProvider";
import { convertDurationToDays, handleCustomError, showToast } from "../../../Utils/helper";
import {
  GET_PROJECT_DETAIL,
  IP_PERMISSONS,
  PROJECT_ACCEPT,
  PROJECT_DETAILS,
} from "../../../sevices";
import CreateNftPopup from "../Popups/CreateNftPopup";
import SucessProjectAcceptedPOPUP from "../Popups/SucessProjectAcceptedPOPUP";
import SaveDraftProjectModal from "./../Popups/SaveDraftProjectModal";
import Documents from "./Documents";
import MileStoneModify from "./MileStoneModify";
import ProjectDetails from "./ProjectDetails";
import ProviderModify from "./ProviderModify";
import { DocumentViewDetails } from "./View/DocumentViewDetails";
import EscrowDetails from "./View/EscrowDetails";
import FundDetails from "./View/FundDetails";
import MileStoneDetails from "./View/MileStoneDetails";
import { ProjectViewDetails } from "./View/ProjectViewDetails";
import PurchaserDetails from "./View/PurchaserDetails";
import RestrictPermisson from "./View/RestrictPermisson";


const ViewOrModifyProject = () => {
  const { user, connectWith, setConnectWith } = AuthState();
  const { id } = useParams();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [activeBtn, setactiveBtn] = useState<string>("Project Details");
  const [draftModal, setdraftModal] = useState(false);
  const [reinitialize, setReinitialize] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [createNftPopup, setCreateNftPopup] = useState(false);
  const [SettingsView, setSettingsView] = useState(false);
  const [tabList, setTabList] = useState([
    "Project Details",
    "Documents",
    "Provider",
    "Milestones",
    "Escrow",
    "Funds",
  ]);
  const possibletabList = [
    "Project Details",
    "Documents",
    "Provider",
    "Milestones",
    "Escrow",
    "Funds",
  ];
  const [project_Details, setProject_Details] = useState<any>();
  const [showPopupSubMilestines, setShowPopupSubMilestones] = useState(false);
  const { getProvider, getSigner, state, pairingData } = useContext(
    HashConnectAPIContext
  );
  const handleCloseAcceptModal = () => {
    setShowPopupSubMilestones(false);
  };

  const hanldeOpenCreateNftPopup = () => {
    setCreateNftPopup(true);
  };
  const hanldeCloseCreateNftPopup = () => {
    setCreateNftPopup(false);
  };

  async function handleGetUnAssignProjectDetails(id: any) {
    try {
      setIsLoading(true);
      let res = await GET_PROJECT_DETAIL(id);
      setProject_Details(res?.data);
      if (user?.role === "PURCHASER" && res?.data?.state === "NEW_PROJECT") {
        setTabList(["Project Details", "Documents", "Provider"]);
      } else if (
        res?.data?.state !== "ADD_ESCROW" &&
        res?.data?.state !== "CONTRACT_DEPLOYED" &&
        res?.data?.state !== "COMPLETE"
      ) {
        setTabList(["Project Details", "Documents", "Provider", "Milestones"]);
      } else {
        res?.data?.Funds
          ? setTabList(possibletabList)
          : setTabList([
            "Project Details",
            "Documents",
            "Provider",
            "Milestones",
            "Escrow",
          ]);
        user?.role === "PURCHASER" && res?.data?.Escrow
          && res?.data?.Escrow?.transferOwnershipStatus !== "SUCCESS"
          && showToast("Please Create Escrow", 'info')
      }
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleProjectAccept(id: any) {
    try {
      setIsLoading(true);
      let res = await PROJECT_ACCEPT({ projectId: id });
      console.log(res, "accepted");
      setShowPopupSubMilestones(true);
      handleGetUnAssignProjectDetails(project_Details?.id);
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      handleGetUnAssignProjectDetails(id);
    }
  }, [id]);

  const refetch = () => {
    try {
      handleGetUnAssignProjectDetails(id);
    } catch (error) {
      console.log(error);
    }
  };
  const silentRefetch = async () => {
    try {
      let res = await GET_PROJECT_DETAIL(id);
      setProject_Details(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  function handleClick(btnName: string) {
    setactiveBtn(btnName);
  }
  const handleModal = () => {
    setdraftModal(true);
  };
  const handleCloseModal = () => {
    setdraftModal(false);
  };
  const handleNext = () => {
    setReinitialize(false);
    const currentIndex = tabList.findIndex((value) => value === activeBtn);
    setactiveBtn(tabList[currentIndex + 1]);
  };
  const handleBack = () => {
    const currentIndex = tabList.findIndex((value) => value === activeBtn);
    setactiveBtn(tabList[currentIndex - 1]);
  };

  const handleCurrentMode = () => {
    if (editMode) {
      setEditMode(false);
    } else {
      setEditMode(true);
      setactiveBtn(tabList[0]);
      setTabList(["Project Details", "Documents", "Provider", "Milestones"]);
    }
  };

  const toggleSelection = (option: any) => {
    if (tabList.includes(option)) {
      setTabList((prevSelected) =>
        prevSelected.filter((item) => item !== option)
      );
    } else {
      setTabList((prevSelected) => [...prevSelected, option]);
    }
  };

  let initialValues = {
    role: user?.role || "",
    //Step1
    title: project_Details?.ProjectDetails?.title || "",
    description: project_Details?.ProjectDetails?.description || "",
    category: project_Details?.ProjectDetails?.category || "",
    duration: project_Details?.ProjectDetails?.duration || "",
    currency: project_Details?.ProjectDetails?.currency || "",
    totalProjectFund: project_Details?.ProjectDetails?.totalProjectFund || "",
    postKpiRoyalty: project_Details?.ProjectDetails?.postKpiRoyalty || 0,
    durationType: project_Details?.ProjectDetails?.durationType || "",
    scope: project_Details?.ProjectDetails?.scope || "",
    deliverables: project_Details?.ProjectDetails?.deliverables || "",
    // fundReleaseType: project_Details?.assignedFundTo || "",
    assignedFundTo: project_Details?.assignedFundTo || "",
    fundTransferType: project_Details?.fundTransferType || "",
    //Step2
    requirementDetailupload: getResearchUrls("RESEARCH") || [],
    tcDetailUpload: getResearchUrls("TermAndCondition") || [],
    requirements: project_Details?.Documents?.requirements || "",
    termsAndConditions: project_Details?.Documents?.termsAndConditions || "",
    remark: project_Details?.Documents?.remark || "",
    //Step3
    individualProvider: getIpsList() || [],
    isIndividualProvidersVisible:
      project_Details?.isIndividualProvidersVisible || false,
    //Step4
    mileStones: getMilestoneList() || [],
    mileStoneFunds: 0,
  };
  function getResearchUrls(type: string) {
    let researchUrls: any = [];
    if (
      project_Details &&
      project_Details.Documents &&
      project_Details.Documents.documentLinks
    ) {
      project_Details.Documents.documentLinks.forEach((link: any) => {
        if (link.type === type && link.url && link.url.length > 0) {
          if (typeof link.url == "string") {
            researchUrls = [...researchUrls, link.url];
          } else {
            researchUrls = [...researchUrls, ...link.url];
          }
        }
      });
    }

    return researchUrls;
  }

  function getIpsList() {
    let data: any = [];
    project_Details?.ProjectMembers?.IP &&
      project_Details?.ProjectMembers?.IP.length > 0 &&
      project_Details?.ProjectMembers?.IP.forEach((element: any) => {
        data.push({
          userId: element?.userId,
          name: element?.User?.name,
          position: element?.User?.Experiences?.[0]?.position,
          profilePictureLink: element?.User?.About?.profilePictureLink,
        });
      });
    return data;
  }
  function getMilestoneList() {
    let data: any = [];
    project_Details?.Milestones &&
      project_Details?.Milestones.length > 0 &&
      project_Details?.Milestones.forEach((element: any) => {
        if (element?.id !== "") {
          data.push({
            ...element,
            endPoint: element?.endPoint || 0,
            pentalityDuration:
              element?.PenalityBreach?.[0]?.pentalityDuration || "",
            valueIn: element?.PenalityBreach?.[0]?.valueIn || "",
            startDate:
              element?.endPointType == "DATETIME"
                ? moment(element?.startDate).format("yyyy-MM-DDTHH:MM")
                : moment(element?.startDate).format("yyyy-MM-DD") || "",
            endDate:
              element?.endPointType == "DATETIME"
                ? moment(element?.endDate).format("yyyy-MM-DDTHH:MM")
                : moment(element?.endDate).format("yyyy-MM-DD") || "",
            penalityBreach:
              (element?.PenalityBreach &&
                element?.PenalityBreach.length > 0 &&
                element.PenalityBreach.map((breachRule: any) => ({
                  ...breachRule,
                  timeperiod:
                    breachRule?.pentalityDuration === "ByHour"
                      ? Number(breachRule?.timeperiod) / 3600
                      : Number(breachRule?.timeperiod) / (3600 * 24),
                }))) ||
              [],
          });
        } else {
          data.push({
            title: element.title,
            description: element.description,
            requirements: element.requirements,
          });
        }
      });
    return data;
  }
  const handleProjectCreation = async (projectStatus: string) => {
    try {
      let values: any = formik.values;
      const arrayOfIPs = values.individualProvider.map(
        (obj: any) => obj.userId
      );
      const modifiedMileStones: any = [];
      values?.mileStones.forEach((milestone: any) => {
        let tempBreaches: any = [];
        milestone?.penalityBreach &&
          milestone?.penalityBreach.forEach((breaches: any) => {
            tempBreaches.push({
              ...breaches,
              valueIn: milestone?.valueIn,
              pentalityDuration: milestone?.pentalityDuration,
              pentality: Number(breaches?.pentality),
              timeperiod:
                milestone?.pentalityDuration === "ByHour"
                  ? Number(breaches?.timeperiod) * 3600 * 1
                  : Number(breaches?.timeperiod) * 3600 * 24,
            });
          });
        modifiedMileStones.push({
          ...milestone,
          penalityBreach: tempBreaches,
          fundAllocation: Number(milestone?.fundAllocation),
          revisions: Number(milestone?.revisions),
          royaltyAmount: Number(milestone?.royaltyAmount),
          startDate: Date.parse(milestone?.startDate) / 1000,
          endDate: Date.parse(milestone?.endDate) / 1000,
          pentality: Number(milestone?.pentality),
          royaltyValueIn: "PERCENT",
        });
      });

      setIsLoading(true);
      let body: any = {
        projectId: project_Details?.id ? project_Details.id : undefined,
        type: projectStatus,
        assignedFundTo: values.assignedFundTo,
        fundTransferType: values.fundTransferType,
        projectDetails: {
          title: values.title,
          description: values.description,
          category: values.category,
          duration: Number(values.duration),
          durationType: values.durationType,
          currency: values.currency,
          totalProjectFund: values.totalProjectFund,
          postKpiRoyalty: Number(values.postKpiRoyalty),
          scope: values.scope,
          deliverables: values.deliverables,
          deliverablesByCP: "",

        },
        documents: {
          requirements: values.requirements,
          termsAndConditions: values.termsAndConditions,
          remark: values.remark,
          documentLinks: [
            {
              url: [...values.requirementDetailupload],
              type: "RESEARCH",
            },
            {
              url: [...values.tcDetailUpload],
              type: "TermAndCondition",
            },
          ],
        },
        milestones: modifiedMileStones,

      };
      if (project_Details?.projectRole === "CP") {
        // body["individualProvider"] = arrayOfIPs;
      }

      let data = await PROJECT_DETAILS(body);
      await handleGetUnAssignProjectDetails(project_Details?.id);
      showToast(
        projectStatus === "COMPLETE"
          ? "Project Updated Sucessfully"
          : "Draft Updated Successfully",
        "success"
      );
      setEditMode(false);
      // setTabList(possibletabList)
    } catch (error) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNumberInputChange = (e: any, fieldName: string) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    formik.setFieldValue(fieldName, inputValue);
  };

  const getValidationSchema = () => {
    switch (activeBtn) {
      case "Project Details":
        return Yup.object({
          title: Yup.string()
            .required(messages.ENTER_PROJECT_TITLE)
            .min(5, messages.ENTER_MIN_TEXT_CHAR),
          category: Yup.string().required(messages.ENTER_PROJECT_CATEGORY),
          currency: Yup.string().required(messages.ENTER_PROJECT_CURRENCY),
          durationType: Yup.string().required(
            messages.ENTER_PROJECT_DURATIONTYPE
          ),
          duration: Yup.number()
            .min(0, messages.ENTER_VALID_NUMBER)
            .required(messages.ENTER_PROJECT_DURATION)
            .moreThan(0, "Please enter more than 0"),
          totalProjectFund: Yup.number()
            .min(0, messages.ENTER_VALID_NUMBER)
            .required(messages.ENTER_PROJECT_TOTAL_PROJECT_FUND)
            .moreThan(0, "Please enter more than 0"),
          postKpiRoyalty: Yup.number()
            .min(0, messages.ENTER_VALID_NUMBER)
            .required('Project Royalty is required')
            .max(100, 'Max 100 is Possible'),
          scope: Yup.string()
            .required(messages.ENTER_PROJECT_SCOPE)
            .min(5, messages.ENTER_MIN_TEXT_CHAR),
          deliverables: Yup.string()
            .required(messages.ENTER_PROJECT_DELIVERABLES)
            .min(5, messages.ENTER_MIN_TEXT_CHAR),

          assignedFundTo: Yup.string().required(
            messages.ENTER_FUND_RELEASE_TYPE
          ),
          fundTransferType: Yup.string().required(
            messages.ENTER_FUND_TRANSFER_TYPE
          ),
        });
      case "Documents":
        return Yup.object({
          requirements: Yup.string()
            .required(messages.ENTER_PROJECT_DOCUMENT_REQUIREMENTS)
            .min(5, messages.ENTER_MIN_TEXT_CHAR),
          termsAndConditions: Yup.string()
            .required(messages.ENTER_PROJECT_DOCUMENT_TCDETAILS)
            .min(5, messages.ENTER_MIN_TEXT_CHAR),

          remark: Yup.string()
            .min(5, messages.ENTER_MIN_TEXT_CHAR),
        });
      case "Provider":
        return Yup.object({
          //   individualProvider: Yup.array().required(messages.ADD_PROVIDER),
        });
      case "Milestones":
        return Yup.object().shape({
          mileStones: Yup.array().of(
            Yup.object().shape({
              id: Yup.string(),
              title: Yup.string()
                .required("Title is required")
                .min(5, messages.ENTER_MIN_CHAR),
              description: Yup.string()
                .required("Description is required")
                .min(5, messages.ENTER_MIN_CHAR),
              requirements: Yup.string()
                .required("Requirements are required")
                .min(5, messages.ENTER_MIN_CHAR),
              endPointType: Yup.string().when(["id"], {
                is: (val: string) => val && val !== "",
                then: () => Yup.string().required("End Point is required"),
                otherwise: () => Yup.string(),
              }),
              startDate: Yup.string().when(["id"], {
                is: (val: string) => val && val !== "",
                then: () => Yup.string().required("date is required"),
                otherwise: () => Yup.string(),
              }),
              endDate: Yup.string().when("id", {
                is: (val: string) => val && val !== "",
                then: () => Yup.string().required("Date is required"),
                otherwise: () => Yup.string(),
              }),
              fundAllocation: Yup.number().when(["id"], {
                is: (val: string) => val && val !== "",
                then: () =>
                  Yup.number()
                    .required("Fund Allocation is required")
                    .typeError("Please enter number value only")
                    .moreThan(0, "Please enter more than 0"),
                otherwise: () => Yup.string(),
              }),

              revisions: Yup.number().when(["id"], {
                is: (val: string) => val && val !== "",
                then: () =>
                  Yup.number()
                    .required("No. of revisions is required")
                    .typeError("Please enter number value only")
                    .moreThan(-1, "Please enter valid revision"),
                otherwise: () => Yup.string(),
              }),

              acceptanceCriteria: Yup.string().when(["id"], {
                is: (val: string) => val && val !== "",
                then: () =>
                  Yup.string()
                    .required("Acceptance Criteria is required")
                    .min(5, messages.ENTER_MIN_CHAR),
                otherwise: () => Yup.string(),
              }),
              isPenaltyExcluded: Yup.boolean().when(["id"], {
                is: (val: string) => val && val !== "",
                then: () =>
                  Yup.boolean().required("Exclude Penalties is required"),
                otherwise: () => Yup.string(),
              }),

              valueIn: Yup.string().when(["id", "isPenaltyExcluded"], {
                is: (val: string, isPenaltyExcluded: boolean) =>
                  !isPenaltyExcluded && val && val !== "",
                then: () => Yup.string().required("Penalty Value is required"),
                otherwise: () => Yup.string(),
              }),
              pentalityDuration: Yup.string().when(
                ["id", "isPenaltyExcluded"],
                {
                  is: (val: string, isPenaltyExcluded: boolean) =>
                    !isPenaltyExcluded && val && val !== "",
                  then: () => Yup.string().required("duration is required"),
                  otherwise: () => Yup.string(),
                }
              ),

              penalityBreach: Yup.array().when(["id", "isPenaltyExcluded"], {
                is: (val: string, isPenaltyExcluded: boolean) =>
                  !isPenaltyExcluded && val && val !== "",
                then: () =>
                  Yup.array()
                    .min(1)
                    .of(
                      Yup.object().shape({
                        penalityType: Yup.string().required(
                          "duration is required"
                        ),
                        pentality: Yup.string().when(["penalityType"], {
                          is: (penalityType: string) =>
                            penalityType == "PENALTY",
                          then: () =>
                            Yup.number()
                              .required("penality is required")
                              .typeError("Please enter number value only")
                              .moreThan(0, "Please enter more than 0"),
                          otherwise: () => Yup.string(),
                        }),
                        timeperiod: Yup.number()
                          .required("Time Period is required")
                          .moreThan(0, "Please enter more than 0"),
                      })
                    ),
                otherwise: () => Yup.array(),
              }),

              royaltyType: Yup.string().when(["id"], {
                is: (val: string) => val && val !== "",
                then: () => Yup.string().required("Success Bonus Type is required"),
                otherwise: () => Yup.string(),
              }),

              royaltyAmount: Yup.number().when(["id"], {
                is: (val: string) => val && val !== "",
                then: () =>
                  Yup.number()
                    .required("Success Bonus is required")
                    .typeError("Please enter number value only")
                    .moreThan(0, "Please enter more than 0")
                    .lessThan(100, "please enter upto 99 percent"),
                otherwise: () => Yup.string(),
              }),
              subMilestones: Yup.array().of(
                Yup.object().shape({
                  title: Yup.string().required("Title is required"),
                  description: Yup.string().required("Description is required"),
                  noOfRevision: Yup.string().required(
                    "No. of revisions is required"
                  ),
                  endPoint: Yup.string().required("End Point is required"),
                  startHour: Yup.string().required("Start date is required"),
                  endHour: Yup.string().required("End date is required"),
                  requirements: Yup.string().required(
                    "requirements is required"
                  ),
                  acceptanceCriteria: Yup.string().required(
                    "Acceptance Criteria is required"
                  ),
                  fundAllocation: Yup.string().required(
                    "Fund Allocation is required"
                  ),
                  fundTransferType: Yup.string().required(
                    "Fund Transfer Type is required"
                  ),
                  penalty: Yup.object().shape({
                    excludePenalties: Yup.string().required(
                      "Exclude Penalties is required"
                    ),
                    penaltyValue: Yup.string().required(
                      "Penalty Value is required"
                    ),
                    duration: Yup.string().required("duration is required"),
                    breachRules: Yup.object({
                      select: Yup.string().required("select is required"),
                      penality: Yup.string().required("penality is required"),
                      timePeriod: Yup.string().required(
                        "Time Period is required"
                      ),
                    }),
                  }),
                  royalty: Yup.object().shape({
                    royaltyType: Yup.string().required(
                      "Success Bonus Type is required"
                    ),
                    royalties: Yup.string().required("Success Bonus is required"),
                  }),
                })
              ),
            })
          ),
        });
      default:
        return Yup.object({});
    }
  };

  const validate = (values: any) => {
    if (activeBtn == "Milestones") {
      const { mileStones }: any = values;
      let days = convertDurationToDays(values?.duration, values?.durationType)
      const expectedTotal = Number(values?.totalProjectFund);
      const actualTotal = mileStones.reduce((sum: any, item: any) => {
        // Add the fundAllocation to sum
        sum += Number(item.fundAllocation);
        // Check if bonus is available and calculate sucess bonus amount
        if (item?.royaltyAmount && item?.royaltyAmount > 0) {
          const bonusAmount =
            (Number(item?.royaltyAmount) / 100) * Number(item.fundAllocation);
          sum += bonusAmount;
        }
        return sum;
      }, 0);
      let error: any = {};
      const { startDate: minStartDate, endDate: maxEndDate } = mileStones && mileStones.length > 0 && mileStones.reduce((acc: any, event: any) => {
        // Finding min startDate
        if (!acc.startDate || event.startDate < acc.startDate) {
          acc.startDate = event.startDate;
        }

        // Finding max endDate
        if (!acc.endDate || event.endDate > acc.endDate) {
          acc.endDate = event.endDate;
        }

        return acc;
      }, {});
      mileStones &&
        mileStones.length > 0 &&
        mileStones.forEach((milestone: any, milestoneIndex: any) => {
          if (minStartDate && milestone?.endDate) {
            let startDate = new Date(minStartDate);
            let endDate = new Date(milestone?.endDate);
            // Check if endDate exceeds projectDuration days from startDate
            let maxEndDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);
            if (endDate > maxEndDate) {
              if (!error.mileStones) {
                error.mileStones = [];
              }
              if (!error.mileStones[milestoneIndex]) {
                error.mileStones[milestoneIndex] = {};
              }
              error.mileStones[milestoneIndex].endDate = `End Date should not exceed ${values?.duration} ${values?.durationType} from Start Date.`;
            }
          }

          milestone?.penalityBreach &&
            milestone?.penalityBreach.length > 0 &&
            milestone?.penalityBreach.forEach(
              (element: any, breachIndex: any) => {
                if (
                  (milestone?.valueIn == "PERCENT" &&
                    Number(element.pentality) > 100) ||
                  (milestone?.valueIn == "AMOUNT" &&
                    Number(element?.pentality) >
                    Number(milestone?.fundAllocation))
                ) {
                  if (!error.mileStones) {
                    error.mileStones = [];
                  }

                  if (!error.mileStones[milestoneIndex]) {
                    error.mileStones[milestoneIndex] = { penalityBreach: [] };
                  }

                  if (!error.mileStones[milestoneIndex].penalityBreach) {
                    error.mileStones[milestoneIndex].penalityBreach = [];
                  }

                  if (
                    !error.mileStones[milestoneIndex].penalityBreach[
                    breachIndex
                    ]
                  ) {
                    error.mileStones[milestoneIndex].penalityBreach[
                      breachIndex
                    ] = {};
                  }

                  error.mileStones[milestoneIndex].penalityBreach[
                    breachIndex
                  ].pentality =
                    milestone?.valueIn == "PERCENT"
                      ? "Max 100 is Possible"
                      : "Exceeding Milestone fund";
                }
              }
            );
        });
      if (actualTotal > expectedTotal) {
        error.mileStoneFunds = "Exceeding total project fund";
        showToast('Total of Milestone funds exceeding total Project fund', 'warning')
      }
      return { ...error };
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: reinitialize,
    validationSchema: getValidationSchema(),
    validate: validate as any,
    onSubmit: (values) => {
      // handleProjectCreation("COMPLETE");
      if (activeBtn === "Milestones") {
        handleProjectCreation("COMPLETE");
      } else {
        handleNext();
      }
    },
  });

  const handleDiscard = () => {
    switch (activeBtn) {
      case "Project Details":
        formik.resetForm({
          values: {
            ...formik.values,
            title: initialValues.title,
            description: initialValues.description,
            category: initialValues.category,
            duration: initialValues.duration,
            currency: initialValues.currency,
            totalProjectFund: initialValues.totalProjectFund,
            durationType: initialValues.durationType,
            scope: initialValues.scope,
            deliverables: initialValues.deliverables,
            // fundReleaseType: initialValues.fundReleaseType,
            assignedFundTo: initialValues.assignedFundTo,
            fundTransferType: initialValues.fundTransferType,
          },
        });
        break;
      case "Documents":
        formik.resetForm({
          values: {
            ...formik.values,
            requirementDetailupload: initialValues.requirementDetailupload,
            tcDetailUpload: initialValues.tcDetailUpload,
            requirements: initialValues.requirements,
            termsAndConditions: initialValues.termsAndConditions,
            remark: initialValues.remark,
          },
        });
        break;
      case "Provider":
        formik.resetForm({
          values: {
            ...formik.values,
            individualProvider: initialValues.individualProvider,
          },
        });
        break;
      case "Milestones":
        formik.resetForm({
          values: {
            ...formik.values,
            mileStones: getMilestoneList() || [],
          },
        });
        break;
    }
  };

  const IpSettingsFormik: any = useFormik({
    initialValues: {
      Permissions: project_Details?.ipPermissions || [],
    },
    enableReinitialize: true,
    onSubmit: (values: any) => {
      savePermissons();
    },
  });

  const savePermissons = async () => {
    try {
      let body = {
        projectId: project_Details?.id ? project_Details.id : undefined,
        permissions: IpSettingsFormik.values.Permissions,
      };
      let data = await IP_PERMISSONS(body);
      await silentRefetch();
      showToast("Permissions Updated", "success");
    } catch (error) {
      handleCustomError(error);
    } finally {
      setSettingsView(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Structure
          Heading={formik.values.title}
          mainSection={
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <div className="flex justify-center gap-x-6">
                  {activeBtn === "Project Details" ? (
                    editMode ? (
                      <ProjectDetails
                        formik={formik}
                        handleNumberInputChange={handleNumberInputChange}
                        isLoading={isLoading}
                      />
                    ) : (
                      <ProjectViewDetails viewProjectData={project_Details} />
                    )
                  ) : activeBtn === "Documents" ? (
                    editMode ? (
                      <Documents
                        formik={formik}
                        handleBack={handleBack}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                      />
                    ) : (
                      <DocumentViewDetails viewProjectData={project_Details} />
                    )
                  ) : activeBtn === "Provider" ? (
                    // editMode ?
                    <ProviderModify
                      formik={formik}
                      handleBack={handleBack}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      project_Details={project_Details}
                      editMode={editMode}
                      viewProjectData={project_Details}
                      silentRefetch={silentRefetch}
                    />
                  ) :
                    activeBtn === "Milestones" ? (
                      editMode ? (
                        <MileStoneModify
                          handleBack={handleBack}
                          formik={formik}
                          isLoading={isLoading}
                          handleNumberInputChange={handleNumberInputChange}
                        />
                      ) : (
                        <MileStoneDetails
                          viewProjectData={project_Details}
                          formik={formik}
                          refetch={refetch}
                          handleNumberInputChange={handleNumberInputChange}
                        />
                      )
                    ) : activeBtn === "Escrow" ? (
                      <EscrowDetails
                        viewProjectData={project_Details}
                        handleGetUnAssignProjectDetails={
                          handleGetUnAssignProjectDetails
                        }
                      />
                    ) : (
                      <FundDetails
                        viewProjectData={project_Details}
                        refetch={refetch}
                      />
                    )}
                  {!SettingsView ? (
                    <>
                      {!editMode && (
                        <PurchaserDetails viewProjectData={project_Details} />
                      )}
                    </>
                  ) : (
                    <RestrictPermisson
                      viewProjectData={project_Details}
                      formik={IpSettingsFormik}
                      activeBtn={activeBtn}
                    />
                  )}
                </div>
              )}
            </>
          }
          TopButton={
            <>
              {editMode ? (
                <>
                  <div className="w-[160px]">
                    {activeBtn !== "Provider" && (
                      <Button
                        variant="Transparent"
                        color="secondary"
                        label="Discard"
                        className="border-[1px] tracking-wider py-2 text-lg !font-bold"
                        size="small"
                        onClick={handleDiscard}
                      />
                    )}
                  </div>
                  {/* <div className="w-[160px]">
                    <Button
                      variant="Transparent"
                      color="secondary"
                      label="Save and Exit"
                      className="border-[1px] tracking-wider py-2 text-lg !font-bold"
                      onClick={handleModal}
                      size="small"
                    />
                  </div> */}
                </>
              ) : (
                <>
                  {project_Details?.status === "COMPLETE" &&
                    project_Details?.projectRole === "PURCHASER" && (
                      <div className="w-[160px]">
                        <Button
                          color="primary"
                          label="Create NFT"
                          size="small"
                          onClick={() => {
                            if (state === "Connected") {
                              hanldeOpenCreateNftPopup();
                            } else {
                              showToast(
                                "Please first connect your Wallet",
                                "error"
                              );
                            }
                          }}
                          className="mb-2 px-2 tracking-wider py-2 text-lg !font-bold"
                        />
                      </div>
                    )}
                  {project_Details?.state !== "ADD_ESCROW" &&
                    project_Details?.state !== "CONTRACT_DEPLOYED" &&
                    project_Details?.state !== "COMPLETE" && (
                      <>
                        {user?.id === project_Details?.currentEditor ? (
                          <>
                            <div className="w-[160px]">
                              <Button
                                variant="standard"
                                color="primary"
                                label="Modify"
                                className="border-[1px] tracking-wider py-2 text-lg !font-bold"
                                onClick={() => handleCurrentMode()}
                                size="small"
                              />
                            </div>
                            {project_Details?.projectRole === "CP" &&
                              project_Details?.Milestones?.length > 0 &&
                              project_Details?.type == "COMPLETE" &&
                              user?.id === project_Details?.currentEditor && (
                                <div className="w-[160px]">
                                  <Button
                                    variant="standard"
                                    color="primary"
                                    label="Accept"
                                    className="border-[1px] tracking-wider py-2 text-lg !font-bold"
                                    onClick={() =>
                                      handleProjectAccept(project_Details?.id)
                                    }
                                    size="small"
                                  />
                                </div>
                              )}
                          </>
                        ) : (
                          <div className="flex items-center bg-yellow-300 font-bold text-text-primary-300 rounded py-1 px-2">
                            Counter party Editing
                          </div>
                        )}
                      </>
                    )}

                  {project_Details?.projectRole === "CP" &&
                    (SettingsView ? (
                      <>
                        <div className="w-[160px]">
                          <Button
                            variant="Transparent"
                            color="secondary"
                            label="Discard"
                            className="border-[1px] tracking-wider py-2 text-lg !font-bold"
                            size="small"
                            onClick={() => {
                              IpSettingsFormik.setFieldValue(
                                "Permissions",
                                project_Details?.ipPermissions
                              );
                              setSettingsView(false);
                            }}
                          />
                        </div>
                        <div className="w-[160px]">
                          <Button
                            variant="standard"
                            color="primary"
                            label="Save"
                            className="border-[1px] tracking-wider py-2 text-lg !font-bold"
                            onClick={() => IpSettingsFormik.handleSubmit()}
                            size="small"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {project_Details?.Escrow && project_Details?.Escrow?.transferOwnershipStatus === "SUCCESS" &&
                          <>
                            <Button
                              label=""
                              onClick={() => {
                                setSettingsView(!SettingsView);
                              }}
                              icon={<Settings />}
                              variant="line"
                            />
                            <CustomDropdown
                              placeHolder={ShowActiveFlow[connectWith] || "Select"}
                              value={null}
                              onChange={(selected) => {
                                setConnectWith(selected);
                              }}
                              options={[
                                "Connect with Individual Provider",
                                "Connect with Purchaser",
                              ]}
                              buttonClassName=" border broder-[1px] w-[200px] border-text-primart-300 rounded-[5px] text-text-primary-300 outline-none  text-sm flex justify-between items-center"
                              optionsClassName="absolute top-[120px] z-50 w-max bg-white rounded-[5px] shadow-navbar"
                            />
                          </>}
                      </>
                    ))}

                </>
              )}
            </>
          }
          optionText={
            <>
              {tabList.map((item) => (
                <Button
                  variant="line"
                  label={item}
                  key={item}
                  className={`pl-[6px] text-text-primary-300 font-bold text-sm leading-5 ${activeBtn == item
                    ? "border-b-4 border-text-secondary-50  text-text-secondary-50  "
                    : ""
                    }  `}
                  size="small"
                  disabled={editMode}
                  onClick={() => handleClick(item)}
                />
              ))}

            </>
          }
        />
      )}

      {draftModal && (
        <SaveDraftProjectModal
          close={handleCloseModal}
          open={draftModal}
          saveDraft={() => handleProjectCreation("DRAFT")}
          project_title={formik.values.title}
          project_Duration={formik.values.duration}
        />
      )}
      {showPopupSubMilestines && (
        <SucessProjectAcceptedPOPUP
          OpenInfoPOP={showPopupSubMilestines}
          POPInfoClose={handleCloseAcceptModal}
          // handlecreateEscrow={}
          prevpage={handleCloseAcceptModal}
          project_name={project_Details?.ProjectDetails?.title}
          provider_name={project_Details?.ProjectMembers?.CP?.User?.name}
          project_id={project_Details?.id}
          fund_allocation={project_Details?.ProjectDetails?.totalProjectFund}
        />
      )}

      {createNftPopup && (
        <CreateNftPopup
          open={createNftPopup}
          close={hanldeCloseCreateNftPopup}
          project_Details={project_Details}
          getProvider={getProvider}
          getSigner={getSigner}
          state={state}
          pairingData={pairingData}
        />
      )}
    </>
  );
};

export default ViewOrModifyProject;
