import { SucessAssign } from "../../../Assets/SVG";
import { Button, Typography } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";

const SucessFullNftCreatePopup = ({ close, open }: any) => {
  return (
    <ModalAtom
      Title={""}
      description={
        <>
          <div className="flex flex-col items-center justify-center mt-[10px]">
            <SucessAssign />
            <Typography
              label={"NFT Sent!"}
              type="p"
              FontSize="5xl"
              classname="text-text-sucess-100 "
            />
            <div className="flex space-x-1 mt-5">
              <Typography
                label={"NFT ID:"}
                classname="font-medium "
                FontSize="base"
                type="p"
              />
              <Typography label={"17386348737"} FontSize="sm" type="p" />
              <Button
                label=""
                variant="line"
                icon={<img src="/Assets/ContentCopy.svg" />}
              />
            </div>
          </div>
          <div className="flex justify-end  p-5">
            <div className="w-[100px]">
              <Button label="Close" size="small" onClick={close} />
            </div>
          </div>
        </>
      }
      PanelPosition={"w-[464px] "}
      open={open}
    />
  );
};

export default SucessFullNftCreatePopup;
