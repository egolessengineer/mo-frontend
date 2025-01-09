import moment from "moment";
import { Typography } from "../../Components/Atoms";
import { Piechart } from "../../Components/Molecules";
const ProjectSummary = ({ ProjectSummeryStats, ProjectSummeryTasks, activeAssign }: any) => {
  return (
    <div className=" flex flex-col items-center lg:items-start">
      {ProjectSummeryStats && ProjectSummeryStats.length > 0 && <Piechart data={ProjectSummeryStats} />}
      <br />
      {activeAssign === 'Assign' && <>
        <div className="mt-[10px] border-b-[1px] border-text-gray-50 w-full ">
          <Typography
            label="Tasks"
            type="h2"
            classname="ml-[5px] font-bold "
            FontSize="sm"
            color="primary"
            variant={200}
          />
        </div>
        <div className="w-full mt-[10px] flex flex-col  shadow-navbar rounded-[5px]">
          <div className="flex justify-between  border-b-[1px] border-text-gray-100 p-3 xs:flex-row">
            <Typography
              type="p"
              label="Project"
              color="primary"
              variant={200}
              FontSize="sm"
              classname="font-bold "
            />
            <Typography
              type="p"
              label="Next Milestone"
              color="primary"
              variant={200}
              FontSize="sm"
              classname="font-bold "
            />
          </div>
          {ProjectSummeryTasks && ProjectSummeryTasks.length > 0 ? ProjectSummeryTasks.map((Element: any, index: any) => {
            return (
              <div
                key={index}
                className="flex  justify-between border-b-[1px] border-text-primary-100 p-3 gap-x-5 "
              >
                <div className="flex gap-x-[10px]">
                  <img src="/Assets/Timer.svg" alt=""/>
                  <Typography
                    label={Element?.project}
                    type="h2"
                    FontSize="sm"
                    color="primary"
                    variant={200}
                  />
                </div>
                <Typography
                  label={Element?.next ? moment(Element?.next).format('MMMM DD, yyyy') : 'NA'}
                  type="h2"
                  classname="ml-[5px]  "
                  FontSize="sm"
                  color="primary"
                  variant={200}
                />
              </div>
            )
          }) :
            <div className="flex justify-center py-2">No Tasks Created Yet</div>
          }
        </div>
      </>}
    </div >
  );
};
export default ProjectSummary;