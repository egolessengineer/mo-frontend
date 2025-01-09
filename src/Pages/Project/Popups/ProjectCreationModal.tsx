import { SucessAssign } from "../../../Assets/SVG";
import { Button, Typography } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";

const ProjectCreationModal = ({ open, close }: any) => {
  return (
    <ModalAtom
      Title={""}
      description={
        <>
          {" "}
          <div className="flex flex-col items-center space-y-[10px] ">
            <SucessAssign />
            <Typography
              label="Project Sent"
              type="h1"
              classname="text-text-sucess-100 text-[36px] leading-[44px] "
            />
            <Typography
              label=" Your project has been sent to provider"
              type="h1"
              classname="leading-8  "
              color="primary"
              variant={200}
              FontSize="3xl"
            />
            <div></div>
            <div className=" lg:w-[525px] lg:h-[221px] shadow-navbar rounded-[5px] ">
              <div className="flex p-5 justify-between">
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
                      label="Healthify App UX/UI"
                      type="p"
                      FontSize="sm"
                      color="primary"
                      variant={300}
                    />
                  </div>
                  <div>
                    <Typography
                      label="Provider"
                      type="p"
                      color="primary"
                      variant={200}
                      FontSize="base"
                      classname="font-medium "
                    />
                    <Typography
                      label="Jenny Miles"
                      type="p"
                      FontSize="sm"
                      color="primary"
                      variant={300}
                    />
                  </div>
                  <div>
                    <Typography
                      label="Duration"
                      type="p"
                      color="primary"
                      variant={200}
                      FontSize="base"
                      classname="font-medium "
                    />
                    <Typography
                      label="6 Months"
                      type="p"
                      FontSize="sm"
                      color="primary"
                      variant={300}
                    />
                  </div>
                </div>
                <div className="space-y-[20px] text-right ">
                  <div className="pl-[20px] lg:pl-[0px]">
                    <Typography
                      label="Project ID"
                      type="p"
                      color="primary"
                      variant={200}
                      FontSize="base"
                      classname="font-medium "
                    />
                    <Typography
                      label="6541365"
                      type="p"
                      FontSize="sm"
                      color="primary"
                      variant={300}
                    />
                  </div>
                  <div className="pl-[20px] lg:pl-[0px]">
                    <Typography
                      label="Royalties"
                      type="p"
                      color="primary"
                      variant={200}
                      FontSize="base"
                      classname="font-medium "
                    />
                    <Typography
                      label="10%"
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
          {/* //!button */}
          <div className=" flex lg:justify-end justify-center pt-[20px]">
            <div className="w-[176px]">
              <Button
                label="View Project Details"
                onClick={close}
                size="small"
              />
            </div>
          </div>
        </>
      }
      PanelPosition={"lg:w-[565px] lg:h-[577px] w-[380px] p-5 shadow-popUps"}
      open={open}
    />
  );
};

export default ProjectCreationModal;
