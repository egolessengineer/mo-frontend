import moment from "moment";
import { Button, Typography } from "../../../../Components/Atoms";
import { NoDataFound } from "../../../../Components/Atoms/CustomNoDataPage";
import { ModalAtom } from "../../../../Components/Molecules";

const CreateSubMileStone = ({
  open,
  close,
  nextpop,
  viewProjectData,
  openedIndex,
}: any) => {
  const CreateButton = () => {
    close();
    nextpop();
  };

  return (
    <>
      <ModalAtom
        Title={
          <div className="bg-primary-100 flex justify-between px-[20px] py-[15px] rounded-t-[5px] ">
            <Typography
              label={"Create Sub-MileStone"}
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
            <div className="shadow-navbar m-5 rounded-[5px]">
              {viewProjectData?.Milestones[openedIndex] ? (
                viewProjectData?.Milestones[openedIndex] && (
                  <>
                    <div className="px-5 pt-5 pb-[10px] border-b-[1px] border-text-gray-50 ">
                      <Typography
                        label={`Milestone ${openedIndex + 1}`}
                        type="p"
                        classname="font-bold  text-text-HeadLine-100 "
                        FontSize="base"
                      />
                    </div>
                    <div className="px-5 pb-5 pt-[10px] flex flex-col gap-y-[10px]">
                      <div>
                        <Typography
                          label={"Title"}
                          color="primary"
                          variant={200}
                          classname="font-bold "
                          FontSize="sm"
                          type="p"
                        />
                        <Typography
                          label={
                            viewProjectData?.Milestones[openedIndex]?.title ||
                            "-"
                          }
                          color="primary"
                          variant={300}
                          FontSize="sm"
                          type="p"
                        />
                      </div>
                      <div>
                        <Typography
                          label={"Description"}
                          color="primary"
                          variant={200}
                          classname="font-bold "
                          FontSize="sm"
                          type="p"
                        />
                        <Typography
                          label={
                            viewProjectData?.Milestones[openedIndex]
                              ?.description || "-"
                          }
                          color="primary"
                          variant={300}
                          FontSize="sm"
                          type="p"
                        />
                      </div>
                      <div>
                        <Typography
                          label={"Requirements"}
                          color="primary"
                          variant={200}
                          classname="font-bold "
                          FontSize="sm"
                          type="p"
                        />
                        <Typography
                          label={
                            viewProjectData?.Milestones[openedIndex]
                              ?.requirements || "-"
                          }
                          color="primary"
                          variant={200}
                          classname="font-bold "
                          FontSize="sm"
                          type="p"
                        />
                        
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <Typography
                            label={"Fund Allocated"}
                            color="primary"
                            variant={200}
                            classname="font-bold "
                            FontSize="sm"
                            type="p"
                          />
                          <Typography
                            label={
                              viewProjectData?.Milestones[openedIndex]
                                ?.fundAllocation +
                                " " +
                                "$" || "-"
                            }
                            color="primary"
                            variant={300}
                            FontSize="sm"
                            type="p"
                          />
                        </div>
                        <div>
                          <Typography
                            label={"Revision Count"}
                            color="primary"
                            variant={200}
                            classname="font-bold "
                            FontSize="sm"
                            type="p"
                          />
                          <Typography
                            label={
                              "0/" +
                                viewProjectData?.Milestones[openedIndex]
                                  ?.revisions || "-"
                            }
                            color="primary"
                            variant={300}
                            FontSize="sm"
                            type="p"
                          />
                        </div>
                        <div>
                          <Typography
                            label={"Milestone Start"}
                            color="primary"
                            variant={200}
                            classname="font-bold "
                            FontSize="sm"
                            type="p"
                          />
                          <Typography
                            label={
                              viewProjectData?.Milestones[openedIndex]?.startDate
                                ? viewProjectData?.Milestones[openedIndex]?.endPointType == "DATE"
                                  ? moment(viewProjectData?.Milestones[openedIndex]?.startDate).format(
                                    "MMMM D, YYYY"
                                  )
                                  : moment(viewProjectData?.Milestones[openedIndex]?.startDate).format(
                                    "MMMM D, YYYY HH:mm a"
                                  )
                                : "-"
                            }
                            color="primary"
                            variant={300}
                            FontSize="sm"
                            type="p"
                          />
                        </div>
                        <div>
                          <Typography
                            label={"Milestone End"}
                            color="primary"
                            variant={200}
                            classname="font-bold "
                            FontSize="sm"
                            type="p"
                          />
                          <Typography
                            label={
                              viewProjectData?.Milestones[openedIndex]?.endDate
                                ? viewProjectData?.Milestones[openedIndex]?.endPointType == "DATE"
                                  ? moment(viewProjectData?.Milestones[openedIndex]?.endDate).format(
                                    "MMMM D, YYYY"
                                  )
                                  : moment(viewProjectData?.Milestones[openedIndex]?.endDate).format(
                                    "MMMM D, YYYY HH:mm a"
                                  )
                                : "-"
                            }
                            color="primary"
                            variant={300}
                            FontSize="sm"
                            type="p"
                          />
                        </div>
                      </div>
                      <div>
                        <Typography
                          label={"Acceptance criteria"}
                          color="primary"
                          variant={200}
                          FontSize="sm"
                          classname="font-bold "
                          type="p"
                        />
                        <Typography
                          type="p"
                          label={
                            viewProjectData?.Milestones[openedIndex]
                              ?.acceptanceCriteria || "-"
                          }
                          color="primary"
                          variant={300}
                          FontSize="sm"
                        />
                      </div>
                    </div>
                  </>
                )
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className="mt-5 flex justify-center mb-5">
              <div className="w-[250px]">
                <Button
                  label="Create Sub-Milestones"
                  size="small"
                  onClick={CreateButton}
                />
              </div>
            </div>
          </>
        }
        PanelPosition={" "}
        open={open}
      />
    </>
  );
};

export default CreateSubMileStone;
