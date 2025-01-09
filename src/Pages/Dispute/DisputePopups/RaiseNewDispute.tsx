import { useEffect, useState } from "react";
import {
  Button,
  CheckBoxAtom,
  HelperText,
  Typography,
} from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";
import { handleCustomError } from "../../../Utils/helper";
import { GET_PROJECT } from "../../../sevices";

const RaiseNewDispute = ({ open, close, nextPopup, formik }: any) => {
  const [allProject, setAllProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const HandleClick = () => {
    close();
    nextPopup(1, true);
  };
  function handleChangeCheckBox(e: any, id: any) {
    let { checked } = e.target;
    if (checked) {
      formik.setFieldValue("projectId", id);
    } else {
      formik.setFieldValue("projectId", "");
    }
  }

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
    getAllprojects("ASSIGNED");
  }, []);

  return (
    <ModalAtom
      close={close}
      Title={
        <div className="bg-primary-100 flex justify-between px-[20px] py-[15px] rounded-t-[5px]">
          <Typography
            label={"Raise New Dispute"}
            type="p"
            classname="font-bold text-text-white-50 "
            FontSize="base"
          />
          <Button
            variant="line"
            label=""
            onClick={close}
            icon={<img src="/Assets/Close.svg" alt="" />}
          />
        </div>
      }
      description={
        <form onSubmit={formik.handleSubmit} className="p-5">
          <div className={`shadow-navbar rounded-[5px] overflow-y-auto ${allProject && allProject.length > 5? "h-[300px]":"h-fit"} `}>
            <div className="px-5 pt-5 pb-[10px] border-b-[1px] border-text-gray-50">
              <Typography
                label={"Select project to raise dispute"}
                FontSize="base"
                classname="font-bold text-text-HeadLine-100 "
                type="p"
              />
            </div>

            {isLoading ? (
              <div className="text-center p-5">Loading...</div>
            ) : allProject && allProject.length === 0 ? (
              <div className="text-center p-5">No Data</div>
            ) : (
              allProject &&
              allProject.map((element: any, idx: any) => {
                return (
                  <div
                    key={idx}
                    className="px-5 py-[10px] flex justify-between border-b-[1px] border-text-gray-50"
                  >
                    <div className="flex gap-[10px] w-[70%]">
                      <CheckBoxAtom
                        Name="project"
                        checked={formik.values.projectId === element?.id}
                        disabled={
                          formik.values.projectId &&
                          formik.values.projectId !== element?.id
                            ? true
                            : false
                        }
                        Onchange={(e: any) => {
                          handleChangeCheckBox(e, element?.id);
                        }}
                        label={
                          <div>
                            <Typography
                              label={"Project"}
                              color="primary"
                              variant={200}
                              classname="font-bold"
                              FontSize="sm"
                              type="p"
                            />
                            <Typography
                              label={element?.title}
                              color="primary"
                              variant={300}
                              classname="font-bold "
                              FontSize="sm"
                              type="p"
                            />
                          </div>
                        }
                      />
                    </div>
                    <div className="w-24">
                      <Typography
                        label={"Duration"}
                        color="primary"
                        variant={200}
                        classname="font-bold "
                        type="p"
                        FontSize="sm"
                      />
                      <Typography
                        label={element?.duration}
                        color="primary"
                        variant={300}
                        type="p"
                        FontSize="sm"
                      />
                    </div>
                    <div>
                      <Typography
                        label={"Project Fund"}
                        color="primary"
                        variant={200}
                        classname="font-bold "
                        type="p"
                        FontSize="sm"
                      />
                      <Typography
                        label={element?.funds}
                        color="primary"
                        variant={300}
                        type="p"
                        FontSize="sm"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {formik.touched.projectId && formik.errors.projectId && (
            <HelperText
              position="right"
              label={formik.errors.projectId}
              className="text-xxs "
              color="danger"
              icon={
                <img
                  src="/Assets/Danger.svg"
                  alt=""
                  className="pt-[6px] ml-[4px]"
                />
              }
            />
          )}
          <div className="flex justify-between mt-5">
            <div className="w-[100px]">
              <Button
                label="Cancel"
                size="small"
                variant="Transparent"
                color="secondary"
                onClick={close}
              />
            </div>
            <div className="w-[105px]">
              <Button
                type="submit"
                label="Continue"
                disable={
                  isLoading || (allProject && allProject.length === 0)
                    ? true
                    : false
                }
                size="small"
                onClick={() => {
                  formik.validateForm().then((errors: any) => {
                    if (!errors.hasOwnProperty("projectId")) {
                      HandleClick();
                    }
                  });
                }}
              />
            </div>
          </div>
        </form>
      }
      PanelPosition={`w-[868px]`}
      open={open}
    />
  );
};

export default RaiseNewDispute;
