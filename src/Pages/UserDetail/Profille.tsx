import { HelperText, Typography } from "../../Components/Atoms";

const Profille = ({ provideDetails }: any) => {
  return (
    <div className="">
      <div className="border-b-[1px] border-text-gray-50">
        <Typography
          label="Individual"
          type="p"
          color="primary"
          variant={200}
          classname="font-bold "
          FontSize="sm"
        />
      </div>
      <div className=" shadow-navbar rounded-[5px] mt-[10px] p-[20px]">
        <div className=" flex flex-col  items-center">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-[#3498db] flex justify-center items-center">
            {provideDetails?.About?.profilePictureLink ? (
              <img
                src={provideDetails?.About?.profilePictureLink}
                className="w-full h-full object-cover"
                alt=""
              />
            ) : (
              <div className="text-white text-3xl font-bold uppercase">
                {provideDetails?.name
                  ? provideDetails?.name.trim().charAt(0)
                  : ""}
              </div>
            )}
          </div>
          <Typography
            classname="font-bold text-text-HeadLine-50 mt-[10px] capitalize leading-7"
            FontSize="4xl"
            type="p"
            label={provideDetails?.name || ""}
          />
          <Typography
            classname="font-medium uppercase mt-3"
            FontSize="xs"
            color="primary"
            variant={300}
            type="p"
            label={
              provideDetails?.Experiences
                ? provideDetails?.Experiences[0]?.position
                : ""
            }
          />
          <div className="flex mt-[8px] space-x-[5px]">
            <Typography
              classname="font-bold  "
              FontSize="base"
              color="primary"
              variant={200}
              type="p"
              label="ID:"
            />
            <Typography
              classname="font-bold  "
              FontSize="base"
              color="primary"
              variant={300}
              type="p"
              label={provideDetails?.id || ""}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-[10px] justify-start mt-[20px]">
          <HelperText icon={<img src="/Assets/Web.svg" alt="" />} 
          label={provideDetails?.About?.portfolioLink.length !== 0? provideDetails?.About?.portfolioLink[0]: "N/A"} />
          <HelperText
            icon={<img src="/Assets/Message.svg" alt="" />}
            label={"" || provideDetails?.id}
          />
          <HelperText
            icon={<img src="/Assets/Phone.svg" alt="" />}
            label={provideDetails?.About?.phoneNumber || "-"}
          />
          <HelperText
            icon={<img src="/Assets/Mail.svg" alt="" />}
            label={provideDetails?.email || "-"}
          />
          <HelperText
            icon={<img src="/Assets/Location.svg" alt="" />}
            label={`${provideDetails?.Address[0]?.city || ""}, ${
              provideDetails?.Address[0]?.country || ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Profille;
