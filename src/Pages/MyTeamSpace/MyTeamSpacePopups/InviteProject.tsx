import _debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import {
  Button,
  Textfield,
  Typography
} from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";
import { handleCustomError } from "../../../Utils/helper";
import { GET_PROJECT } from "../../../sevices";

const InviteToProject = ({ open, close, hanldeInviteToProject }: any) => {
  const [allProject, setAllProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serachval , setSearchVal] = useState("")

  async function getAllprojects(name: string) {
    try {
      setIsLoading(true);
      let Objparam = {
        filterBy: name,
        sortBy : "asc"
      };
      let param = "?" + new URLSearchParams(Objparam).toString();
      let res = await GET_PROJECT(param);
      setAllProject(res?.data?.allProjects);
    } catch (error) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    function handleSerach(query:any) {
      const results = allProject?.filter((prj:any) =>prj.title.toLowerCase().includes(query.toLowerCase()));
      setAllProject(results)
    }
    let debouncedFunction = _debounce(handleSerach, 1000);

    if(serachval){
      debouncedFunction(serachval);
    }
    else{
        getAllprojects("ASSIGNED"); 
    }
    return () => {
      debouncedFunction.cancel();
    };
  }, [serachval]);


  return (
    <ModalAtom
      Title={
        <div className="flex justify-between bg-primary-100 rounded-t-[5px]  ">
          <Typography
            label="Invite to Project"
            type="h3"
            classname="font-bold text-white pt-[15px] pr-[20px] pb-[15px] pl-[20px] "
            FontSize="base"
          />
          <div className="mt-[12px] mr-[20px]">
            <Button
              variant="line"
              icon={<img src="/Assets/Close.svg" alt=""/>}
              label=""
              onClick={() => {
                close();
              }}
              size="small"
            />
          </div>
        </div>
      }
      description={
        <>
          {" "}
          <div className="lg:w-[350px] w-full  p-[20px]">
            <Textfield
              type="search"
              placeHolder="Search name"
              onChange={(e:any)=>{
                setSearchVal(e.target.value)
              }}
              value={serachval}
              rightIcon={
                <img
                  src="/Assets/Search.svg"
                  height="36px"
                  width="36px"
                  className="rounded-[5px] mt-[1.5px]"
                  alt=""
                />
              }
            />
          </div>
          <div className="px-5  pb-[6px]">
            <div className="border-b-[1px] border-text-gray-50">
              <Typography
                label="List of Projects"
                type="h2"
                color="primary"
                variant={200}
                classname="font-bold "
                FontSize="sm"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="lg:w-[750px] w-full h-[315px] mr-[20px] ml-[20px] mb-[20px] shadow-navbar rounded-[5px] overflow-auto">
              {isLoading ? (
                              <div className="text-center p-5">Loading...</div>
                            ) : allProject && allProject.length === 0 ? (
                              <div className="text-center p-5">No Data</div>
                            ) :
              allProject && allProject.map((element:any,index:any) => {
                return (
                  <div key={index} className="border-b-[1px] border-text-gray-50 pt-[10px] pb-[10px] pr-[20px] pl-[20px] flex justify-between">
                    
                    <div className="">
                      <Typography
                        label={element?.title}
                        color="primary"
                        variant={200}
                        FontSize="base"
                        classname="font-medium "
                        type="p"
                      />
                      <Typography
                        color="primary"
                        label={element?.category}
                        variant={200}
                        FontSize="xxs"
                        classname="font-medium "
                        type="p"
                      />
                    </div>
                    <div className="w-[100px]">
                      <Button
                        variant="Transparent"
                        color="secondary"
                        label="Invite"
                        size="small"
                        onClick={()=>{hanldeInviteToProject(element?.id)}}                        
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      }
      PanelPosition={"w-[50%]"}
      open={open}
    />
  );
};

export default InviteToProject;
