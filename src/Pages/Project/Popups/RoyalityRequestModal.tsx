import { Button, Typography } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";

const RoyalityRequestModal = ({ open, close, nextpop }: any) => {
  const HandlePopup = () => {
    close();
    nextpop();
  };
  return (
    <ModalAtom
      Title={
        <div className="flex justify-between bg-primary-100 rounded-t-[5px] px-5 py-4">
          <Typography
            label={"Success Bonus Requested"}
            type="p"
            FontSize="base"
            classname="font-bold text-white "
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
        <div className="p-5">
          <div className="flex flex-col items-center gap-5">
            <Typography
              label={"Fund Requested"}
              classname="font-bold text-text-HeadLine-100  "
              type="p"
              style={{ fontSize: "36px" }}
            />

            <Typography
              label={"Maria Gracia Request Fund for milestone M2"}
              color="primary"
              variant={300}
              type="p"
              FontSize="base"
            />
          </div>
          <div className="shadow-navbar rounded-[5px] p-5 mt-5">
            <div className="flex justify-between">
              <div className="flex flex-col gap-[10px] ">
                <div>
                  <Typography
                    label={"Project"}
                    type="p"
                    color="primary"
                    variant={200}
                    classname="font-medium "
                    FontSize="base"
                  />
                  <Typography
                    label={"Healthify App UX/UI"}
                    type="p"
                    color="primary"
                    variant={200}
                    FontSize="sm"
                  />
                </div>{" "}
                <div>
                  <Typography
                    label={"Total Penalty (5%)"}
                    type="p"
                    color="primary"
                    variant={200}
                    classname="font-medium "
                    FontSize="base"
                  />
                  <Typography
                    label={"20 $"}
                    type="p"
                    classname="text-text-sucess-100 "
                    FontSize="sm"
                  />
                </div>{" "}
                <div>
                  <Typography
                    label={"No. of Revision"}
                    type="p"
                    color="primary"
                    variant={200}
                    classname="font-medium "
                    FontSize="base"
                  />
                  <Typography
                    label={"1"}
                    type="p"
                    color="primary"
                    variant={200}
                    FontSize="sm"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[10px] text-right ">
                <div>
                  <Typography
                    label={"Assigned Milestone"}
                    type="p"
                    color="primary"
                    variant={200}
                    classname="font-medium "
                    FontSize="base"
                  />
                  <Typography
                    label={"User Research and Requirements Gathering"}
                    type="p"
                    color="primary"
                    variant={200}
                    FontSize="sm"
                  />
                </div>{" "}
                <div>
                  <Typography
                    label={"Amount Requested"}
                    type="p"
                    color="primary"
                    variant={200}
                    classname="font-medium "
                    FontSize="base"
                  />
                  <Typography
                    label={"20 $"}
                    type="p"
                    classname="primary"
                    variant={300}
                    FontSize="sm"
                  />
                </div>{" "}
                <div>
                  <Typography
                    label={"Milestone closed on"}
                    type="p"
                    color="primary"
                    variant={200}
                    classname="font-medium "
                    FontSize="base"
                  />
                  <Typography
                    label={"7 Aug 2023 | 20:23"}
                    type="p"
                    color="primary"
                    variant={200}
                    FontSize="sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-5 mt-5">
            <div>
              <Button
                label="Close"
                size="small"
                variant="line"
                className="text-primary-300 "
                onClick={close}
              />
            </div>
            <div className="w-[131px]">
              <Button
                label="Go to Project"
                size="small"
                variant="Transparent"
                color="secondary"
              />
            </div>
            <div className="w-[134px]">
              <Button label="Release Fund" size="small" onClick={HandlePopup} />
            </div>
          </div>
        </div>
      }
      PanelPosition={"w-[565px]"}
      open={open}
    />
  );
};

export default RoyalityRequestModal;
