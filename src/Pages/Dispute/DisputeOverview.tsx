import { Typography } from "../../Components/Atoms";

const DisputeOverview = ({disputeCount}:any) => {
  const {pendingCount,resolvedCount, totalCount  } = disputeCount || {}
  return (
    <div className="flex justify-center mb-[20px]">
      <div className="shadow-navbar w-[354px] h-[187px]  p-[20px] rounded-[5px]">
        <div className="flex justify-between">
          <Typography
            label={"Total Dispute"}
            classname="text-text-HeadLine-50  font-bold "
            type="p"
            FontSize="base"
          />
          <Typography
            label={totalCount || 0}
            FontSize="2xl"
            color="primary"
            variant={200}
            classname="font-bold "
            type="p"
          />
        </div>{" "}
        <div className="flex justify-between mt-[20px]">
          <Typography
            label={"Pending Disputes"}
            classname="text-text-HeadLine-50  font-bold "
            type="p"
            FontSize="base"
          />
          <Typography
            label={pendingCount || 0}
            FontSize="2xl"
            color="primary"
            variant={200}
            classname="font-bold "
            type="p"
          />
        </div>{" "}
        <div className="flex justify-between mt-[20px]">
          <Typography
            label={"Closed Disputes"}
            classname="text-text-HeadLine-50  font-bold "
            type="p"
            FontSize="base"
          />
          <Typography
            label={resolvedCount || 0}
            FontSize="2xl"
            color="primary"
            variant={200}
            classname="font-bold "
            type="p"
          />
        </div>
      </div>{" "}
    </div>
  );
};

export default DisputeOverview;
