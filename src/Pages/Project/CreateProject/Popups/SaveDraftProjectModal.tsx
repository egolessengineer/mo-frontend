import { UnAssignSvg } from "../../../../Assets/SVG";
import { Button, Typography } from "../../../../Components/Atoms";
import { ModalAtom } from "../../../../Components/Molecules";

const SaveDraftProjectModal = ({
  open,
  close,
  saveDraft,
  project_title,
  project_Duration,
  Project_Royalties,
}: any) => {
  return (
    <>
      <ModalAtom
        Title={""}
        description={
          <>
            <div className="flex flex-col items-center space-y-[10px]">
              <UnAssignSvg />
              <Typography
                label="Attention"
                type="h1"
                classname="text-text-warning-200  leading-[44px] "
                style={{ fontSize: "36px" }}
              />
              <Typography
                label="Project will be save in Unassigned Projects"
                type="h1"
                classname="leading-8  "
                color="primary"
                variant={200}
                FontSize="3xl"
              />
              <div></div>
              <div className=" lg:w-[525px] w-full shadow-navbar rounded-[5px] ">
                <div className="flex   flex-row  p-5 justify-between">
                  <div className=" space-y-[20px]">
                    <div>
                      <Typography
                        label="Project"
                        type="p"
                        color="primary"
                        variant={200}
                        FontSize="base"
                        classname="font-medium "
                      />
                      <Typography
                        label={project_title}
                        type="p"
                        FontSize="sm"
                        color="primary"
                        variant={300}
                      />
                    </div>

                    <div className="">
                      <Typography
                        label="Duration"
                        type="p"
                        color="primary"
                        variant={200}
                        FontSize="base"
                        classname="font-medium "
                      />
                      <Typography
                        label={project_Duration}
                        type="p"
                        FontSize="sm"
                        color="primary"
                        variant={300}
                      />
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className=" flex justify-between p-5 space-x-1 lg:space-x-[0px]">
              <div className="md:w-[221px] w-[250px] ">
                <Button
                  label="Save Project in Unassigned"
                  onClick={() => {
                    saveDraft();
                    close();
                  }}
                  variant="Transparent"
                  color="secondary"
                  size="small"
                />
              </div>
              <div className="w-[155px] md:w-[149px]">
                <Button label="Assign Provider" onClick={close} size="small" />
              </div>
            </div>
          </>
        }
        PanelPosition={
          "lg:w-[565px] lg:h-[510px] w-[380px] lg:justify-center  shadow-popUps "
        }
        open={open}
        close={close}
      />
    </>
  );
};

export default SaveDraftProjectModal;
