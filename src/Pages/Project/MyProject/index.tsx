import { useEffect, useState } from "react";
import { Button } from "../../../Components/Atoms";
import { Structure } from "../../../Components/Molecules";
import CustomFilterDropdown from "../../../Components/Molecules/Structure/CustomFiterDropdown";
import { handleCustomError } from "../../../Utils/helper";
import { GET_PROJECT } from "../../../sevices";
import Card from "../../Dashboard/Card";

const MyProject = () => {
  const [projectData, setProjectData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState({
    sortBy: "asc",
    filterBy: "",
  });
  async function handleGetProject(name: string) {
    try {
      setIsLoading(true);
      let Objparam = {
        filterBy: name,
        sortBy: filter.sortBy,
      };
      let param = "?" + new URLSearchParams(Objparam).toString();
      let res = await GET_PROJECT(param);
      let modifyRes = res?.data && res?.data?.allProjects && res?.data?.allProjects?.map((item: any) => ({ ...item, type: name }));
      setProjectData([...modifyRes]);
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleGetProject("ASSIGNED");
  }, [filter]);
  return (
    <>
      <Structure
        mainSection={<Card projectData={projectData} isLoading={isLoading} />}
        Heading={"My Project"}
        optionText={<Button label="All Projects" variant="line" size="small" />}
        Buttons={
          <div className="flex space-x-[26px] pb-[5px]">
            <div className="relative">
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
          </div>
        }
      />
    </>
  );
};

export default MyProject;
