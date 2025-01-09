import moment from "moment";
import { Typography } from "../../../Components/Atoms";
import { StackedBarMolecule } from "../../../Components/Molecules";

const RoyalityManagement = ({ chartData }: any) => {
  const { royaltyManagementOverview, performanceOverview } = chartData;

  const totalroyaltyManagementOverview =
    royaltyManagementOverview &&
    royaltyManagementOverview[royaltyManagementOverview.length - 1]
      ?.post_payment_royalty + royaltyManagementOverview &&
    royaltyManagementOverview[royaltyManagementOverview.length - 1]
      ?.pre_payment_royalty;

  const totalperformanceOverview =
    performanceOverview &&
    performanceOverview[performanceOverview.length - 1]?.total_disputes;

  let royaltyManagementOverviewSliced =
    royaltyManagementOverview &&
    royaltyManagementOverview
      .map((item: any, idx: number) => {
        return {
          ...item,
          Total: totalroyaltyManagementOverview,
          month: moment(item.month, "YYYY-MM").format("MMM YY"),
        };
      })
      .slice(0, royaltyManagementOverview.length - 1);

  let performanceOverviewSliced =
    performanceOverview &&
    performanceOverview
      .map((item: any, idx: number) => {
        return {
          ...item,
          Total: totalperformanceOverview,
          month: moment(item.month, "YYYY-MM").format("MMM YY"),
        };
      })
      .slice(0, performanceOverview.length - 1);
  return (
    <div className="flex justify-between flex-wrap gap-5  ">
      {/* //!Royality */}
      <div className=" shadow-navbar px-5 pb-5 pt-[10px] rounded-[5px] w-full  xl:w-[48%]">
        <Typography
          label={"Success Bonus Management Overview"}
          classname="font-bold text-[#FFD700] "
          FontSize="2xl"
          type="p"
        />

        <div className="flex justify-between">
          <div className="mt-[10px]">
            <Typography
              label={"Tracking Wallet and Payment Types"}
              type="p"
              classname="text-text-HeadLine-100 font-bold "
              FontSize="sm"
            />
          </div>
          
        </div>

        <div className="flex justify-around gap-5 mt-5 border-b-[1px] border-text-primary-50">
          <div>
            <Typography
              label={"Pre-payment Success Bonus"}
              color="primary"
              variant={200}
              type="p"
              FontSize="xs"
            />{" "}
            <div className="text-right">
              <Typography
                label={
                  royaltyManagementOverview &&
                  royaltyManagementOverview[
                    royaltyManagementOverview.length - 1
                  ]?.pre_payment_royalty
                }
                type="p"
                classname="text-text-gray-300 font-bold"
                FontSize="base"
              />{" "}
            </div>
          </div>
          <div>
            <Typography
              label={"Post-payment Success Bonus"}
              color="primary"
              variant={200}
              type="p"
              FontSize="xs"
            />{" "}
            <div className="text-right">
              <Typography
                label={
                  royaltyManagementOverview &&
                  royaltyManagementOverview[
                    royaltyManagementOverview.length - 1
                  ]?.post_payment_royalty
                }
                type="p"
                classname="text-text-gray-300 font-bold"
                FontSize="base"
              />{" "}
            </div>
          </div>
        </div>
        <StackedBarMolecule
          data={royaltyManagementOverviewSliced || []}
          datamap={[
            {
              name: "Prepayment Success Bonus",
              data: "pre_payment_royalty",
              color: "#84d087",
            },
            {
              name: "Post-payment Success Bonus",
              data: "pre_payment_royalty",
              color: "#d8ac21",
            },
          ]}
        />
      </div>
      <div className=" shadow-navbar px-5 pb-5 pt-[10px] rounded-[5px] w-full  xl:w-[48%]">
        <Typography
          label={"Dispute Overview"}
          classname="font-bold text-[#FFD700] "
          FontSize="2xl"
          type="p"
        />

        <div className="mt-[10px]">
          <Typography
            label={"Project Count and Milestone Types"}
            type="p"
            classname="text-text-HeadLine-100 font-bold "
            FontSize="sm"
          />
        </div>

        <div className="flex justify-between gap-5 mt-5 border-b-[1px] border-text-primary-50">
          <div>
            <Typography
              label={"Dispute resolved with M.O."}
              color="primary"
              variant={200}
              type="p"
              FontSize="xs"
            />{" "}
            <div className="text-right">
              <Typography
                label={
                  performanceOverview &&
                  performanceOverview[performanceOverview.length - 1]
                    ?.resolved_disputes_with_mo
                }
                type="p"
                classname="text-text-gray-300 font-bold"
                FontSize="base"
              />{" "}
            </div>
          </div>
          <div>
            <Typography
              label={"Dispute resolved without M.O."}
              color="primary"
              variant={200}
              type="p"
              FontSize="xs"
            />{" "}
            <div className="text-right">
              <Typography
                label={
                  performanceOverview &&
                  performanceOverview[performanceOverview.length - 1]
                    ?.resolved_without_mo
                }
                type="p"
                classname="text-text-gray-300 font-bold"
                FontSize="base"
              />{" "}
            </div>
          </div>
          <div>
            <Typography
              label={"Unresolved Disputes"}
              color="primary"
              variant={200}
              type="p"
              FontSize="xs"
            />{" "}
            <div className="text-right">
              <Typography
                label={
                  performanceOverview &&
                  performanceOverview[performanceOverview.length - 1]
                    ?.unresolved
                }
                type="p"
                classname="text-text-gray-300 font-bold"
                FontSize="base"
              />{" "}
            </div>
          </div>
          <div>
            <Typography
              label={"Total Disputes"}
              color="primary"
              variant={200}
              type="p"
              FontSize="xs"
            />{" "}
            <div className="text-right">
              <Typography
                label={
                  performanceOverview &&
                  performanceOverview[performanceOverview.length - 1]
                    ?.total_disputes
                }
                type="p"
                classname="text-text-gray-300 font-bold"
                FontSize="base"
              />{" "}
            </div>
          </div>
        </div>
        <StackedBarMolecule
          data={performanceOverviewSliced || []}
          datamap={[
            {
              name: "Dispute resolved with M.O.",
              data: "resolved_disputes_with_mo",
              color: "#84d087",
            },
            {
              name: "Dispute resolved without M.O.",
              data: "resolved_without_mo",
              color: "#d8ac21",
            },
            {
              name: "Dispute Unresolved",
              data: "unresolved",
              color: "#fb6f92",
            },
            {
              line: true,
              name: "Total Dispute",
              data: "total_disputes",
              color: "#723A85",
            },
          ]}
        />
      </div>

      {/* //!Performance Insight */}
    </div>
  );
};

export default RoyalityManagement;
