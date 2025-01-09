import moment from "moment";
import { Typography } from "../../../Components/Atoms";
import {
  LineChartMolecule,
  StackedBarMolecule,
} from "../../../Components/Molecules";

const ProjectCount = ({ chartData }: any) => {
  let { projectMetricsOverview, escrowAndPenaltyOverview } = chartData;

  let totalprojectMetricsOverview =
    projectMetricsOverview &&
    projectMetricsOverview[projectMetricsOverview.length - 1]?.total_projects;

  let totalescrowAndPenaltyOverview =
    escrowAndPenaltyOverview &&
    escrowAndPenaltyOverview[escrowAndPenaltyOverview.length - 1]?.escrow +
    escrowAndPenaltyOverview[escrowAndPenaltyOverview.length - 1]?.penalty_no;

  const projectMetricsOverviewSliced =
    projectMetricsOverview &&
    projectMetricsOverview
      .map((item: any, idx: number) => {
        return {
          ...item,
          Total: totalprojectMetricsOverview,
          month: moment(item.month, "YYYY-MM").format("MMM YY"),
        };
      })
      .slice(0, projectMetricsOverview.length - 1);

  const escrowAndPenaltyOverviewSliced =
    escrowAndPenaltyOverview &&
    escrowAndPenaltyOverview
      .map((item: any) => {
        return {
          ...item,
          Total: totalescrowAndPenaltyOverview,
          month: moment(item.month, "YYYY-MM").format("MMM YY"),
        };
      })
      .slice(0, escrowAndPenaltyOverview.length - 1);

  
  return (
    <div className="shadow-navbar rounded-[5px] px-5 pt-[10px] pb-5 ">
      <Typography
        label={"Project Metrics Overview"}
        classname="font-bold text-[#FFD700] "
        FontSize="2xl"
        type="p"
      />
      <div className="flex justify-between  flex-wrap ">
        <div className="w-full xl:w-[45%]">
          <div className="mt-[10px]">
            <Typography
              label={"Project Count and Milestone Types"}
              type="p"
              classname="text-text-HeadLine-100 font-bold "
              FontSize="sm"
            />
          </div>
          <div className="flex justify-between gap-5 mt-[14px] pb-[10px] border-b-[1px] border-text-primary-50">
            <div>
              <Typography
                label={"Total Projects"}
                color="primary"
                variant={200}
                type="p"
                FontSize="xs"
              />{" "}
              <div className="text-right">
                <Typography
                  label={"100"}
                  type="p"
                  classname="text-text-gray-300 font-bold"
                  FontSize="base"
                />{" "}
              </div>
            </div>
            <div>
              <Typography
                label={"Project with Milestones"}
                color="primary"
                variant={200}
                type="p"
                FontSize="xs"
              />{" "}
              <div className="text-right">
                <Typography
                  label={"99"}
                  type="p"
                  classname="text-text-gray-300 font-bold"
                  FontSize="base"
                />{" "}
              </div>
            </div>
            <div>
              <Typography
                label={"Project with no Milestones"}
                color="primary"
                variant={200}
                type="p"
                FontSize="xs"
              />{" "}
              <div className="text-right">
                <Typography
                  label={"01"}
                  type="p"
                  classname="text-text-gray-300 font-bold"
                  FontSize="base"
                />{" "}
              </div>
            </div>
            <div>
              <Typography
                label={"Project with Sub-milestones"}
                color="primary"
                variant={200}
                type="p"
                FontSize="xs"
              />{" "}
              <div className="text-right">
                <Typography
                  label={"50"}
                  type="p"
                  classname="text-text-gray-300 font-bold"
                  FontSize="base"
                />{" "}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <StackedBarMolecule
              data={projectMetricsOverviewSliced || []}
              datamap={[
                {
                  name: "Project With Milestone",
                  data: "total_project_with_milestone",
                  color: "#723A85",
                },
                {
                  name: "Project with No Milestones",
                  data: "project_with_no_milestones",
                  color: "#707291",
                },
                {
                  line: true,
                  name: "Project with Sub-milestones",
                  data: "total_projects_with_submilestones",
                  color: "#F266AB",
                },
              ]}
            />
          </div>
        </div>
        <div className="w-full xl:w-[45%]">
          <div className="mt-[10px]">
            <Typography
              label={"ESCROW and Penalty Overview"}
              type="p"
              classname="text-text-HeadLine-100 font-bold "
              FontSize="sm"
            />
          </div>
          <div className="flex justify-between gap-5 border-b-[1px] border-text-primary-50 mt-[14px] pb-[10px]">
            <div>
              <Typography
                label={"Total No of ESCROW"}
                color="primary"
                variant={200}
                type="p"
                FontSize="xs"
              />{" "}
              <div className="text-right">
                <Typography
                  label={
                    escrowAndPenaltyOverview &&
                    escrowAndPenaltyOverview[
                      escrowAndPenaltyOverview.length - 1
                    ]?.escrow
                  }
                  type="p"
                  classname="text-text-gray-300 font-bold"
                  FontSize="base"
                />{" "}
              </div>
            </div>
            <div>
              <Typography
                label={"No. of Penalty Applied"}
                color="primary"
                variant={200}
                type="p"
                FontSize="xs"
              />{" "}
              <div className="text-right">
                <Typography
                  label={
                    escrowAndPenaltyOverview &&
                    escrowAndPenaltyOverview[
                      escrowAndPenaltyOverview.length - 1
                    ]?.penalty_no
                  }
                  type="p"
                  classname="text-text-gray-300 font-bold"
                  FontSize="base"
                />{" "}
              </div>
            </div>
            <div>
              <Typography
                label={""}
                color="primary"
                variant={200}
                type="p"
                FontSize="xs"
              />{" "}
              <div className="text-right">
                <Typography
                  label={""}
                  type="p"
                  classname="text-text-gray-300 font-bold"
                  FontSize="base"
                />{" "}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <LineChartMolecule data={escrowAndPenaltyOverviewSliced || []} />
          </div>
        </div>
      </div>

      <div className="flex justify-between"></div>
    </div>
  );
};

export default ProjectCount;
