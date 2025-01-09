import { useState } from "react";
import { Button, Typography } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";

const CreateSubMileStone = ({ open, close, nextpop }: any) => {
  const [SubmilestoneDetail, setSubmilestoneDetail] = useState(false);
  const CreateButton = () => {
    close();
    nextpop();
  };

  return (
    <>
      <ModalAtom
        Title={
          <div className="bg-primary-100 flex justify-between px-[20px] py-[15px] rounded-t-[5px] ">
            <Typography
              label={"Create Sub-MileStone"}
              type="p"
              classname="font-bold text-text-white-50 "
              FontSize="base"
            />
            <Button
              variant="line"
              label=""
              onClick={close}
              icon={<img src="/Assets/Close.svg" />}
            />
          </div>
        }
        description={
          <>
            <div className="shadow-navbar m-5 rounded-[5px]">
              <div className="px-5 pt-5 pb-[10px] border-b-[1px] border-text-gray-50 ">
                <Typography
                  label={"Milestone 2"}
                  type="p"
                  classname="font-bold  text-text-HeadLine-100 "
                  FontSize="base"
                />
              </div>
              <div className="px-5 pb-5 pt-[10px] flex flex-col gap-y-[10px]">
                <div>
                  <Typography
                    label={"Title"}
                    color="primary"
                    variant={200}
                    classname="font-bold "
                    FontSize="sm"
                    type="p"
                  />
                  <Typography
                    label={"Ideation"}
                    color="primary"
                    variant={300}
                    FontSize="sm"
                    type="p"
                  />
                </div>
                <div>
                  <Typography
                    label={"Description"}
                    color="primary"
                    variant={200}
                    classname="font-bold "
                    FontSize="sm"
                    type="p"
                  />
                  <Typography
                    label={
                      "Focus is on understanding the target audience and gathering requirements for the fitness app."
                    }
                    color="primary"
                    variant={300}
                    FontSize="sm"
                    type="p"
                  />
                </div>
                <div>
                  <Typography
                    label={"Requirements"}
                    color="primary"
                    variant={200}
                    classname="font-bold "
                    FontSize="sm"
                    type="p"
                  />
                  <ol className="list-decimal text-sm text-text-primary-300 ml-5">
                    <li>
                      Conduct user interviews and surveys to gather insights
                      about user preferences, pain points, and expectations
                      related to fitness apps.
                    </li>
                    <li>
                      Create user personas and user journey maps based on the
                      collected data.
                    </li>
                    <li>
                      Define the key features and functionalities that should be
                      incorporated into the app based on user needs.
                    </li>
                    <li>
                      Document the research findings and requirements in a clear
                      and comprehensive manner.
                    </li>
                  </ol>
                </div>
                <div className="flex justify-between">
                  <div>
                    <Typography
                      label={"Fund Allocated"}
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      FontSize="sm"
                      type="p"
                    />
                    <Typography
                      label={"100 $"}
                      color="primary"
                      variant={300}
                      FontSize="sm"
                      type="p"
                    />
                  </div>
                  <div>
                    <Typography
                      label={"Revision Count"}
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      FontSize="sm"
                      type="p"
                    />
                    <Typography
                      label={"0/3"}
                      color="primary"
                      variant={300}
                      FontSize="sm"
                      type="p"
                    />
                  </div>
                  <div>
                    <Typography
                      label={"Start Date "}
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      FontSize="sm"
                      type="p"
                    />
                    <Typography
                      label={"June 21, 2023"}
                      color="primary"
                      variant={300}
                      FontSize="sm"
                      type="p"
                    />
                  </div>
                  <div>
                    <Typography
                      label={"Completion Date"}
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      FontSize="sm"
                      type="p"
                    />
                    <Typography
                      label={"June 21, 2023"}
                      color="primary"
                      variant={300}
                      FontSize="sm"
                      type="p"
                    />
                  </div>
                </div>
                <div>
                  <Typography
                    label={"Acceptance criteria"}
                    color="primary"
                    variant={200}
                    FontSize="sm"
                    classname="font-bold "
                    type="p"
                  />
                  <Typography
                    type="p"
                    label={
                      "For completion of milestone freelancer must transfer all assets related to research."
                    }
                    color="primary"
                    variant={300}
                    FontSize="sm"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-center mb-5">
              <div className="w-[250px]">
                <Button
                  label="Create Sub-Milestones"
                  size="small"
                  onClick={CreateButton}
                />
              </div>
            </div>
          </>
        }
        PanelPosition={" "}
        open={open}
      />
    </>
  );
};

export default CreateSubMileStone;
