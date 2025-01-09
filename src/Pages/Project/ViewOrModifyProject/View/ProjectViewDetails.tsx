import { Typography } from "../../../../Components/Atoms";

export const ProjectViewDetails = ({ viewProjectData }: any) => {
  return (
    <div className="shadow-navbar p-5  rounded-[5px] mx-auto w-full">
      <Typography
        label={viewProjectData?.ProjectDetails?.title || "-"}
        FontSize="4xl"
        classname="text-text-HeadLine-50 leading-10 font-bold "
        type="h2"
      />
      <div className="mt-[15px]">
        <Typography
          label={viewProjectData?.ProjectDetails?.category || "-"}
          FontSize="base"
          type="p"
          color="primary"
          variant={200}
        />
      </div>
      <div className="mt-[15px]">
        <div className="flex">
          <Typography
            label="Project Scope"
            FontSize="sm"
            type="p"
            classname="font-bold "
            color="primary"
            variant={200}
          />
        </div>

        <Typography
          label={viewProjectData?.ProjectDetails?.scope || "-"}
          FontSize="sm"
          type="p"
          color="primary"
          variant={300}
        />
      </div>
      <div className="mt-[25px] flex justify-between xs:flex-co">
        <div className="flex flex-col space-y-[30px] ">
          <div>
            <div className="flex">
              <Typography
                label="Project Duration"
                type="h3"
                FontSize="sm"
                classname="font-bold "
                color="primary"
                variant={200}
              />
            </div>

            <Typography
              label={
                viewProjectData?.ProjectDetails?.duration
                  ? viewProjectData?.ProjectDetails?.duration +
                    " " +
                    viewProjectData?.ProjectDetails?.durationType
                  : "-"
              }
              type="p"
              FontSize="sm"
              color="primary"
              variant={300}
            />
          </div>
          <div>
            <div className="flex">
              <Typography
                label="Fund Assigned to"
                type="h3"
                FontSize="sm"
                classname="font-bold "
                color="primary"
                variant={200}
              />
            </div>

            <Typography
              label={viewProjectData?.assignedFundTo?.toLowerCase() || "-"}
              type="p"
              FontSize="sm"
              color="primary"
              variant={300}
              classname="capitalize"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-[30px] ">
          <div>
            <div className="flex">
              <Typography
                label="Project Fund"
                type="h3"
                FontSize="sm"
                classname="font-bold "
                color="primary"
                variant={200}
              />
            </div>
            <Typography
              label={viewProjectData?.ProjectDetails?.totalProjectFund || "-"}
              type="p"
              FontSize="sm"
              color="primary"
              variant={300}
            />
          </div>
          <div>
            <div className="flex">
              <Typography
                label="Fund Transfer Type"
                type="h3"
                FontSize="sm"
                classname="font-bold "
                color="primary"
                variant={200}
              />
            </div>

            <Typography
              label={
                viewProjectData?.fundTransferType === "MilestoneCompleted"
                  ? "Milestone Completed"
                  : "Project Completed"
              }
              type="p"
              // fontSize="sm"
              FontSize="sm"
              color="primary"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-[30px] ">
          <div>
            <div className="flex">
              <Typography
                label="Currency Type"
                type="h3"
                FontSize="sm"
                classname="font-bold "
                color="primary"
                variant={200}
              />
            </div>

            <Typography
              label={viewProjectData?.ProjectDetails?.currency || "-"}
              type="p"
              FontSize="sm"
              color="primary"
              variant={300}
            />
          </div>
          <div>
            <div className="flex">
              <Typography
                label="Royalty"
                type="h3"
                FontSize="sm"
                classname="font-bold "
                color="primary"
                variant={200}
              />
            </div>

            <Typography
              label={viewProjectData?.ProjectDetails?.postKpiRoyalty || "-"}
              type="p"
              FontSize="sm"
              color="primary"
              variant={300}
              classname="capitalize"
            />
          </div>
        </div>
      </div>
      {/* //! Deliverables */}
      <div className="mt-[25px]">
        <Typography
          label="Deliverables"
          type="h3"
          color="primary"
          variant={200}
          classname="font-bold "
          FontSize="sm"
        />
        <Typography
          label={viewProjectData?.ProjectDetails?.deliverables || "-"}
          type="p"
          color="primary"
          variant={300}
          FontSize="sm"
        />

        <div className="flex">
          <div className="mt-[10px]">
            <div className="flex">
              <Typography
                label="Requirements"
                type="h3"
                color="primary"
                classname="font-bold "
                variant={200}
                FontSize="sm"
              />
            </div>
            <Typography
              label={viewProjectData?.Documents?.requirements || "-"}
              type="p"
              color="primary"
              variant={300}
              FontSize="sm"
            />
          </div>
        </div>
      </div>

      {/* //Release fund from ESCROW to CP */}
      <div className="flex flex-col md:flex-row space-y-[20px] md:space-y-0 justify-between mt-[20px] w-full gap-5">
        {viewProjectData?.projectRole === "PURCHASER" && (
          <div className="border rounded-[5px] border-text-gray-50 p-[10px] w-1/2 ">
            <div className="flex">
              <Typography
                label="Release fund from Wallet to ESCROW"
                type="h2"
                classname="font-bold text-text-HeadLine-50"
                FontSize="base"
              />
            </div>

            <div className="flex justify-between mt-[10px]">
              <div>
                <Typography
                  type="h3"
                  label="Assign Fund to"
                  FontSize="sm"
                  color="primary"
                  variant={200}
                  classname="font-bold "
                />
                <Typography
                  type="p"
                  label={viewProjectData?.assignedFundTo?.toLowerCase() || "-"}
                  FontSize="sm"
                  color="primary"
                  variant={300}
                  classname="capitalize"
                />
              </div>
              <div></div>
            </div>
          </div>
        )}
        <div className="border rounded-[5px] border-text-gray-50 p-[10px] w-1/2">
          <div className="flex ">
            <Typography
              label="Release fund from ESCROW to CP"
              type="h2"
              classname="font-bold text-text-HeadLine-50"
              FontSize="base"
            />
          </div>

          <div className="flex justify-between mt-[10px]">
            <div>
              <Typography
                type="p"
                color="primary"
                variant={200}
                classname="font-bold "
                label={"Assign Fund to"}
                FontSize="sm"
              />
              <Typography
                type="p"
                color="primary"
                variant={300}
                label={viewProjectData?.assignedFundTo?.toLowerCase() || "-"}
                FontSize="sm"
                classname="capitalize"
              />
            </div>
            <div>
              <Typography
                type="p"
                color="primary"
                variant={200}
                classname="font-bold "
                label={"Fund Transfer Type"}
                FontSize="sm"
              />
              <Typography
                type="p"
                color="primary"
                variant={300}
                label={
                  viewProjectData?.fundTransferType
                    ? viewProjectData?.fundTransferType === "MilestoneCompleted"
                      ? "Milestone Completed"
                      : "Project Completed"
                    : "-"
                }
                FontSize="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
