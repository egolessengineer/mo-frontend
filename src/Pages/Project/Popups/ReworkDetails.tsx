import React from "react";
import {
  Button,
  Typography,
} from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";
const ReworkDetailsPopup = ({ open, close, reworkDetails }: any) => {
  return (
    <ModalAtom
      Title={
        <div className="bg-primary-100 flex justify-between px-[20px] py-[15px] rounded-t-[5px]">
          <Typography
            label={"Rework Details"}
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
          {" "}
          <div className="shadow-navbar border-[1px] border-text-gray-50 rounded-[5px] m-5">
            <div className="px-4 py-[10px]">
              <div className="py-[10px]">
                <div className="flex flex-col mx-auto w-full">
                  <Typography
                    label={"Attached File"}
                    color="primary"
                    variant={200}
                    classname="font-bold "
                    FontSize="sm"
                    type="p"
                  />
                  {reworkDetails?.reworkDocs &&
                    reworkDetails?.reworkDocs.length > 0 ?
                    reworkDetails?.reworkDocs.map(
                      (element: any, idx: any) => {
                        return (
                          <React.Fragment key={element?.url + idx}>
                            <div className="flex flex-row items-center justify-between py-[5px]">
                              <Typography
                                label={element?.fileName}
                                type="p"
                                FontSize="sm"
                                color="primary"
                                variant={200}
                              />
                              <a
                                href={element?.url}
                                download
                                target="_blank"
                              >
                                <Button
                                  label=""
                                  icon={
                                    <img
                                      src="/Assets/Download.svg"
                                      alt=""
                                    />
                                  }
                                  variant="line"
                                  size="small"
                                />
                              </a>
                            </div>
                          </React.Fragment>
                        );
                      }
                    ) :
                    <Typography
                      label={"No Document Uploaded"}
                      color="primary"
                      variant={200}
                      classname=""
                      FontSize="sm"
                      type="p"
                    />
                  }
                </div>
              </div>
              <div className="mt-[15px]">
                <Typography
                  label={"Comments"}
                  color="primary"
                  variant={200}
                  classname="font-bold "
                  FontSize="sm"
                  type="p"
                />
                <Typography
                  label={reworkDetails?.reworkComment || '-'}
                  color="primary"
                  variant={200}
                  classname="font-bold "
                  FontSize="sm"
                  type="p"
                />

              </div>
            </div>
          </div>
          <div className="flex justify-end p-5">
            <div className="w-[100px]">
              <Button
                label="Close"
                size="small"
                color="secondary"
                variant="Transparent"
                onClick={() => {
                  close("");
                }}
              />
            </div>
          </div>
        </>
      }
      PanelPosition={"w-[643px]"}
      open={open}
    />
  );
};

export default ReworkDetailsPopup;
