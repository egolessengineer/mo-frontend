import { CloseHamBurger } from "../../../Assets/SVG";
import { Button, Typography } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";
const ProposalPopup = () => {
  return (
    <ModalAtom
      Title={
        <div className="bg-primary-100 rounded-t-[5px] px-5 py-[15px] flex justify-between">
          <Typography
            label={" Proposal "}
            classname="text-white font-bold "
            FontSize="base"
            type="p"
          />

          <div className="cursor-pointer" onClick={close}>
            <CloseHamBurger width={"15"} color={"white"} />
          </div>
        </div>
      }
      description={
        <>
          <div className="bg-white p-5 m-5 flex justify-between shadow-navbar rounded-[5px]">
            <div className="flex flex-col space-x-[10px]">
              <div className="">
                <Typography
                  color="primary"
                  variant={200}
                  classname="font-bold"
                  FontSize="base"
                  type="p"
                  label={"Project"}
                />{" "}
                <Typography
                  color="primary"
                  variant={300}
                  FontSize="sm"
                  type="p"
                  label={"Fitness app UX/UI design project"}
                />
              </div>
              <div>
                <Typography
                  color="primary"
                  variant={200}
                  classname="font-bold"
                  FontSize="base"
                  type="p"
                  label={"Milestones"}
                />{" "}
                <Typography
                  color="primary"
                  variant={300}
                  FontSize="sm"
                  type="p"
                  label={"05"}
                />
              </div>
              <div>
                <Typography
                  color="primary"
                  variant={200}
                  classname="font-bold"
                  FontSize="base"
                  type="p"
                  label={"Project Fund"}
                />{" "}
                <Typography
                  color="primary"
                  variant={300}
                  FontSize="sm"
                  type="p"
                  label={"500 $"}
                />
              </div>
              <div className="pt-[10px] flex space-x-1">
                <Typography
                  label={"Note: "}
                  classname="text-text-danger-100 font-bold "
                  type="p"
                  FontSize="sm"
                />
                <Typography
                  label={"Success Bonus and penalties have been included."}
                  classname="text-text-danger-100 "
                  type="p"
                  FontSize="sm"
                />
              </div>
            </div>
            <div className="flex flex-col space-x-[10px] ">
              <div>
                <Typography
                  color="primary"
                  variant={200}
                  classname="font-bold"
                  FontSize="base"
                  type="p"
                  label={"Provider"}
                />{" "}
                <Typography
                  color="primary"
                  variant={300}
                  FontSize="sm"
                  type="p"
                  label={"Jenny Miles"}
                />
              </div>
              <div>
                <Typography
                  color="primary"
                  variant={200}
                  classname="font-bold"
                  FontSize="base"
                  type="p"
                  label={"Duration"}
                />{" "}
                <Typography
                  color="primary"
                  variant={300}
                  FontSize="sm"
                  type="p"
                  label={"1 Year"}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mb-5 mx-5">
            <div className="w-[128px]">
              <Button
                label="View Project"
                size="small"
                className="outline-none "
              />
            </div>
          </div>
        </>
      }
      PanelPosition={"shadow-popUps lg:w-[740px]"}
      open={open}
    />
  );
};

export default ProposalPopup;
