import { HelperText, Typography } from "../../../../Components/Atoms";
const PurchaserDetails = ({ viewProjectData }: any) => {
  const address = viewProjectData?.projectRole === "CP" ? viewProjectData?.ProjectMembers?.PURCHASER?.User?.Address[0] : viewProjectData?.ProjectMembers?.CP?.User?.Address[0];

  return (
    <div className="shadow-navbar px-5 py-4 w-full sm:w-1/3  rounded-[5px] h-max">
      <div className="flex justify-end">

      </div>
      {viewProjectData?.projectRole === "CP" ? (
        <>
          <div className="flex flex-col items-center space-y-[10px]">
            <img
              src={
                viewProjectData?.ProjectMembers?.PURCHASER?.User?.About
                  ?.profilePictureLink
              }
              alt=""
              className="rounded-full w-[124px] h-[124px] "
            />
            <div className="">
              <Typography
                label={viewProjectData?.ProjectMembers?.PURCHASER?.User?.name}
                FontSize="3xl"
                classname="text-text-HeadLine-100 font-bold leading-[36px] "
                type="h2"
              />
            </div>
            <div className=" flex">
              <HelperText
                icon={<img src="/Assets/Message.svg" className="mt-[6px]" alt=""/>}
              />
              <Typography
                label={viewProjectData?.ProjectMembers?.PURCHASER?.User?.id}
                FontSize="base"
                color="primary"
                variant={200}
                classname="font-bold "
                type="p"
              />
            </div>
          </div>
          <div className="flex flex-col  mt-[20px]">
            <Typography
              label={`About the ${viewProjectData?.projectRole === "CP" ? "purchaser" : "provider"
                }`}
              FontSize="base"
              color="primary"
              variant={200}
              type="h3"
              classname="font-bold "
            />
            <Typography
              label={
                viewProjectData?.ProjectMembers?.PURCHASER?.User?.About?.about || "NA"
              }
              FontSize="sm"
              color="primary"
              variant={300}
              type="p"
              classname="break-words"
            />
            <div className="w-full flex items-center gap-x-1 mt-[39px]">
              <div className="self-start">
                <img
                  src="/Assets/Phone.svg"
                  className="mt-[6px]"
                  alt=""
                  width="15px"
                  height="15px"
                />
              </div>
              <div>
                {
                  viewProjectData?.ProjectMembers?.PURCHASER?.User?.About
                    ?.phoneNumber || "NA"
                }
              </div>
            </div>
            <div className="w-full flex items-center gap-x-1 mt-[20px]">
              <div className="self-start">
                <img
                  src="/Assets/Location.svg"
                  className="mt-[6px]"
                  alt=""
                  width="15px"
                  height="15px"
                />
              </div>
              <div>
                {address && (address.street || address.city || address.state || address.postalCode || address.country)
                  ? `${address.street ? address.street + ", " : ""}
                      ${address.city ? address.city + ", " : ""}
                      ${address.state ? address.state + ", " : ""}
                      ${address.postalCode ? address.postalCode + ", " : ""}
                      ${address.country ? address.country : ""}`
                  : "NA"}
              </div>
            </div>
            <div className="w-full flex items-center gap-x-1 mt-[29px]">
              <div className="self-start w-[8%]">
                <img
                  src="/Assets/Mail.svg"
                  className="mt-[6px]"
                  alt=""
                  width="19px"
                  height="15px"
                />
              </div>
              <div className="w-[91%] break-words">
                {viewProjectData?.ProjectMembers?.PURCHASER?.User?.email}{" "}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center space-y-[10px]">
            <img
              src={
                viewProjectData?.ProjectMembers?.CP?.User?.About
                  ?.profilePictureLink
              }
              alt=""
              className="rounded-full w-[124px] h-[124px] "
            />
            <div className="">
              <Typography
                label={viewProjectData?.ProjectMembers?.CP?.User?.name}
                FontSize="3xl"
                classname="text-text-HeadLine-100 font-bold leading-[36px] "
                type="h2"
              />
            </div>
            <div className=" flex">
              <HelperText
                icon={<img src="/Assets/Message.svg" className="mt-[6px]" alt=""/>}
              />
              <Typography
                label={viewProjectData?.ProjectMembers?.CP?.User?.id}
                FontSize="base"
                color="primary"
                variant={200}
                classname="font-bold "
                type="p"
              />
            </div>
          </div>
          <div className="flex flex-col  mt-[20px]">
            <Typography
              label={`About the ${viewProjectData?.projectRole === "CP" ? "CP" : "provider"
                }`}
              FontSize="base"
              color="primary"
              variant={200}
              type="h3"
              classname="font-bold "
            />
            <Typography
              label={viewProjectData?.ProjectMembers?.CP?.User?.About?.about || "NA"}
              FontSize="sm"
              color="primary"
              variant={300}
              type="p"
              classname="break-words"
            />
            <div className="w-full flex items-center gap-x-1 mt-[39px]">
              <div className="self-start">
                <img
                  src="/Assets/Phone.svg"
                  className="mt-[6px]"
                  alt=""
                  width="15px"
                  height="15px"
                />
              </div>
              <div>
                {viewProjectData?.ProjectMembers?.CP?.User?.About?.phoneNumber || 'NA'}
              </div>
            </div>
            <div className="w-full flex items-center gap-x-1 mt-[20px]">
              <div className="self-start">
                <img
                  src="/Assets/Location.svg"
                  className="mt-[6px]"
                  alt=""
                  width="15px"
                  height="15px"
                />
              </div>
              <div>
                {address && (address.street || address.city || address.state || address.postalCode || address.country)
                  ? `${address.street ? address.street + ", " : ""}
                      ${address.city ? address.city + ", " : ""}
                      ${address.state ? address.state + ", " : ""}
                      ${address.postalCode ? address.postalCode + ", " : ""}
                      ${address.country ? address.country : ""}`
                  : "NA"}
              </div>
            </div>
            <div className="w-full flex items-center gap-x-1 mt-[29px]">
              <div className="self-start w-[8%]">
                <img
                  src="/Assets/Mail.svg"
                  className="mt-[6px]"
                  alt=""
                  width="19px"
                  height="15px"
                />
              </div>
              <div className="w-[91%] break-words">
                {viewProjectData?.ProjectMembers?.CP?.User?.email}{" "}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaserDetails;
