import moment from "moment";
import { Typography } from "../../../Components/Atoms";
import { ComposedChartMolecule, Option } from "../../../Components/Molecules";

const UserRoleOverView = ({ chartData }: any) => {
  let { usersOverview } = chartData;


  let totalusersOverview = usersOverview &&
    usersOverview[usersOverview.length - 1]?.totalusers

  let usersOverviewSliced =
    usersOverview &&
    usersOverview
      .map((item: any, idx: number) => {
        return {
          ...item,
          Total: totalusersOverview,
          month: moment(item?.month, "YYYY-MM").format("MMM YY"),
        };
      })
      .slice(0, usersOverview.length - 1);

  return (
    <div className="shadow-navbar rounded-[5px] px-5 pb-5">
      <div className="pb-[10px] border-b-[1px] border-text-gray-300">
        <div className="flex justify-between flex-wrap">
          <div className="mt-[7px]">
            <Typography
              label={"Users Role Overview"}
              type="p"
              classname="text-[#FFD700] font-bold "
              FontSize="2xl"
            />
            <div className="mt-[10px]">
              <Typography
                label={"Total users and Categories"}
                type="p"
                classname="text-text-HeadLine-100 font-bold "
                FontSize="sm"
              />
            </div>
          </div>
          {/* <div className="relative mt-5">
            <Option
              options={["All Roles", "P", "CP", "CP as IP", "IP"]}
              placeholder="Select"
              Title={""}
              buttonClassName="w-[199px]"
              optionsClassName="top-[77%] w-[199px]"
            />
          </div> */}
        </div>
        <div className="flex justify-evenly mt-5">
          <div>
            <Typography
              label={"Total Users"}
              type="p"
              FontSize="xs"
              color="primary"
              variant={200}
            />
            <div className="text-right">
              <Typography
                label={
                  usersOverview &&
                  usersOverview[usersOverview.length - 1]?.totalusers
                }
                type="p"
                FontSize="base"
                classname="font-bold "
                color="primary"
                variant={200}
              />
            </div>
          </div>
          <div>
            <Typography
              label={"Total Purchaser"}
              type="p"
              FontSize="xs"
              color="primary"
              variant={200}
            />
            <div className="text-right">
              <Typography
                label={
                  usersOverview &&
                  usersOverview[usersOverview.length - 1]?.purchasers
                }
                type="p"
                FontSize="base"
                classname="font-bold "
                color="primary"
                variant={200}
              />
            </div>
          </div>
          <div>
            <Typography
              label={"Total Provider"}
              type="p"
              FontSize="xs"
              color="primary"
              variant={200}
            />
            <div className="text-right">
              <Typography
                label={
                  usersOverview &&
                  usersOverview[usersOverview.length - 1]?.providers
                }
                type="p"
                FontSize="base"
                classname="font-bold "
                color="primary"
                variant={200}
              />
            </div>
          </div>
          <div>
            <Typography
              label={"Total Provider as CP"}
              type="p"
              FontSize="xs"
              color="primary"
              variant={200}
            />
            <div className="text-right">
              <Typography
                label={
                  usersOverview &&
                  usersOverview[usersOverview.length - 1]?.provider_as_cp
                }
                type="p"
                FontSize="base"
                classname="font-bold "
                color="primary"
                variant={200}
              />
            </div>
          </div>
          <div>
            <Typography
              label={"Total Provider as IP"}
              type="p"
              FontSize="xs"
              color="primary"
              variant={200}
            />
            <div className="text-right">
              <Typography
                label={
                  usersOverview &&
                  usersOverview[usersOverview.length - 1]?.provider_as_ip
                }
                type="p"
                FontSize="base"
                classname="font-bold "
                color="primary"
                variant={200}
              />
            </div>
          </div>
          <div>
            <Typography
              label={"Total No role"}
              type="p"
              FontSize="xs"
              color="primary"
              variant={200}
            />
            <div className="text-right">
              <Typography
                label={
                  usersOverview &&
                  usersOverview[usersOverview.length - 1]?.no_role
                }
                type="p"
                FontSize="base"
                classname="font-bold "
                color="primary"
                variant={200}
              />
            </div>
          </div>
        </div>
      </div>

      <ComposedChartMolecule
        data={usersOverviewSliced || []}
        datakey={[
          { name: "Admin", data: "admins", color: "#0166B1" },
          { name: "Purchasers", data: "purchasers", color: "#fb6f92" },
          { name: "Providers", data: "providers", color: "#84d087" },
          {
            name: "Provider as IP",
            data: "provider_as_ip",
            color: "#d8ac21",
          },
          {
            name: "Provider as CP",
            data: "provider_as_cp",
            color: "#70c9f1",
          },
          {
            name: "No Role",
            data: "no_role",
            color: "#707291",
          },
          {
            line: true,
            name: "Total Users",
            data: "totalusers",
            color: "#723A85",
          },
        ]}
      />
    </div>
  );
};
export default UserRoleOverView;
