
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "../../../Components/Atoms";
import { Loader } from "../../../Components/Atoms/Loader";
import { Structure } from "../../../Components/Molecules";
import { messages } from "../../../Constants/messages";
import { handleCustomError, showToast } from "../../../Utils/helper";
import { GET_PROJECT_DETAIL, PROJECT_DETAILS } from "../../../sevices";
import Documents from "./Documents";
import SaveDraftProjectModal from "./Popups/SaveDraftProjectModal";
import ProjectDetails from "./ProjectDetails";
import ProviderDetails from "./ProviderDetails";

const CreateProject = () => {
  const navigation = useNavigate();
  const [activeBtn, setactiveBtn] = useState<string>("Project Details");
  const [draftModal, setdraftModal] = useState(false);
  const [reinitialize, setReinitialize] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const tabList = ["Project Details", "Documents", "Provider"];
  const [project_Details, setProject_Details] = useState<any>()
  const { state } = useLocation()
  const isInitialRender = useRef(true);

  async function handleGetUnAssignProjectDetails(id: any) {
    try {
      setIsLoading(true)
      let res = await GET_PROJECT_DETAIL(id)
      setProject_Details(res?.data)
    }
    catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (state?.type) {
      if (isInitialRender.current) {
        handleGetUnAssignProjectDetails(state?.id)
        isInitialRender.current = false;
      }
    }
  }, [state])

  const handleModal = () => {
    setdraftModal(true);
  };
  const handleCloseModal = () => {
    setdraftModal(false);
  };
  const handleNext = () => {
    setReinitialize(false)
    const currentIndex = tabList.findIndex((value) => value === activeBtn);
    setactiveBtn(tabList[currentIndex + 1]);
  };
  const handleBack = () => {
    const currentIndex = tabList.findIndex((value) => value === activeBtn);
    setactiveBtn(tabList[currentIndex - 1]);
  };

  let initialValues = {
    //Step1
    title: project_Details?.ProjectDetails?.title || "",
    description: project_Details?.ProjectDetails?.description || "",
    category: project_Details?.ProjectDetails?.category || "",
    duration: project_Details?.ProjectDetails?.duration || "",
    currency: project_Details?.ProjectDetails?.currency || "USDC",
    totalProjectFund: project_Details?.ProjectDetails?.totalProjectFund || "",
    durationType: project_Details?.ProjectDetails?.durationType || "",
    scope: project_Details?.ProjectDetails?.scope || "",
    deliverables: project_Details?.ProjectDetails?.deliverables || "",
    assignedFundTo: project_Details?.assignedFundTo || "",
    fundTransferType: project_Details?.fundTransferType || "",
    postKpiRoyalty: project_Details?.postKpiRoyalty || 0,
    //Step2
    requirementDetailupload: getResearchUrls("RESEARCH") || [],
    tcDetailUpload: getResearchUrls("TermAndCondition") || [],
    requirements: project_Details?.Documents?.requirements || "",
    termsAndConditions: project_Details?.Documents?.termsAndConditions || "",
    //Step3
    provider: {
      id: "",
      name: "",
    },
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
          researchUrls = [...link.url];
        }
      });
    }

    return researchUrls;
  }

  const handleProjectCreation = async (projectStatus: string) => {
    try {
      let values: any = formik.values;
      setIsLoading(true);
      let body = {
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
        provider: values.provider.id !== "" ? values.provider.id : undefined,
      };
      await PROJECT_DETAILS(body);
      showToast(
        projectStatus === "COMPLETE"
          ? "Project Created Sucessfully"
          : "Draft Created Successfully",
        "success"
      );
      navigation("/");
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
            .min(1, messages.ENTER_VALID_NUMBER)
            .required(messages.ENTER_PROJECT_DURATION)
            .moreThan(0, "Please enter more than 0"),
          totalProjectFund: Yup.number()
            .min(1, messages.ENTER_VALID_NUMBER)
            .required(messages.ENTER_PROJECT_TOTAL_PROJECT_FUND)
            .moreThan(0, "Please enter more than 0"),
         
          postKpiRoyalty: Yup.number()
            .min(0, messages.ENTER_VALID_NUMBER)
            .required('Project Royalty is required')
            .max(100,'Max 100 is Possible'),
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
          
        });
      case "Provider":
        return Yup.object({
          provider: Yup.object()
            .required(messages.ADD_PROVIDER)
            .shape({
              id: Yup.string().required(messages.ADD_PROVIDER),
              name: Yup.string().required(messages.ADD_PROVIDER),
            }),
        });
      default:
        return Yup.object({});
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: reinitialize,
    validationSchema: getValidationSchema(),
    onSubmit: (values) => {
      if (activeBtn === "Provider") {
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
          },
        });
        break;
      case "Provider":
        formik.resetForm({
          values: {
            ...formik.values,
            provider: {
              id: initialValues.provider.id,
              name: initialValues.provider.name,
            },
          },
        });
        break;
    }
  };

  return (
    <>
      <Structure
        Heading={`${activeBtn === "Project Details" ? "New Project" : formik.values.title
          }`}
        mainSection={
          <>
            {isLoading ? (
              <Loader />
            ) :
              activeBtn === "Project Details" ? (
                <ProjectDetails
                  formik={formik}
                  handleNumberInputChange={handleNumberInputChange}
                  isLoading={isLoading}
                />
              ) : activeBtn === "Documents" ? (
                <Documents
                  formik={formik}
                  handleBack={handleBack}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              ) : (
                <ProviderDetails
                  formik={formik}
                  handleBack={handleBack}
                  isLoading={isLoading}
                />
              )
            }
          </>
        }
        TopButton={
          <>
            <div className="w-[100px]">
              <Button
                variant="Transparent"
                color="secondary"
                label="Discard"
                className="border-[1px] font-medium  "
                size="small"
                onClick={handleDiscard}
              />
            </div>
            <div className="w-[133px]">
              <Button
                variant="Transparent"
                color="secondary"
                label="Save and Exit"
                className="border-[1px] font-medium "
                onClick={handleModal}
                size="small"
              />
            </div>
          </>
        }
        optionText={
          <>
            {tabList.map((item, index) => (
              <Button
                key={index}
                variant="line"
                label={item}
                className={`pl-[6px] text-text-primary-300 font-bold text-sm leading-5 ${activeBtn === item
                  ? "border-b-4 border-text-secondary-50  text-text-secondary-50  "
                  : ""
                  }  `}
                size="small"
              // onClick={() => handleClick(item)}
              />
            ))}
          </>
        }
      />

      {draftModal && (
        <SaveDraftProjectModal
          close={handleCloseModal}
          open={draftModal}
          saveDraft={() => handleProjectCreation("DRAFT")}
          project_title={formik.values.title}
          project_Duration={formik.values.duration}
        />
      )}
    </>
  );
};

export default CreateProject