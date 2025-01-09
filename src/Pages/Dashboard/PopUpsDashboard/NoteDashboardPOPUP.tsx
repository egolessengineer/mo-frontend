import { Button, Typography } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";

const NoteDashboardPOPUP = ({ open, close }: any) => {
  return (
    <ModalAtom
      Title={""}
      description={
        <>
          {" "}
          <div className="flex gap-x-[2px] ">
            <Typography
              FontSize="base"
              color="primary"
              variant={200}
              label="Note:"
              type="p"
              classname="font-bold   "
            />

            <Typography
              FontSize="base"
              color="primary"
              variant={200}
              label="Please make sure that you have the necessary balance of USDC hts, or HBAR in your connected wallet to proceed with this project. Our platform does not support fiat currency transactions."
              type="p"
            />
          </div>
          <div className="flex justify-end mt-[20px]">
            <div
              className="
w-[100px]"
            >
              <Button
                label="Continue"
                size="small"
                onClick={close}
                className="outline-none "
              />
            </div>
          </div>
        </>
      }
      PanelPosition={"p-5 lg:w-[783px] "}
      open={open}
    />
  );
};
export default NoteDashboardPOPUP;
