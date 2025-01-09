import React from "react";
import { Button, Typography } from "../../../../Components/Atoms";
import moment from "moment";
import { getDisplayNameForRoles } from "../../../../Utils/helper";

export const ResolutionDetails = ({ disputeDetails, openResolution, favorOf }: any) => {
  let createDate = moment.unix(disputeDetails?.createdAt).format("YYYY-MM-DD");
  let currentDate = moment(new Date()).format("YYYY-MM-DD");
  let diffDAte = moment(currentDate).diff(createDate, "days");
  return (
    <>
    {disputeDetails?.status !== "CLOSED" ? <div>
      {!disputeDetails?.resolutionType ? (
        <>
          <div className="shadow-navbar rounded-md w-fit mx-auto h-28 p-5 my-5 flex flex-col justify-between items-center">
            <Typography
              label={"“No resolution has been provided”"}
              FontSize="3xl"
              classname="text-text-HeadLine-100 font-bold "
              type="p"
            />
            <Typography
              label={`It has been ${diffDAte} day since the dispute was created`}
              FontSize="sm"
              classname="text-text-danger-100 font-bold"
              type="p"
            />
          </div>
          <div className="w-[300px] mx-auto">
            <Button
              label="Provide Resolution"
              size="small"
              onClick={openResolution}
            />
          </div>
        </>
      ) : (
        <>
        {disputeDetails.resolutionType === "FAQ"? 
          <div className="flex justify-center mt-[35px]  ">
          <div className="border-[1px] border-text-gray-50 p-5 rounded-[5px] flex flex-col items-center ">
            
            <Typography
                label={"mo referred FAQ FOR  Resolution"}
                type="p"
                FontSize="2xl"
                classname="text-text-HeadLine-100  uppercase"
              />
           </div>
          </div> 
        :       
        
        <>
          <div className="flex justify-center mt-[35px]  ">
            <div className="border-[1px] border-text-gray-50 p-5 rounded-[5px] flex flex-col items-center ">
              <Typography
                label={`Resolution in favor of ${favorOf?.User?.name || favorOf.name} (${getDisplayNameForRoles(favorOf?.projectUsers || favorOf.type)})`}
                type="p"
                FontSize="2xl"
                classname="text-text-HeadLine-100  "
              />
            </div>
          </div>

          {disputeDetails?.status === "LEGALWAY" && <div className="flex justify-center mt-[20px]">
            <Typography
              label={`${getDisplayNameForRoles(disputeDetails?.RaisedBy?.projectUsers)} going off-chain to resolve dispute`}
              type="p"
              classname="text-text-danger-100 font-bold "
              FontSize="base"
            />
          </div>}
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
                label={`“${disputeDetails?.resolutionDescription}”`}
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
          
          {disputeDetails?.resolutionDocLink.length === 0? 
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
          : disputeDetails?.resolutionDocLink.map((evidence:any)=>{
            return <div key={evidence?.id} className="px-5  border-b-[1px] border-text-gray-50">
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
            <Typography
              label={"Opinions"}
              classname="font-bold text-text-HeadLine-100 "
              FontSize="base"
              type="p"
            />
          </div>
          })}
          </>}
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
                label={disputeDetails?.isMoAgree === null?"-":disputeDetails?.isMoAgree ? "Agree" : "Disagree"}
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
                label={disputeDetails?.isRaisedToAgree === null?"-":disputeDetails?.isRaisedToAgree ? "Agree" : "Disagree"}
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
              />
              <Typography
                label={disputeDetails?.isRaisedByAgree === null?"-":disputeDetails?.isRaisedByAgree ? "Agree" : "Disagree"}
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
        </>
      )}
    </div> : 
    <div>
      <Typography
              label={`Closed by: ${disputeDetails?.closedBy === disputeDetails?.RaisedBy?.User?.id ? `${disputeDetails?.RaisedBy?.User?.name} (${getDisplayNameForRoles(disputeDetails?.RaisedBy?.projectUsers)})`  : disputeDetails?.closedBy === disputeDetails?.RaisedTo?.User?.id ? `${disputeDetails?.RaisedTo?.User?.name} (${getDisplayNameForRoles(disputeDetails?.RaisedTo?.projectUsers)})`  : null}`}
              FontSize=""
              classname="text-text-danger-100 font-bold w-fit mx-auto capitalize"
              type="p"
            />
    </div>
    }
    </>
  );
};
