import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "../../Components/Atoms";
import { Structure } from "../../Components/Molecules";
import { AuthState } from "../../Context/auth";
import { handleCustomError } from "../../Utils/helper";
import { GET_PROJECT } from "../../sevices";
import Card from "./Card";
import NoteDashboardPOPUP from "./PopUpsDashboard/NoteDashboardPOPUP";
import ProposalPopUp from "./PopUpsDashboard/ProposalPopUp";
import SucessProjectAcceptedPOPUP from "./PopUpsDashboard/SucessProjectAcceptedPOPUP";
import ProjectSummary from "./ProjectSummary";
import CustomFilterDropdown from "../../Components/Molecules/Structure/CustomFiterDropdown";

const Dashboard = () => {
  let Navigate = useNavigate();
  const [activeAssign, setactiveAssign] = useState<string>("Assign");
  const [DashboardPop, setDashboardPop] = useState(false);
  const [ProjectAccept, setProjectAccept] = useState(false);
  const [Proposal, setProposal] = useState(false);
  const [projectData, setProjectData] = useState<any[]>([]);
  const [ProjectSummeryStats, setProjectSummeryStats] = useState<any[]>([]);
  const [ProjectSummeryTasks, setProjectSummeryTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState({
    sortBy: "asc",
    filterBy: "",
  });
  const { user } = AuthState();
  const { role } = user || {};

  const closeProposal = () => {
    setProposal(false);
  };

  const handleAssign = (activeName: string) => {
    // setProjectAccept(true);
    setactiveAssign(activeName);
  };
  const close = () => {
    setDashboardPop(false);
  };
  const closeProjectAccept = () => {
    setProjectAccept(false);
  };

  async function handleGetProject(name: string) {
    try {
      setIsLoading(true);
      let Objparam = {
        filterBy: name,
        sortBy: filter.sortBy
      };
      let param = "?" + new URLSearchParams(Objparam).toString();
      let res = await GET_PROJECT(param);
      let modifyRes = res?.data && res?.data?.allProjects && res?.data?.allProjects?.map((item: any) => ({ ...item, type: name }));
      setProjectData([...modifyRes]);
      modifyRes && modifyRes.length <= 0 && name === "ASSIGNED" && setDashboardPop(true)
      setProjectSummeryStats(res?.data?.projectStatusCount || []);
      setProjectSummeryTasks(res?.data?.tasks || []);
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleGetProject(activeAssign !== "UnAssign" ? "ASSIGNED" :"UNASSIGNED");
  }, [filter]);

  return (
    <>
      {/* //*POPUPs */}
      <>
        {/* //! 1 Accepted Project pop up */}
        {ProjectAccept && (
          <SucessProjectAcceptedPOPUP
            OpenInfoPOP={ProjectAccept}
            POPInfoClose={closeProjectAccept}
          />
        )}
        {/* //! 2 DashbordInfoPOPUP */}
        {DashboardPop && (
          <NoteDashboardPOPUP open={DashboardPop} close={close} />
        )}
        {/* //! 3 proposal pop up */}
        {Proposal && <ProposalPopUp open={Proposal} close={closeProposal} />}
      </>
      <Structure
        Heading="Dashboard"
        optionText={
          <>
            {role === "PURCHASER" && (
              <>
                {" "}
                <Button
                  variant="line"
                  label=" Assigned Projects"
                  onClick={() => {
                    if (activeAssign !== "Assign") {
                      handleGetProject("ASSIGNED");
                      handleAssign("Assign");
                    }
                  }}
                  className={`tracking-widest pl-[6px] font-bold text-sm leading-5  ${activeAssign === "Assign"
                    ? "border-b-4 border-text-secondary-50 text-text-secondary-50"
                    : "text-text-primary-300"
                    } `}
                  size="small"
                />
                <Button
                  size="small"
                  variant="line"
                  label="Unassigned Projects"
                  onClick={() => {
                    if (activeAssign !== "UnAssign") {
                      handleGetProject("UNASSIGNED");
                      handleAssign("UnAssign");
                    }
                  }}
                  className={`tracking-widest pl-[6px] font-bold text-sm leading-5  ${activeAssign === "UnAssign"
                    ? "border-b-4 border-text-secondary-50 text-text-secondary-50"
                    : "text-text-primary-300"
                    } `}
                />
              </>
            )}
          </>
        }
        TopButton={
          <div className="w-[171px]">
            {role === "PURCHASER" && (
              <Button
                variant="standard"
                color="primary"
                label="Create New Project"
                size="small"
                onClick={() => {
                  Navigate("/create-project");
                }}
              />
            )}
          </div>
        }
        mainSection={
          <>
            <Card projectData={projectData} isLoading={isLoading} refetchData={() => handleGetProject(activeAssign === "Assign" ? "ASSIGNED" : "UNASSIGNED")} user={user} />
          </>
        }

        sideComponetHeading={
          <>
            <Typography
              label="Project Summary"
              color="primary"
              variant={300}
              FontSize="sm"
              classname="font-bold leading-5 pb-[3px] "
              type="h2"
            />
          </>
        }
        sideComponent={
          <>
            <ProjectSummary activeAssign={activeAssign} ProjectSummeryStats={ProjectSummeryStats} ProjectSummeryTasks={ProjectSummeryTasks} />
          </>
        }
        Buttons={
          <>
            <div className="relative mb-1">
              <CustomFilterDropdown
                Title="Sort By"
                value={filter.sortBy}
                onChange={(selected) => {
                  setFilter({
                    ...filter,
                    sortBy: selected.toString(),
                  });
                }}
                options={[{ key: "asc", value: 'Ascending' }, { key: "desc", value: 'Descending' }]}
                icon={<img src="/Assets/Sort.svg" alt="" />}
                iconPosition="left"
              />
            </div>
          </>
        }
      />
    </>
  );
};

export default Dashboard;
