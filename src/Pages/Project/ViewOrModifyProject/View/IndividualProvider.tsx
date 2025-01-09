import moment from "moment";
import { Button, HelperText, Typography } from "../../../../Components/Atoms";

const IndividualProvider = ({ viewProjectData }: any) => {
  const address = viewProjectData?.ProjectMembers?.CP?.User?.Address[0];

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="shadow-navbar w-full rounded-[5px]">
        <div className="flex px-5 py-[10px] border-b-[1px] border-text-gray-50 justify-between">
          <Typography
            label={"Group Provider"}
            type="p"
            classname="font-bold  text-text-HeadLine-100  "
            FontSize="sm"
          />
          
        </div>
        <div className="flex justify-between border-b-[1px] border-text-gray-50 px-[20px] py-[10px] ">
          <div className="flex space-x-5 items-center ">
            <img
              src={
                viewProjectData?.ProjectMembers?.CP?.User?.About
                  ?.profilePictureLink
              }
              className="rounded-full w-[124px] h-[124px]"
              alt=""
            />
            <div>
              <Typography
                label={viewProjectData?.ProjectMembers?.CP?.User?.name}
                color="primary"
                variant={200}
                FontSize="2xl"
                type="p"
              />
              <Typography
                label={
                  viewProjectData?.ProjectMembers?.CP?.User?.Experiences[0]
                    ?.position
                }
                color="primary"
                variant={300}
                FontSize="sm"
                type="p"
              />
              <div className="mt-[10px] ">
                <HelperText
                  icon={
                    <img
                      src="/Assets/Message.svg"
                      className="mt-[6px]"
                      alt=""
                    />
                  }
                  iconPosition="left"
                  label={viewProjectData?.ProjectMembers?.CP?.userId}
                  className="text-sm font-bold text-text-primary-200 "
                />
                <div className="w-full flex items-center gap-x-1 mt-[10px]">
                  <div className="self-start">
                    <img
                      src="/Assets/Location.svg"
                      className="mt-[6px]"
                      alt=""
                      width="15px"
                      height="15px"
                    />
                  </div>
                  <div className="text-sm text-text-primary-300 w-[40%]">
                    {address
                      ? `${address.street ? address.street + ", " : ""}
                      ${address.city ? address.city + ", " : ""}
                      ${address.state ? address.state + ", " : ""}
                      ${address.postalCode ? address.postalCode + ", " : ""}
                      ${address.country ? address.country : ""}`
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[36%]">
            <Typography
              label={"About the provider"}
              color="primary"
              variant={200}
              FontSize="sm"
              classname="font-bold "
              type="p"
            />
            <Typography
              label={viewProjectData?.ProjectMembers?.CP?.User?.About?.about}
              color="primary"
              variant={300}
              FontSize="sm"
              type="p"
            />
          </div>
        </div>
        <div className="flex justify-between px-[20px] py-[10px]">
          <div>
            <HelperText
              label={
                viewProjectData?.ProjectMembers?.CP?.User?.About?.phoneNumber
              }
              icon={<img src="/Assets/Phone.svg" className="mt-[5px]" alt="" />}
              iconPosition="left"
              className="text-xs text-text-primary-300  "
            />
          </div>
          <div>
            <HelperText
              label={viewProjectData?.ProjectMembers?.CP?.User?.email}
              icon={<img src="/Assets/Mail.svg" className="mt-[5px]" alt="" />}
              iconPosition="left"
              className="text-xs text-text-primary-300  "
            />
          </div>
          <div>
            <Button
              label="View Profile"
              variant="line"
              icon={<img src="/Assets/FAQClose.svg" alt="" />}
              iconPosition="left"
              className="text-xs text-text-primary-200 font-medium "
            />
          </div>
        </div>
      </div>

      {viewProjectData?.ProjectMembers?.IP &&
        viewProjectData?.ProjectMembers?.IP.length > 0 &&
        viewProjectData?.ProjectMembers?.IP.map(
          (element: any, index: number) => {
            return (
              <div className="shadow-navbar w-full rounded-[5px]">
                <div className="flex px-5 py-[10px] border-b-[1px] border-text-gray-50 justify-between">
                  <Typography
                    label={"Individual"}
                    type="p"
                    classname="font-bold  text-text-HeadLine-100  "
                    FontSize="sm"
                  />
                </div>
                
                <div className="flex justify-between items-center border-b-[1px] border-text-gray-50 px-[20px] py-[10px] ">
                  <div className="flex space-x-5 items-center ">
                    <img
                      src={element?.User?.About?.profilePictureLink}
                      className="rounded-full w-[68px] h-[68px]"
                      alt=""
                    />
                    <div>
                      <Typography
                        label={element?.User?.name}
                        color="primary"
                        variant={200}
                        FontSize="2xl"
                        type="p"
                      />
                      <Typography
                        label={element?.User?.Experiences[0]?.position}
                        color="primary"
                        variant={300}
                        FontSize="sm"
                        type="p"
                      />
                    </div>
                  </div>

                  <div className="w-[36%]">
                    <Typography
                      label={"Date Assigned"}
                      color="primary"
                      variant={200}
                      FontSize="sm"
                      classname="font-bold "
                      type="p"
                    />
                    <Typography
                      label={
                        moment(element?.User?.createdAt).format(
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
                    <Button
                      label="View Profile"
                      variant="line"
                      icon={<img src="/Assets/FAQClose.svg" alt="" />}
                      iconPosition="left"
                      className="text-xs text-text-primary-200 font-medium "
                    />
                  </div>
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};

export default IndividualProvider;
