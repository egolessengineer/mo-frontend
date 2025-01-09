import { SucessAssign } from "../../../Assets/SVG";
import { Button, Typography } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";

const RoyalityRelease = ({ open, close }: any) => {
  return (
    <ModalAtom
      Title={""}
      description={
        <div className="p-5">
          <div className="flex flex-col items-center gap-5">
            <SucessAssign />
            <Typography
              label={"Fund Released!"}
              style={{ fontSize: "36px" }}
              classname="text-text-sucess-100 "
              type="p"
            />
            <div>
              <div className="flex gap-[5px]">
                <Typography
                  label={"Released to:"}
                  type="p"
                  color="primary"
                  variant={200}
                  FontSize="base"
                />
                <Typography
                  label={"Maria Gracia"}
                  type="p"
                  color="primary"
                  variant={300}
                  FontSize="sm"
                />
              </div>
              <div className="flex gap-y-[5px]">
                <Typography
                  label={"Transaction Number:"}
                  type="p"
                  color="primary"
                  variant={200}
                  FontSize="base"
                  classname="font-medium "
                />
                <Typography
                  label={"17386348737"}
                  type="p"
                  color="primary"
                  variant={300}
                  FontSize="sm"
                  classname="mt-[4px] "
                />
                <Button
                  variant="line"
                  label=""
                  icon={<img src="/Assets/ContentCopy.svg" />}
                />
              </div>
            </div>
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
          <div className="flex justify-end mt-5">
            <div className="w-[100px]">
              <Button label="Close" onClick={close} size="small" />
            </div>
          </div>
        </div>
      }
      PanelPosition={"w-[565px]"}
      open={open}
    />
  );
};

export default RoyalityRelease;
