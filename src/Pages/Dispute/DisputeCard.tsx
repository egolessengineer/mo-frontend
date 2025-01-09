// import { PDFDownloadLink } from "@react-pdf/renderer";
import { memo, useEffect, useState } from "react";
import { Button, Typography } from "../../Components/Atoms";
import { Loader } from "../../Components/Atoms/Loader";
import { getDisplayNameForRoles, handleCustomError } from "../../Utils/helper";
import { GET_ALL_DISPUTE } from "../../sevices";
import DisputeDetails from "./DisputeDetails";
// import { PdfCreateAndDownload } from "./DisputePopups/PdfCreateAndDownload";

const DisputeCard = ({
  hide,
  status,
  setDisputeCount,
  setProjectName,
  disputeId,
  setDisputeId,
  disputeDetails,
  setDisputeDetails,
  Deatils,
  setDetails,
  openResolution,
  role,
  isrefetchData,
  setIsrefetchData,
  favorOf,
  setFavorOf,
  userId,
}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disputedata, setDisputeData] = useState<any>();

  function OpenDetails() {
    setDetails(true);
    hide();
  }

  async function getAllDispute(stat: string) {
    try {
      setIsLoading(true);
      let Objparam = {
        status: stat,
      };
      let param = new URLSearchParams(Objparam).toString();
      let res = await GET_ALL_DISPUTE(param);
      if (role === "ADMIN") {
        setDisputeData(res?.data?.disputes);
        setDisputeCount(res?.data?.disputeCounts);
      } else {
        setDisputeData(res?.data);
      }
    } catch (error) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getAllDispute(status);
  }, [status]);

  useEffect(() => {
    if (isrefetchData) {
      getAllDispute("INREVIEW");
      setIsrefetchData(false);
    }
  }, [isrefetchData]);

  return (
    <>
      {Deatils ? (
        <DisputeDetails
          disputeId={disputeId}
          setProjectName={setProjectName}
          disputeDetails={disputeDetails}
          setDisputeDetails={setDisputeDetails}
          openResolution={openResolution}
          role={role}
          favorOf={favorOf}
          setFavorOf={setFavorOf}
          userId={userId}
          setIsrefetchData={setIsrefetchData}
        />
      ) : (
        <div className="">
          <div className="flex flex-wrap  gap-5 justify-start items-start">
            {isLoading ? (
              <Loader />
            ) : disputedata && disputedata.length === 0 ? (
              <div>No Data</div>
            ) : (
              disputedata &&
              disputedata.map((element: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="w-full md:w-[calc(50%-10px)] 2xl:w-[calc((100%/3)-14px)] shadow-navbar rounded-[5px] px-4 py-2 cursor-pointer hover:shadow-2xl relative"
                    onClick={(e: any) => {
                      e.cancelBubble = true;
                      setDisputeId(element?.id);
                      OpenDetails();
                    }}
                  >
                    <div className="">
                      <Typography
                        label={
                          element?.status === "RESOLVED"
                            ? "RESOLVED"
                            : element?.status === "INREVIEW"
                            ? "IN REVIEW"
                            : element?.status === "CLOSED"
                            ? "CLOSED"
                            : "LEGALWAY"
                        }
                        type="p"
                        FontSize="lg"
                        classname={`${
                          element?.status === "RESOLVED"
                            ? "bg-text-sucess-50"
                            : element?.status === "INREVIEW"
                            ? "bg-text-warning-50"
                            : element?.status === "CLOSED"
                            ? "bg-text-sucess-50"
                            : "bg-red-400"
                        } w-fit ml-auto text-white px-5 py-1 rounded-md text-sm font-bold uppercase text-right`}
                      />
                    </div>
                    <Typography
                      label={
                        element?.Project?.ProjectDetails?.title || "no title"
                      }
                      type="p"
                      FontSize="lg"
                      classname="text-text-HeadLine-50 font-bold capitalize"
                    />
                    <div className="mt-[20px]">
                      <Typography
                        label={`Dispute No.: ${element?.id}`}
                        color="primary"
                        variant={200}
                        classname="font-bold"
                        FontSize="sm"
                        type="p"
                      />
                    </div>
                    <div className="mt-[20px]">
                      <Typography
                        label={
                          <div className="flex items-center gap-x-1">
                            Dispute raised by: {element?.RaisedBy?.User?.name}
                            <div className="capitalize">
                              (
                              {getDisplayNameForRoles(
                                element?.RaisedBy?.projectUsers
                              )}
                              )
                            </div>
                          </div>
                        }
                        color="primary"
                        variant={200}
                        FontSize="sm"
                        type="p"
                      />
                    </div>
                    <div className="mt-[30px] flex justify-center">
                      {/* <PDFDownloadLink
                        document={<PdfCreateAndDownload details={element} />}
                        fileName={`Dispute_Details_${element?.Project?.ProjectDetails?.title}.pdf`}
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
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(DisputeCard);
