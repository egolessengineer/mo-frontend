import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Button, Typography } from "../../Components/Atoms";
import { Loader } from "../../Components/Atoms/Loader";
import { Structure } from "../../Components/Molecules";
import { messages } from "../../Constants/messages";
import { AuthState } from "../../Context/auth";
import { handleCustomError, showToast } from "../../Utils/helper";
import { ADD_DISPUTE, UPDATE_DISPUTE } from "../../sevices";
import DisputeCard from "./DisputeCard";
import DisputeOverview from "./DisputeOverview";
import CloseDispute from "./DisputePopups/CloseDispute";
import FAQResolutionPopUp from "./DisputePopups/FAQResolutionPopUp";
import NewDisputeDrag from "./DisputePopups/NewDisputeDrag";
import RaiseDisputeNaturePopup from "./DisputePopups/RaiseDisputeNaturePopup";
import RaiseNewDispute from "./DisputePopups/RaiseNewDispute";
import ResolutionPopUp from "./DisputePopups/ResolutionPopUp";
import FAQDispute from "./FAQDispute";


const Index = () => {
  const { user } = AuthState();
  const [ActiveBtn, setActiveBtn] = useState("");
  const [ShowSide, setShowSideComponent] = useState(true);
  const [closeDispute, setcloseDispute] = useState(false);
  const [faqResolution, setFaqResolution] = useState(false);
  const [provideResolution, setprovideResolution] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isrefetchData, setIsrefetchData] = useState(false);
  const [showForms, setShowForms] = useState<Array<boolean>>(
    new Array(3).fill(false)
  );
  const [disputeCount, setDisputeCount] = useState<any>();
  const [projectName, setProjectName] = useState("");
  const [disputeId, setDisputeId] = useState();
  const [disputeDetails, setDisputeDetails] = useState<any>();
  const [Deatils, setDetails] = useState(false);
  const [favorOf, setFavorOf] = useState<any>();

  const initialValues = {
    projectId: "",
    natureOfDispute: "",
    raisedBy: "",
    raisedTo: "",
    discription: "",
    evidencefile: null,
    comment: "",
    evidenceDocLink: [],
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      projectId: Yup.string().required("select project"),
      natureOfDispute: Yup.string().required("nature Of Dispute is required"),
      raisedBy: Yup.string().required("member Dsipute is required"),
      discription: Yup.string()
        .required("description is required")
        .matches(/^[^ \t]/, "Please enter only character")
        .min(5, messages.ENTER_MIN_CHAR),
      evidencefile: Yup.mixed().required("evidence file is required"),
      comment: Yup.string()
        .required("comment is required")
        .matches(/^[^ \t]/, "Please enter only character")
        .min(5, messages.ENTER_MIN_CHAR),
    }),
    onSubmit: async (value, { resetForm }) => {
      await handleSubmit();
      resetForm();
    },
  });

  async function handleSubmit() {
    try {
      setIsLoading(true);

      let body = {
        projectId: formik.values.projectId,
        disputeNature: formik.values.natureOfDispute,
        raisedBy: formik.values.raisedBy,
        raisedTo: formik.values.raisedTo,
        disputeDescription: formik.values.discription,
        evidenceDocLink: formik.values.evidenceDocLink,
      };
      await ADD_DISPUTE(body);
      setShowForms((prev) => prev.fill(false));
      showToast("Dispute Raised Successfully", "success");
      setIsrefetchData(true);
    } catch (error) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleUpDateDisputeFomikValidation = () => {
    if (closeDispute && user?.role === "ADMIN") {
      return Yup.object({
        closeComment: Yup.string()
          .required("Comment is Required")
          .matches(/^[^ \t]/, "Please enter only character")
          .min(5, messages.ENTER_MIN_CHAR),
      });
    } else if (closeDispute) {
      return Yup.object({
        closeComment: Yup.string()
          .required("Comment is Required")
          .matches(/^[^ \t]/, "Please enter only character")
          .min(5, messages.ENTER_MIN_CHAR),
        closed: Yup.boolean().required("Please check the box"),
      });
    } else if (provideResolution) {
      return Yup.object({
        resolutionFavor: Yup.string().required("Favor is Required"),
        resolutionDescription: Yup.string().required("Description is Required"),
        resolutionEvidene: Yup.string().required("file is Required"),
      });
    }
  };

  const updateformik = useFormik({
    initialValues: {
      closeComment: "",
      closed: null,
      resolutionFavor: "",
      inFavourOfType: "",
      inFavourOfID: "",
      resolutionDescription: "",
      resolutionEvidene: "",
      resolutionComment: "",
      resolutionDocLink: [],
    },
    validationSchema: handleUpDateDisputeFomikValidation(),
    onSubmit: (values, { resetForm }) => {
      if (closeDispute) {
        handleCloseDispute();
      } else if (provideResolution) {
        handleProviderResolution();
      }
      resetForm();
    },
  });

  async function handleCloseDispute() {
    try {
      setIsLoading(true);
      let body = {
        id: disputeId,
        closed: "true",
        closedComment: updateformik.values.closeComment,
      };
      let res = await UPDATE_DISPUTE(body);
      setcloseDispute(false);
      showToast("Close Dispute Successfully", "success");
      setDisputeDetails({ ...disputeDetails, ...res?.data });
      setIsrefetchData(true);
    } catch (error) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleProviderResolution() {
    try {
      setIsLoading(true);
      let body = {
        id: disputeId,
        resolutionType: "WRITTEN",
        inFavourOf: updateformik.values.inFavourOfID,
        resolutionDescription: updateformik.values.resolutionDescription,
        resolutionComment: updateformik.values.resolutionComment,
        resolutionDocLink: updateformik.values.resolutionDocLink,
      };
      let res = await UPDATE_DISPUTE(body);
      setFavorOf({
        name: updateformik.values.resolutionFavor,
        type: updateformik.values.inFavourOfType,
      });
      setDisputeDetails({ ...disputeDetails, ...res?.data });
      setprovideResolution(false);
      showToast("Resolution Provided", "success");
    } catch (error) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }


  function hanldeIsShowforms(idx: number, bool: boolean) {
    let filte = showForms.map((ele, id) => {
      if (id === idx) {
        return bool;
      }
      return false;
    });

    setShowForms(filte);
  }

  async function handleResolveOffChainWithLegalRepresentation() {
    try {
      setIsLoading(true);
      let body = {
        id: disputeId,
        legalWay: "true",
      };
      let res = await UPDATE_DISPUTE(body);
      setDisputeDetails({ ...disputeDetails, ...res?.data });
      setIsrefetchData(true);
    } catch (error) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const openResolution = () => {
    setprovideResolution((prev) => !prev);
  };
  const closeResolution = () => {
    setprovideResolution(false);
  };

  const openFAQResolution = () => {
    setFaqResolution(true);
  };
  const closeFAQResolution = () => {
    setFaqResolution(false);
  };

  const openDespute = () => {
    setcloseDispute((prev) => !prev);
  };
  const closeDisputeFunction = () => {
    setcloseDispute(false);
  };
  const Activator = (name: String | any) => {
    setActiveBtn(name);
    setDetails(false);
    setProjectName("Dispute");
    setShowSideComponent(true);
  };
  const SideCompHide = () => {
    setShowSideComponent(false);
  };

  let mainSec;
  switch (ActiveBtn) {
    case "FAQ":
      mainSec = <FAQDispute />;
      break;
    case "Pending":
      mainSec = (
        <DisputeCard
          hide={SideCompHide}
          status={"INREVIEW"}
          role={user?.role}
          setDisputeCount={setDisputeCount}
          setProjectName={setProjectName}
          disputeId={disputeId}
          setDisputeId={setDisputeId}
          disputeDetails={disputeDetails}
          setDisputeDetails={setDisputeDetails}
          Deatils={Deatils}
          setDetails={setDetails}
          openResolution={openResolution}
          isrefetchData={isrefetchData}
          setIsrefetchData={setIsrefetchData}
          favorOf={favorOf}
          setFavorOf={setFavorOf}
          userId={user?.id}
        />
      );
      break;
    case "Resolved":
      mainSec = (
        <DisputeCard
          hide={SideCompHide}
          status={"RESOLVED"}
          role={user?.role}
          setDisputeCount={setDisputeCount}
          setProjectName={setProjectName}
          disputeId={disputeId}
          setDisputeId={setDisputeId}
          disputeDetails={disputeDetails}
          setDisputeDetails={setDisputeDetails}
          Deatils={Deatils}
          setDetails={setDetails}
          openResolution={openResolution}
          favorOf={favorOf}
          setFavorOf={setFavorOf}
          userId={user?.id}
        />
      );
      break;
    default:
      mainSec = <Loader />;
  }

  useEffect(() => {
    if (user?.role && user?.role === "ADMIN") {
      setActiveBtn("Pending");
    } else if (user?.role && user?.role !== "ADMIN") {
      setActiveBtn("FAQ");
    }
  }, [user?.role]);

  return (
    <>
      {closeDispute && (
        <CloseDispute
          open={closeDispute}
          close={closeDisputeFunction}
          formik={updateformik}
          role={user?.role}
        />
      )}
      {faqResolution && (
        <FAQResolutionPopUp
          open={faqResolution}
          close={closeFAQResolution}
          disputeId={disputeId}
          disputeDetails={disputeDetails}
          setDisputeDetails={setDisputeDetails}
        />
      )}
      {showForms[2] && (
        <NewDisputeDrag
          formik={formik}
          open={showForms[2]}
          close={() => {
            hanldeIsShowforms(2, false);
          }}
          handlepopupBack={hanldeIsShowforms}
        />
      )}
      {showForms[1] && (
        <RaiseDisputeNaturePopup
          formik={formik}
          handlepopupBack={hanldeIsShowforms}
          open={showForms[1]}
          close={() => {
            hanldeIsShowforms(1, false);
          }}
          nextPopup={hanldeIsShowforms}
        />
      )}
      {showForms[0] && (
        <RaiseNewDispute
          formik={formik}
          open={showForms[0]}
          close={() => {
            hanldeIsShowforms(0, false);
          }}
          nextPopup={hanldeIsShowforms}
        />
      )}
      {provideResolution && (
        <ResolutionPopUp
          open={provideResolution}
          close={closeResolution}
          formik={updateformik}
          disputeDetails={disputeDetails}
        />
      )}
      <Structure
        Heading={
          ShowSide ? "Dispute" : `${projectName ? projectName : "Dispute"}`
        }
        TopButton={
          ShowSide ? (
            <div className="w-[167px]">
              {user?.role && user?.role !== "ADMIN" ? (
                <Button
                  label="Raise New Dispute"
                  size="small"
                  onClick={() => {
                    hanldeIsShowforms(0, true);
                  }}
                />
              ) : null}
            </div>
          ) : (
            Deatils &&
            projectName !== "Dispute" &&
            (user?.role === "ADMIN" &&
              disputeDetails?.status !== "CLOSED" &&
              disputeDetails?.status !== "RESOLVED" ? (
              disputeDetails?.resolutionType &&
                (disputeDetails?.resolutionType === "FAQ" || disputeDetails?.isMoAgree !== null) ? (
                <div className="bg-text-sucess-100 text-white p-3 rounded-sm">
                  Resolution provided
                </div>
              ) : (
                <>

                  <div className="w-[205px]">
                    <Button
                      label="Refer FAQ for Resolution"
                      variant="Transparent"
                      color="secondary"
                      size="small"
                      onClick={openFAQResolution}
                    />
                  </div>
                  <div className="w-[168px]">
                    <Button
                      label="Provide Resolution"
                      size="small"
                      onClick={openResolution}
                    />
                  </div>
                </>
              )
            ) : (
              user?.role !== "ADMIN" &&
              (disputeDetails?.status === "LEGALWAY" ||
                disputeDetails?.status === "INREVIEW") && (
                <>
                  {
                    user?.id === disputeDetails?.RaisedBy?.User?.id && (

                      <Button
                        label="Close Dispute"
                        variant="Transparent"
                        color="secondary"
                        className="px-3"
                        size="small"
                        onClick={openDespute}
                      />
                    )
                    // : null)
                  }
                  {disputeDetails?.isMoAgree && (
                    <Button
                      label="Resolve Off chain with Legal Representation"
                      variant="Transparent"
                      color="secondary"
                      className="px-3"
                      size="small"
                      disable={isLoading}
                      onClick={handleResolveOffChainWithLegalRepresentation}
                    />
                  )}
                </>
              )
            ))
          )
        }
        optionText={
          <>
            {user?.role && user?.role !== "ADMIN" && (
              <Button
                label="FAQ's"
                variant="line"
                size="small"
                className={`text-sm text-text-primary-300 font-bold  ${ActiveBtn === "FAQ"
                  ? "border-b-4 border-text-secondary-50  text-text-secondary-50"
                  : ""
                  }  `}
                onClick={() => {
                  Activator("FAQ");
                }}
              />
            )}
            <Button
              label="Pending Disputes"
              variant="line"
              size="small"
              className={`text-sm text-text-primary-300 font-bold  ${ActiveBtn === "Pending"
                ? "border-b-4 border-text-secondary-50  text-text-secondary-50"
                : ""
                }  `}
              onClick={() => {
                Activator("Pending");
              }}
            />
            <Button
              label="Resolved Disputes"
              variant="line"
              size="small"
              className={`text-sm text-text-primary-300 font-bold  ${ActiveBtn === "Resolved"
                ? "border-b-4 border-text-secondary-50  text-text-secondary-50"
                : ""
                }  `}
              onClick={() => {
                Activator("Resolved");
              }}
            />
          </>
        }
        sideComponetHeading={
          <Typography
            label={"Dispute Overview"}
            color="primary"
            variant={300}
            classname="font-bold "
            FontSize="sm"
            type="p"
          />
        }
        mainSection={mainSec}
        sideComponent={
          ActiveBtn !== "FAQ" && user?.role === "ADMIN" ? (
            <DisputeOverview disputeCount={disputeCount} />
          ) : (
            ""
          )
        }
      />
    </>
  );
};

export default Index;
