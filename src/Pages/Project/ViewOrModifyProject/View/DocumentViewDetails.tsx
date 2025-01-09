import React, { useRef, useState } from "react";
import { Button, Typography } from "../../../../Components/Atoms";
import { getFileNameFromUrl } from "../../../../Utils/helper";

export const DocumentViewDetails = ({ viewProjectData }: any) => {
  const [stage, setstage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { Documents } = viewProjectData || [];

  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const result = Documents?.documentLinks?.reduce((acc: any, item: any) => {
    const existingEntry = acc.find((entry: any) => entry.type === item.type);
    if (existingEntry) {
      existingEntry.urls.push(item.url);
    } else {
      acc.push({ type: item.type, urls: [item.url] });
    }
    return acc;
  }, []);

  return (
    <div className="flex flex-col gap-5 mx-auto w-full">
      {result.length === 0 && (
        <div className="text-xl font-bold capitalize text-[#757575] h-full flex justify-center items-center">
          No Documents uploaded
        </div>
      )}
      {result?.map((element: any, idx: any) => {
        return (
          <React.Fragment key={idx}>
            <div className="  shadow-navbar  rounded-[5px]">
              <div className="border-b-[1px] border-text-primary-100  px-5 pt-5 pb-[10px] ">
                <Typography
                  label={element?.type}
                  type="h2"
                  classname="font-bold text-text-HeadLine-50 leading-6 "
                  FontSize="sm"
                />
              </div>
              {element?.urls.map((url: any, idx: any) => {
                return (
                  <React.Fragment key={url + idx}>
                    <div className="flex flex-row justify-between px-5 py-[10px]">
                      <Typography
                        label={getFileNameFromUrl(url)}
                        type="p"
                        FontSize="sm"
                        color="primary"
                        variant={200}
                      />
                      <a href={url} download target="_blank">
                        <Button
                          label=""
                          icon={<img src="/Assets/Download.svg" alt="" />}
                          variant="line"
                          size="small"
                        />
                      </a>
                    </div>
                  </React.Fragment>
                );
              })}

              {stage === "one" && (
                <div className="mt-[10px] flex justify-center pb-5">
                  <div className="w-[132px]">
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                    />
                    <Button
                      label="Add Attachment"
                      size="small"
                      onClick={handleFileInputChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
      {Documents?.documentLinks?.remark && (
        <div className="  shadow-navbar  rounded-[5px]">
          <div className="border-b-[1px] border-text-primary-100  px-5 pt-5 pb-[10px] ">
            <Typography
              label={"Remarks"}
              type="h2"
              classname="font-bold text-text-danger-200 leading-6 "
              FontSize="sm"
            />
          </div>
          <div className="flex flex-row justify-between px-5 py-[10px]">
            <Typography
              label={Documents?.documentLinks?.remark}
              type="p"
              FontSize="sm"
              color="primary"
              variant={200}
            />
          </div>
        </div>
      )}
    </div>
  );
};
