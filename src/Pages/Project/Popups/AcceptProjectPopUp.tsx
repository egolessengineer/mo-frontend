import { CheckBox, CloseHamBurger } from "../../../Assets/SVG";
import { Button, Typography } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";
const AcceptProjectPopUp = ({ close, open }: any) => {
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
          <div className="m-5 py-5 pl-5 pr-[10px] shadow-navbar border-[1px] border-text-gray-50 flex space-x-2 ">
            <div>
              <CheckBox />
            </div>
            <Typography
              label={
                "I acknowledge that if the milestone is not completed within the specified timeline, Success Bonus will be allocated to M.O. and  to the purchaser."
              }
              color="priamry"
              variant={300}
              classname="font-medium "
              FontSize="sm"
              type="p"
            />
          </div>
          <div className="flex justify-between px-5 pb-5">
            <div className="w-[100px]">
              <Button
                label="Cancel"
                size="small"
                color="secondary"
                variant="Transparent"
                onClick={close}
              />
            </div>
            <div className="w-[142px]">
              <Button label="Accept Project" size="small" />
            </div>
          </div>
        </>
      }
      PanelPosition={""}
      open={open}
    />
  );
};

export default AcceptProjectPopUp;
