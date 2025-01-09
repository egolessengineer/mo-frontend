// import { PDFDownloadLink } from "@react-pdf/renderer";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { Button, Typography } from "../../Components/Atoms";
import { Loader } from "../../Components/Atoms/Loader";
import { getDisplayNameForRoles, handleCustomError } from "../../Utils/helper";
import { GET_DISPUTE } from "../../sevices";
// import { PdfCreateAndDownload } from "./DisputePopups/PdfCreateAndDownload";
import NoResolution from "./NoResolution";

const DisputeDetails = ({
  disputeId,
  setProjectName,
  disputeDetails,
  setDisputeDetails,
  role,
  openResolution,
  favorOf,
  setFavorOf,
  userId,
  setIsrefetchData,
}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGetDisputeDetail(id: any) {
    try {
      setIsLoading(true);
      let res = await GET_DISPUTE(id);

      setDisputeDetails(res?.data);
      setProjectName(res?.data?.projectName);
      if (res?.data?.inFavourOf !== null) {
        if (res?.data?.inFavourOf === res?.data?.raisedBy) {
          setFavorOf(res?.data?.RaisedBy);
        } else {
          setFavorOf(res?.data?.RaisedTo);
        }
      }
    } catch (error) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleGetDisputeDetail(disputeId);
  }, [disputeId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-5 mt-[10px] ">
          <div className=" shadow-navbar rounded-[5px] py-[20px]">
            <div className="pl-[10px]  border-b-[1px] border-text-gray-50 flex flex-row justify-between items-center">
              <Typography
                type="p"
                label={"Dispute Details"}
                classname="text-text-danger-100 font-bold "
                FontSize="2xl"
              />
              <Typography
                type="p"
                label={
                  disputeDetails?.status === "RESOLVED"
                    ? "RESOLVED"
                    : disputeDetails?.status === "INREVIEW"
                    ? "IN REVIEW"
                    : disputeDetails?.status === "CLOSED"
                    ? "CLOSED"
                    : "LEGALWAY"
                }
                classname={`${
                  disputeDetails?.status === "RESOLVED"
                    ? "bg-text-sucess-50"
                    : disputeDetails?.status === "INREVIEW"
                    ? "bg-text-warning-50"
                    : disputeDetails?.status === "CLOSED"
                    ? "bg-text-sucess-50"
                    : "bg-red-400"
                } text-sm py-1  text-white font-bold mr-5 px-5 rounded-sm`}
                FontSize="lg"
              />
            </div>
            <div className="pl-[20px] pt-[20px] border-b-[1px] border-text-gray-50 ">
              <Typography
                label={"Project Details"}
                FontSize="base"
                classname="text-text-HeadLine-100 font-bold "
                type="p"
              />
            </div>
            <div className="px-[20px] py-[10px]">
              <div className="flex justify-between">
                <div className="flex flex-col space-y-[20px]">
                  <div>
                    <Typography
                      label="Project Name"
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      FontSize="sm"
                      type="p"
                    />
                    <Typography
                      label={disputeDetails?.projectName}
                      color="primary"
                      variant={300}
                      FontSize="sm"
                      type="p"
                    />
                  </div>
                  <div>
                    <Typography
                      label="Dispute Number"
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      FontSize="sm"
                      type="p"
                    />
                    <Typography
                      label={disputeDetails?.id}
                      color="primary"
                      variant={300}
                      FontSize="sm"
                      type="p"
                    />
                  </div>
                  <div>
                    <Typography
                      label="Nature of Dispute"
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      FontSize="sm"
                      type="p"
                    />
                    <Typography
                      label={disputeDetails?.disputeNature?.toLowerCase()}
                      color="primary"
                      variant={300}
                      FontSize="sm"
                      type="p"
                      classname="capitalize"
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-[20px]">
                  <div>
                    <Typography
                      label="Project Fund"
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      FontSize="sm"
                      type="p"
                    />
                    <Typography
                      label={`${disputeDetails?.projectFund} $`}
                      color="primary"
                      variant={300}
                      FontSize="sm"
                      type="p"
                    />
                  </div>
                  <div>
                    <Typography
                      label="Raised By"
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      FontSize="sm"
                      type="p"
                    />
                    <Typography
                      label={`${
                        disputeDetails?.RaisedBy?.User?.name
                      } (${getDisplayNameForRoles(
                        disputeDetails?.RaisedBy?.projectUsers
                      )})`}
                      color="primary"
                      variant={300}
                      FontSize="sm"
                      type="p"
                      classname="capitalize"
                    />
                  </div>
                </div>
                {/* //!Third coluum*/}
                <div className="flex flex-col space-y-[20px]">
                  <div>
                    <Typography
                      label="Project Duration"
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      FontSize="sm"
                      type="p"
                    />
                    <Typography
                      label={`${disputeDetails?.projectDuration}`}
                      color="primary"
                      variant={300}
                      FontSize="sm"
                      type="p"
                    />
                  </div>
                  <div>
                    <Typography
                      label="Raised On"
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      FontSize="sm"
                      type="p"
                    />
                    <Typography
                      label={moment
                        .unix(disputeDetails?.createdAt)
                        .format("DD MMM YYYY hh:mm a")}
                      color="primary"
                      variant={300}
                      FontSize="sm"
                      type="p"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b-[1px] pl-[20px] pt-[4px]">
              <Typography
                label={"Participants Involved"}
                classname="text-text-HeadLine-100  font-bold "
                type="p"
                FontSize="base"
              />
            </div>
            <div className="flex px-[20px] py-[10px] justify-between ">
              <div>
                <Typography
                  label={"Purchaser"}
                  type="p"
                  color="primary"
                  variant={200}
                  classname="font-bold "
                  FontSize="sm"
                />
                <Typography
                  label={
                    disputeDetails?.RaisedBy?.projectUsers === "PURCHASER"
                      ? disputeDetails?.RaisedBy?.User?.name
                      : disputeDetails?.RaisedTo?.User?.name
                  }
                  type="p"
                  color="primary"
                  variant={300}
                  FontSize="sm"
                />
              </div>
              <div>
                <Typography
                  label={"Provider"}
                  type="p"
                  color="primary"
                  variant={200}
                  classname="font-bold "
                  FontSize="sm"
                />
                <Typography
                  label={disputeDetails?.collectiveProvider}
                  type="p"
                  color="primary"
                  variant={300}
                  FontSize="sm"
                />
              </div>
              <div>
                <Typography
                  label={"List of Individuals"}
                  type="p"
                  color="primary"
                  variant={200}
                  classname="font-bold "
                  FontSize="sm"
                />
                {disputeDetails?.individualProviders.map(
                  (indName: any, idx: any) => (
                    <Typography
                      key={indName + idx}
                      label={indName}
                      type="p"
                      color="primary"
                      variant={300}
                      FontSize="sm"
                    />
                  )
                )}
              </div>
            </div>
            <div className="mt-[10px] pl-[20px] border-b-[1px] border-text-gray-50">
              <Typography
                label={"Dispute Description"}
                classname="text-text-HeadLine-100 font-bold "
                FontSize="base"
                type="p"
              />
            </div>
            <div className="px-[20px] py-[10px]">
              <Typography
                label={disputeDetails?.RaisedBy?.User?.name}
                color="primary"
                variant={200}
                classname="font-bold capitalize"
                FontSize="sm"
                type="p"
              />
              <Typography
                label={`“${disputeDetails?.disputeDescription}”`}
                color="primary"
                variant={300}
                FontSize="sm"
                type="p"
              />
            </div>
            <div className="mt-[4px] px-[20px] border-b-[1px] border-text-gray-50">
              <Typography
                label={"Evidence"}
                classname="text-text-HeadLine-100 font-bold "
                FontSize="base"
                type="p"
              />
            </div>
            {disputeDetails?.evidenceDocLink.length === 0 ? (
              <div className="px-[20px] py-[10px]">
                <Typography
                  label={"No evidence"}
                  color="primary"
                  variant={300}
                  FontSize="sm"
                  type="p"
                  classname="capitalize"
                />
              </div>
            ) : (
              disputeDetails?.evidenceDocLink.map(
                (evidence: any, index: any) => {
                  return (
                    <div
                      key={evidence?.id}
                      className="px-[20px] py-[10px] flex justify-between"
                    >
                      <div>
                        <Typography
                          label={evidence?.fileName}
                          color="primary"
                          variant={300}
                          FontSize="sm"
                          type="p"
                          classname="capitalize"
                        />
                      </div>
                      <Button
                        variant="line"
                        size="small"
                        icon={<img src="/Assets/Download.svg" alt="" />}
                        label=""
                      />
                    </div>
                  );
                }
              )
            )}

            <div className="flex justify-center mt-[10px]">
              <div className="w-[20%]">
                {/* <PDFDownloadLink
                  document={<PdfCreateAndDownload details={disputeDetails} />}
                  fileName={`Dispute_Details_${disputeDetails?.projectName}.pdf`}
                >
                  {({ loading }) =>
                    loading ? (
                      "Loading document..."
                    ) : (
                      <Button
                        variant="Transparent"
                        color="secondary"
                        label="Download Dispute File"
                        onClick={(e: any) => {
                          e.stopPropagation();
                        }}
                        icon={
                          <img
                            src="/Assets/Download.svg"
                            width="24px"
                            height="24px"
                            alt=""
                          />
                        }
                        size="small"
                      />
                    )
                  }
                </PDFDownloadLink> */}
              </div>
            </div>
          </div>

          <NoResolution
            disputeDetails={disputeDetails}
            role={role}
            openResolution={openResolution}
            setDisputeDetails={setDisputeDetails}
            favorOf={favorOf}
            userId={userId}
            setIsrefetchData={setIsrefetchData}
          />
        </div>
      )}
    </>
  );
};

export default memo(DisputeDetails);
