import { useState } from "react";
import { Button, Typography } from "../../Components/Atoms";
import { getDisplayNameForRoles, handleCustomError } from "../../Utils/helper";
import { UPDATE_DISPUTE } from "../../sevices";
import { ResolutionDetails } from "./DisputePopups/Admin/ResolutionDetails";

const NoResolution = ({
  Details,
  disputeDetails,
  setDisputeDetails,
  role,
  openResolution,
  favorOf,
  userId,
  setIsrefetchData,
}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleAgreeORDisagree(status: boolean) {
    try {
      setIsLoading(true);
      let body = {
        id: disputeDetails?.id,
        isAgree: `${status}`,
      };
      let res = await UPDATE_DISPUTE(body);
      setDisputeDetails({ ...disputeDetails, ...res?.data });
      if (res?.data?.status === "RESOLVED") {
        setIsrefetchData(true);
      }
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="shadow-navbar rounded-[5px] py-[20px] ">
        <div className="border-b-[1px] border-text-gray-50 px-[20px] pb-2 flex justify-between">
          <Typography
            label={"Resolution Details"}
            classname="text-text-danger-100 font-bold"
            type="p"
            FontSize="2xl"
          />
          <div
            className={`${
              disputeDetails?.status === "RESOLVED"
                ? "bg-text-sucess-50"
                : disputeDetails?.status === "INREVIEW"
                ? "bg-text-warning-50"
                : disputeDetails?.status === "CLOSED"
                ? "bg-text-sucess-50"
                : "bg-red-400"
            }  flex justify-center items-center rounded-sm`}
          >
            <Typography
              label={
                disputeDetails?.status === "RESOLVED"
                  ? "RESOLVED"
                  : disputeDetails?.status === "INREVIEW"
                  ? "IN REVIEW"
                  : disputeDetails?.status === "CLOSED"
                  ? "CLOSED"
                  : "LEGALWAY"
              }
              classname="text-white px-5 py-1"
              type="p"
              FontSize="sm"
            />
          </div>
        </div>

        {role === "ADMIN" ? (
          <ResolutionDetails
            favorOf={favorOf}
            disputeDetails={disputeDetails}
            openResolution={openResolution}
          />
        ) : (
          <>
            {disputeDetails?.resolutionType === "FAQ" && (
              <div className="px-5">
                <Typography
                  label={`M.O. Referred FAQ FOR  Resolution`}
                  type="p"
                  FontSize="lg"
                  classname="text-text-HeadLine-100 "
                />
              </div>
            )}
            {!disputeDetails?.isMoAgree &&
            disputeDetails?.status !== "CLOSED" ? (
              <>
                <div className="bg-orange-200/80 font-bold text-orange-400 w-fit mx-auto my-10 p-3 px-10 uppercase">
                  In Review
                </div>
                {disputeDetails?.status === "LEGALWAY" && (
                  <div className="flex justify-center mt-[20px]">
                    <Typography
                      label={`${getDisplayNameForRoles(disputeDetails?.RaisedBy?.projectUsers)} going off-chain to resolve dispute`}
                      type="p"
                      classname="text-text-danger-100 font-bold "
                      FontSize="base"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex justify-center mt-[35px]  ">
                  {disputeDetails?.inFavourOf !== null && (
                    <div className="border-[1px] border-text-gray-50 p-5 rounded-[5px] flex flex-col items-center ">
                      <Typography
                        label={`Resolution in favor of ${
                          favorOf?.User?.name || favorOf?.name
                        } (${getDisplayNameForRoles(favorOf?.projectUsers || favorOf?.type)})`}
                        type="p"
                        FontSize="2xl"
                        classname="text-text-HeadLine-100 "
                      />
                    </div>
                  )}
                </div>

                <>
                  <div className="px-5 border-b-[1px] border-text-gray-50 mt-[20px]">
                    <Typography
                      label={"Resolution Description"}
                      classname="font-bold text-text-HeadLine-100 "
                      FontSize="base"
                      type="p"
                    />
                  </div>
                  <div className="px-5 border-b-[1px] border-text-gray-50  ">
                    <div className="flex">
                      <Typography
                        label={disputeDetails?.resolutionDescription ? `“${disputeDetails?.resolutionDescription}”`:''}
                        classname="italic "
                        FontSize="sm"
                        color="primary"
                        variant={300}
                        type="p"
                      />{" "}
                      <Typography
                        label={"-M.O."}
                        classname="font-bold "
                        FontSize="sm"
                        color="primary"
                        variant={200}
                        type="p"
                      />
                    </div>
                    <div className="mt-[14px]">
                      <Typography
                        label={"Evidence"}
                        classname="font-bold text-text-HeadLine-100 "
                        FontSize="base"
                        type="p"
                      />
                    </div>
                  </div>

                  {disputeDetails?.resolutionDocLink.length === 0 ? (
                    <div className="px-5">
                      <Typography
                        label={"No evidence"}
                        color="primary"
                        variant={200}
                        FontSize="sm"
                        type="p"
                        classname="capitalize"
                      />
                    </div>
                  ) : (
                    disputeDetails?.resolutionDocLink.map((evidence: any) => {
                      return (
                        <div
                          key={evidence?.id}
                          className="px-5 border-text-gray-50"
                        >
                          <div className="flex justify-between">
                            <div>
                              <Typography
                                label={evidence?.fileName}
                                color="primary"
                                variant={200}
                                FontSize="sm"
                                type="p"
                                classname="capitalize"
                              />
                            </div>
                            <Button
                              variant="line"
                              size="small"
                              label=""
                              icon={
                                <img
                                  src="/Assets/Download.svg"
                                  className="mt-[-4px]"
                                  alt=""
                                />
                              }
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </>
                <div className="border-b-[1px] border-text-gray-50 mt-5 px-5">
                  <Typography
                    label={"Opinions"}
                    classname="font-bold text-text-HeadLine-100 "
                    FontSize="base"
                    type="p"
                  />
                </div>
                <div className="px-5 pt-[10px] pb-[20px] flex justify-between">
                  <div>
                    <Typography
                      label={"M.O."}
                      color="primary"
                      variant={200}
                      type="p"
                      FontSize="base"
                    />
                    <Typography
                      label={
                        disputeDetails?.isMoAgree === null
                          ? "-"
                          : disputeDetails?.isMoAgree
                          ? "Agree"
                          : "Disagree"
                      }
                      classname={`${
                        disputeDetails?.isMoAgree
                          ? "text-text-sucess-50"
                          : "text-text-danger-100"
                      } `}
                      type="p"
                      FontSize="sm"
                    />
                  </div>
                  <div>
                    <Typography
                      label={`${disputeDetails?.RaisedTo?.User?.name} (${getDisplayNameForRoles(disputeDetails?.RaisedTo?.projectUsers)})`}
                      color="primary"
                      variant={200}
                      type="p"
                      FontSize="base"
                      classname="capitalize"
                    />
                    <Typography
                      label={
                        disputeDetails?.isRaisedToAgree === null
                          ? "-"
                          : disputeDetails?.isRaisedToAgree
                          ? "Agree"
                          : "Disagree"
                      }
                      classname={`${
                        disputeDetails?.isRaisedToAgree
                          ? "text-text-sucess-50"
                          : "text-text-danger-100"
                      } `}
                      type="p"
                      FontSize="sm"
                    />
                  </div>
                  <div>
                    <Typography
                      label={`${disputeDetails?.RaisedBy?.User?.name} (${getDisplayNameForRoles(disputeDetails?.RaisedBy?.projectUsers)})`}
                      color="primary"
                      variant={200}
                      type="p"
                      FontSize="base"
                      classname="capitalize"
                    />
                    <Typography
                      label={
                        disputeDetails?.isRaisedByAgree === null
                          ? "-"
                          : disputeDetails?.isRaisedByAgree
                          ? "Agree"
                          : "Disagree"
                      }
                      classname={`${
                        disputeDetails?.isRaisedByAgree
                          ? "text-text-sucess-50"
                          : "text-text-danger-100"
                      } `}
                      type="p"
                      FontSize="sm"
                    />
                  </div>
                </div>

                {disputeDetails.status === "CLOSED" ||
                disputeDetails.status === "RESOLVED" ? null : (disputeDetails
                    ?.RaisedTo?.User?.id === userId &&
                    disputeDetails?.isRaisedToAgree === null) ||
                  (disputeDetails?.RaisedBy?.User?.id === userId &&
                    disputeDetails?.isRaisedByAgree === null) ? (
                  <div className="flex justify-center mt-[30px] gap-5">
                    <div className="w-[250px]">
                      <Button
                        label="Disagree"
                        disable={isLoading}
                        size="small"
                        onClick={() => {
                          handleAgreeORDisagree(false);
                        }}
                      />
                    </div>
                    <div className="w-[250px]">
                      <Button
                        label="Accept"
                        disable={isLoading}
                        size="small"
                        onClick={() => {
                          handleAgreeORDisagree(true);
                        }}
                      />
                    </div>
                  </div>
                ) : null}
              </>
            )}
            {disputeDetails?.closedBy !== null && (
              <div className="flex">
                <Typography
                  label={
                    disputeDetails?.closedBy ===
                    disputeDetails?.RaisedBy?.User?.id
                      ? `Closed by ${disputeDetails?.RaisedBy?.User?.name} (${getDisplayNameForRoles(disputeDetails?.RaisedBy?.projectUsers)})`
                      : `Closed by ${disputeDetails?.RaisedTo?.User?.name} (${getDisplayNameForRoles(disputeDetails?.RaisedTo?.projectUsers)})`
                  }
                  variant={200}
                  type="p"
                  FontSize="base"
                  classname="text-text-danger-100 font-bold mx-auto capitalize"
                />
              </div>
            )}
          </>
        )}
      </div>
      {/* Release Fund By admin */}
      {/* {role === "ADMIN" && disputeDetails?.resolutionType && (
        <div className="flex justify-center">
          <div className="w-[134px]">
            <Button disable={true} label="Release Fund" />
          </div>
        </div>
      )} */}
    </>
  );
};

export default NoResolution;
