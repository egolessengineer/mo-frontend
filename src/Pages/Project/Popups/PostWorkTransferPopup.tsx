import { useState } from "react";
import { Button, Typography } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";

const PostWorkTransferPopup = ({ open, close, nextpop }: any) => {
  const [Transfer, setTransfer] = useState("Transfer Mo");
  const handleClose = () => {
    close();
    nextpop();
  };
  return (
    <ModalAtom
      Title={
        <div className="flex justify-between bg-primary-100 rounded-t-[5px] px-5 py-4">
          <Typography
            label={"Post-Work Transfer Option"}
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
        <>
          <div className="p-5">
            <div className="shadow-navbar p-5 rounded-[5px]">
              <Typography
                label={
                  "If Purchaser decides not to accept the work, would you like to:"
                }
                FontSize="sm"
                color="primary"
                variant={200}
                type="p"
              />
              <div className="mt-5">
                <Typography
                  label={"Please select you preferences:"}
                  FontSize="sm"
                  color="primary"
                  variant={200}
                  type="p"
                  classname="font-bold "
                />
                <div className="flex gap-[10px] mt-5">
                  <Button
                    icon={
                      <div
                        className={`w-[20px] h-[20px] rounded-full border-[2px] flex justify-center items-center mt-[-9px] mr-[-5px] ${Transfer === "Transfer MO" && "border-primary-300"
                          }`}
                      >
                        <div
                          className={`w-[10px] h-[10px] rounded-full ${Transfer === "Transfer MO" && "bg-primary-300"
                            } `}
                        ></div>
                      </div>
                    }
                    variant="line"
                    label=""
                    onClick={() => {
                      setTransfer("Transfer MO");
                    }}
                  />
                  <Typography
                    label={"Transfer it to The MO for potential resale"}
                    color="primary"
                    variant={200}
                    FontSize="sm"
                    type="p"
                  />
                </div>
                <div className="flex gap-[10px] mt-5">
                  <Button
                    icon={
                      <div
                        className={`w-[20px] h-[20px] rounded-full border-[2px] flex justify-center items-center mt-[-9px] mr-[-5px] ${Transfer === "Transfer Own" && "border-primary-300"
                          }`}
                      >
                        <div
                          className={`w-[10px] h-[10px] rounded-full ${Transfer === "Transfer Own" && "bg-primary-300"
                            } `}
                        ></div>
                      </div>
                    }
                    variant="line"
                    onClick={() => {
                      setTransfer("Transfer Own");
                    }}
                    label=""
                  />

                  <Typography
                    label={"Keep it in your own wallet"}
                    color="primary"
                    variant={200}
                    FontSize="sm"
                    type="p"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-[100px] mt-5">
                <Button label="Continue" size="small" onClick={handleClose} />
              </div>
            </div>
          </div>
        </>
      }
      PanelPosition={"lg:w-[740px]"}
      open={open}
    />
  );
};

export default PostWorkTransferPopup;
