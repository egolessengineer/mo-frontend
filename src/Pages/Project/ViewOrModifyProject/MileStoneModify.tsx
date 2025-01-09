import { useState } from "react";
import {
  Button,
  CheckBoxAtom,
  HelperText,
  Textfield,
  Typography,
} from "../../../Components/Atoms";
import CustomDropdown from "../../../Components/Molecules/Structure/CustomDropdown";
import { AuthState } from "../../../Context/auth";
import { getCurrentDate } from "../../../Utils/helper";
import SubMileStoneDetails from "./../Popups/SubMileStoneDetails";
import { TrashIcon } from "@heroicons/react/24/outline";

const MileStoneModify = (props: any) => {
  const { handleBack, formik, handleNumberInputChange } = props;
  const { user } = AuthState();

  const [showPopupSubMilestines, setShowPopupSubMilestones] = useState(false);
  const [selectedCraeteSubMilestonesId, setSelectedCraeteSubMilestonesId] =
    useState(null);

  const [FAQPenality, setFAQPenality] = useState(true);
  const [FAQRoyality, setFAQRoyality] = useState(true);
  const Exclude = (e: any, milestoneIndex: number) => {
    if (e.target.checked) {
      formik.setFieldValue(`mileStones[${milestoneIndex}].penalityBreach`, []);
      formik.setFieldValue(`mileStones[${milestoneIndex}].valueIn`, "");
      formik.setFieldValue(
        `mileStones[${milestoneIndex}].pentalityDuration`,
        ""
      );
    }
    formik.setFieldValue(
      `mileStones[${milestoneIndex}].isPenaltyExcluded`,
      e.target.checked
    );
  };
  const HandleFAQPenality = () => {
    setFAQPenality((prevValue) => !prevValue);
  };
  const HandleFAQRoyalty = () => {
    setFAQRoyality((prevValue) => !prevValue);
  };

  const handleAddBreachRule = (milestoneIndex: number) => {
    formik.setFieldValue(`mileStones[${milestoneIndex}].penalityBreach`, [
      ...formik.values.mileStones[milestoneIndex].penalityBreach,
      {
        penalityType: "",
        pentality: "",
        timeperiod: "",
      },
    ]);
  };
  const handleRemoveBreachRule = (milestoneIndex: number, penaltyIndex: number) => {
    const updatedPenalties = [
      ...formik.values.mileStones[milestoneIndex].penalityBreach
    ];
    updatedPenalties.splice(penaltyIndex, 1);
    formik.setFieldValue(`mileStones[${milestoneIndex}].penalityBreach`, updatedPenalties);
  };

  const AddMileStone = () => {
    const newVAl = [
      ...formik.values.mileStones,
      {
        title: "",
        description: "",
        requirements: "",
      },
    ];
    formik.setFieldValue("mileStones", [...newVAl]);
  };

  const handleDiscardMilesStone = (index: any) => {
    let tempMilestone = formik.values.mileStones;
    console.log(tempMilestone, "tempMilestone");
    if (index >= 0 && index < tempMilestone.length) {
      tempMilestone.splice(index, 1);
    } else {
      console.error("Index out of bounds");
    }
    formik.setFieldValue("mileStones", tempMilestone);
  };

  function handleSave(e: any) {
    e.preventDefault();
    let formdata = new FormData(e.target);
    console.log(Object.fromEntries(formdata));
  }

  function handleOpenSubMilesstonePopup(id: any) {
    setShowPopupSubMilestones(true);
    setSelectedCraeteSubMilestonesId(id);
  }

  function handleCloseSubMilesstonePopup() {
    setShowPopupSubMilestones(false);
    setSelectedCraeteSubMilestonesId(null);
  }

  return (
    <div className="w-full">
      {formik.values.mileStones.length === 0 ? (
        <>
          <div className="flex flex-col items-center mt-[40px] gap-5 max-w-2xl m-auto">
            <div className=" w-full shadow-navbar p-5 rounded-md">
              <div className="flex justify-center">
                <Typography
                  label="“Created Milestone”"
                  type="h2"
                  classname="text-text-HeadLine-50 "
                  FontSize="5xl"
                />
              </div>
              <div className="mt-[10px]">
                <Typography
                  label="Create milestones to effectively track and manage the progress of the project. Define key checkpoints and deliverables, ensuring clear goals and timelines for successful project execution."
                  type="p"
                  color="primary"
                  variant={300}
                  FontSize="sm"
                />
              </div>
              <div className="mt-[10px]">
                <Typography
                  label={`Note: Kindly consider a project duration of ${formik?.values?.duration} ${formik?.values?.durationType} while planning.`}
                  classname="text-text-danger-50 "
                  FontSize="sm"
                  type="p"
                />
              </div>
            </div>
            {user?.role === "PROVIDER" && (
              <div className="w-[250px]">
                <Button
                  label="Add Milestones"
                  color="primary"
                  variant="standard"
                  size="small"
                  onClick={() => {
                    if (formik.values.mileStones.length < 1) {
                      // handleShowMileStone(true);
                      AddMileStone();
                    } else if (formik.values.mileStones.length === 1) {
                      // handleShowMileStone(true);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          {formik.values.mileStones.map((element: any, index: any) => (
            <div
              key={index}
              className="flex flex-col space-y-[24px] mt-[20px] w-full m-auto h-full"
            >
              <div className=" shadow-navbar rounded-[5px]">
                <div className="border-b-[1px] flex justify-between pt-[20px] pl-[20px]  pr-[20px] pb-[10px]">
                  <div className="">
                    <Typography
                      label={`Milestone ${index + 1} `}
                      type="h2"
                      FontSize="sm"
                      classname="text-text-HeadLine-100 font-bold "
                    />
                  </div>
                </div>
                <div className="pb-[20px] pt-[10px] pr-[20px] pl-[20px]">
                  <Typography
                    label="Title"
                    FontSize="sm"
                    color="primary"
                    variant={200}
                    classname="font-bold "
                    type="h3"
                  />

                  <Textfield
                    name={`mileStones[${index}].title`}
                    value={element.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeHolder="Enter Title"
                  />
                  {formik.touched.mileStones?.[index]?.title &&
                    formik.errors.mileStones?.[index]?.title && (
                      <HelperText
                        position="right"
                        label={formik.errors.mileStones?.[index].title}
                        className="text-xxs "
                        color="danger"
                        icon={
                          <img
                            src="/Assets/Danger.svg"
                            alt=""
                            className="pt-[6px] ml-[4px]"
                          />
                        }
                      />
                    )}
                  <div className="mt-[10px]">
                    <Typography
                      label="Description"
                      FontSize="sm"
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      type="h3"
                    />
                    <Textfield
                      multiline={true}
                      name={`mileStones[${index}].description`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={element?.description}
                      placeHolder="Focus is on understanding the target audience and gathering requirements for the fitness app."
                    />
                    {formik.touched.mileStones?.[index]?.description &&
                      formik.errors.mileStones?.[index]?.description && (
                        <HelperText
                          position="right"
                          label={formik.errors.mileStones?.[index].description}
                          className="text-xxs "
                          color="danger"
                          icon={
                            <img
                              src="/Assets/Danger.svg"
                              alt=""
                              className="pt-[6px] ml-[4px]"
                            />
                          }
                        />
                      )}
                  </div>
                  <div className="mt-[10px]">
                    <Typography
                      label="Requirements"
                      FontSize="sm"
                      color="primary"
                      variant={200}
                      classname="font-bold "
                      type="h3"
                    />
                    <Textfield
                      multiline={true}
                      name={`mileStones[${index}].requirements`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={element.requirements}
                      placeHolder="Focus is on understanding the target audience and gathering requirements for the fitness app."
                    />
                    {formik.touched.mileStones?.[index]?.requirements &&
                      formik.errors.mileStones?.[index]?.requirements && (
                        <HelperText
                          position="right"
                          label={formik.errors.mileStones?.[index].requirements}
                          className="text-xxs "
                          color="danger"
                          icon={
                            <img
                              src="/Assets/Danger.svg"
                              alt=""
                              className="pt-[6px] ml-[4px]"
                            />
                          }
                        />
                      )}
                  </div>
                  {element?.id && (
                    <div>
                      <div className="mt-[10px] flex items-start justify-between w-full gap-x-3  ">
                        <div className="relative w-full">
                          <CustomDropdown
                            Title="End Point"
                            placeHolder={element.endPointType}
                            value={element.endPointType}
                            onChange={(selected) => {
                              formik.setFieldValue(
                                `mileStones[${index}].endPointType`,
                                selected
                              );
                            }}
                            options={[{ key: "DATE", value: 'Date' }, { key: "DATETIME", value: 'Date/Time' }]}
                          />
                          {formik.touched.mileStones?.[index]?.endPointType &&
                            formik.errors.mileStones?.[index]?.endPointType && (
                              <HelperText
                                position="right"
                                label={
                                  formik.errors.mileStones?.[index].endPointType
                                }
                                className="text-xxs "
                                color="danger"
                                icon={
                                  <img
                                    src="/Assets/Danger.svg"
                                    alt=""
                                    className="pt-[6px] ml-[4px]"
                                  />
                                }
                              />
                            )}
                        </div>
                        <div className="w-full">
                          <Typography
                            label="Milestone Start"
                            FontSize="sm"
                            color="primary"
                            variant={200}
                            classname="font-bold "
                            type="h3"
                          />
                          <Textfield
                            name={`mileStones[${index}].startDate`}
                            onChange={(e: any) => {
                              formik.handleChange(e);
                              const selectedDate = new Date(e.target.value);
                              const endDateField = `mileStones[${index}].endDate`;
                              formik.setFieldValue(endDateField, "");
                              formik.setFieldTouched(endDateField, false);
                            }}
                            onBlur={formik.handleBlur}
                            value={element.startDate}
                            placeHolder="June 21, 2023"
                            type={
                              element.endPointType === "DATETIME"
                                ? "datetime-local"
                                : "date"
                            }
                            min={getCurrentDate(element.endPointType)}
                          />
                          {formik.touched.mileStones?.[index]?.startDate &&
                            formik.errors.mileStones?.[index]?.startDate && (
                              <HelperText
                                position="right"
                                label={
                                  formik.errors.mileStones?.[index].startDate
                                }
                                className="text-xxs "
                                color="danger"
                                icon={
                                  <img
                                    src="/Assets/Danger.svg"
                                    alt=""
                                    className="pt-[6px] ml-[4px]"
                                  />
                                }
                              />
                            )}
                        </div>
                        <div className="w-full">
                          <Typography
                            label="Milestone End"
                            FontSize="sm"
                            color="primary"
                            variant={200}
                            classname="font-bold "
                            type="h3"
                          />
                          <Textfield
                            name={`mileStones[${index}].endDate`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={element.endDate}
                            placeHolder="June 21, 2023"
                            type={
                              element.endPointType === "DATETIME"
                                ? "datetime-local"
                                : "date"
                            }
                            min={getCurrentDate(
                              element.endPointType,
                              new Date(element.startDate)
                            )}
                          />
                          {formik.touched.mileStones?.[index]?.endDate &&
                            formik.errors.mileStones?.[index]?.endDate && (
                              <HelperText
                                position="right"
                                label={
                                  formik.errors.mileStones?.[index].endDate
                                }
                                className="text-xxs "
                                color="danger"
                                icon={
                                  <img
                                    src="/Assets/Danger.svg"
                                    alt=""
                                    className="pt-[6px] ml-[4px]"
                                  />
                                }
                              />
                            )}
                        </div>
                      </div>
                      <div className="mt-[10px] flex items-start justify-between w-full gap-x-3 ">
                        <div className="w-full">
                          <Typography
                            label="Fund Allocation"
                            FontSize="sm"
                            color="primary"
                            variant={200}
                            classname="font-bold "
                            type="h3"
                          />
                          <Textfield
                            name={`mileStones[${index}].fundAllocation`}
                            // onChange={formik.handleChange}
                            onChange={(e: any) =>
                              handleNumberInputChange(
                                e,
                                `mileStones[${index}].fundAllocation`
                              )
                            }
                            onBlur={formik.handleBlur}
                            value={element.fundAllocation || ""}
                            placeHolder="200 $"
                          />
                          {formik.touched.mileStones?.[index]?.fundAllocation &&
                            formik.errors.mileStones?.[index]
                              ?.fundAllocation && (
                              <HelperText
                                position="right"
                                label={
                                  formik.errors.mileStones?.[index]
                                    .fundAllocation
                                }
                                className="text-xxs "
                                color="danger"
                                icon={
                                  <img
                                    src="/Assets/Danger.svg"
                                    alt=""
                                    className="pt-[6px] ml-[4px]"
                                  />
                                }
                              />
                            )}
                          {formik.errors?.mileStoneFunds && (
                            <HelperText
                              position="right"
                              label={
                                formik.errors.mileStoneFunds
                              }
                              className="text-xxs "
                              color="danger"
                              icon={
                                <img
                                  src="/Assets/Danger.svg"
                                  alt=""
                                  className="pt-[6px] ml-[4px]"
                                />
                              }
                            />
                          )}
                        </div>
                        <div className="w-full">
                          <Typography
                            label="No. of Revisions"
                            FontSize="sm"
                            color="primary"
                            variant={200}
                            classname="font-bold "
                            type="h3"
                          />
                          <Textfield
                            name={`mileStones[${index}].revisions`}
                            // onChange={formik.handleChange}
                            onChange={(e: any) =>
                              handleNumberInputChange(
                                e,
                                `mileStones[${index}].revisions`
                              )
                            }
                            onBlur={formik.handleBlur}
                            value={element.revisions || ""}
                            placeHolder="0"
                          />
                          {formik.touched.mileStones?.[index]?.revisions &&
                            formik.errors.mileStones?.[index]?.revisions && (
                              <HelperText
                                position="right"
                                label={
                                  formik.errors.mileStones?.[index].revisions
                                }
                                className="text-xxs "
                                color="danger"
                                icon={
                                  <img
                                    src="/Assets/Danger.svg"
                                    alt=""
                                    className="pt-[6px] ml-[4px]"
                                  />
                                }
                              />
                            )}
                        </div>
                      </div>
                      <div className="mt-[10px]">
                        <Typography
                          label="Acceptance Criteria"
                          FontSize="sm"
                          color="primary"
                          variant={200}
                          classname="font-bold "
                          type="h3"
                        />
                        <Textfield
                          multiline={true}
                          name={`mileStones[${index}].acceptanceCriteria`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={element.acceptanceCriteria || ""}
                          placeHolder="1. For completion of milestone freelancer must transfer all assets related to research."
                        />
                        {formik.touched.mileStones?.[index]
                          ?.acceptanceCriteria &&
                          formik.errors.mileStones?.[index]
                            ?.acceptanceCriteria && (
                            <HelperText
                              position="right"
                              label={
                                formik.errors.mileStones?.[index]
                                  .acceptanceCriteria
                              }
                              className="text-xxs "
                              color="danger"
                              icon={
                                <img
                                  src="/Assets/Danger.svg"
                                  alt=""
                                  className="pt-[6px] ml-[4px]"
                                />
                              }
                            />
                          )}
                        <div className="flex justify-between items-center bg-primary-600 p-[10px] rounded-[5px] border-[1px] border-text-gray-50 mt-[10px]">
                          <Typography
                            label={"Penalty"}
                            FontSize="sm"
                            type="p"
                            classname="text-text-HeadLine-100"
                          />
                          {/* <Button
                            variant="line"
                            icon={
                              FAQPenality ? (
                                <img src="/Assets/FAQOpen.svg" alt="Open FAQ" />
                              ) : (
                                <img
                                  src="/Assets/FAQClose.svg"
                                  alt="Close FAQ"
                                />
                              )
                            }
                            label=""
                            onClick={HandleFAQPenality}
                          /> */}
                        </div>
                        {FAQPenality ? (
                          <div className=" items-center">
                            <div className="py-5">
                              <div className="flex mt-[8px] space-x-1">
                                <div className="mt-[] mr-1 items-center ">
                                  <CheckBoxAtom
                                    label={""}
                                    checked={
                                      formik.values.mileStones[index]
                                        .isPenaltyExcluded
                                    }
                                    Onchange={(e: any) => Exclude(e, index)}
                                    borderColor="text-primary-200"
                                  />
                                </div>
                                <Typography
                                  label={
                                    "Exclude this milestone from Penalties"
                                  }
                                  color="primary"
                                  variant={300}
                                  type="p"
                                  FontSize="sm"
                                />
                              </div>
                            </div>
                            {!formik.values.mileStones[index]
                              .isPenaltyExcluded && (
                                <>
                                  <div className="flex justify-between gap-x-5">
                                    <div className="w-full flex items-start justify-between gap-x-2">
                                      <div className="relative w-full">
                                        <CustomDropdown
                                          Title="Penalty Value in"
                                          placeHolder={element.valueIn}
                                          value={element.valueIn}
                                          onChange={(selected) => {
                                            formik.setFieldValue(
                                              `mileStones[${index}].valueIn`,
                                              selected
                                            );
                                          }}
                                          options={[{ key: "PERCENT", value: "Percent" }, { key: "AMOUNT", value: "Amount" }]}
                                        />
                                        {formik.errors.mileStones?.[index]
                                          ?.valueIn && (
                                            <HelperText
                                              position="right"
                                              label={
                                                formik.errors.mileStones?.[index]
                                                  ?.valueIn
                                              }
                                              className="text-xxs"
                                              color="danger"
                                              icon={
                                                <img
                                                  src="/Assets/Danger.svg"
                                                  alt=""
                                                  className="pt-[6px] ml-[4px]"
                                                />
                                              }
                                            />
                                          )}
                                      </div>
                                      <div className="relative w-full">
                                        <CustomDropdown
                                          Title="Duration"
                                          placeHolder={element.pentalityDuration}
                                          value={element.pentalityDuration}
                                          onChange={(selected) => {
                                            formik.setFieldValue(
                                              `mileStones[${index}].pentalityDuration`,
                                              selected
                                            );
                                          }}
                                          options={[{ key: "ByHour", value: 'By Hour' }, { key: "ByDay", value: 'By Day' }]}
                                        />
                                        {formik.errors.mileStones?.[index]
                                          ?.pentalityDuration && (
                                            <HelperText
                                              position="right"
                                              label={
                                                formik.errors.mileStones?.[index]
                                                  ?.pentalityDuration
                                              }
                                              className="text-xxs "
                                              color="danger"
                                              icon={
                                                <img
                                                  src="/Assets/Danger.svg"
                                                  alt=""
                                                  className="pt-[6px] ml-[4px]"
                                                />
                                              }
                                            />
                                          )}
                                      </div>
                                    </div>

                                    <div className="border-[1px] border-text-gray-50 p-[10px] rounded-[5px]">
                                      <div className="flex justify-center">
                                        <Typography
                                          label={"Rule of Breaches"}
                                          type="p"
                                          classname="font-bold text-text-danger-100 "
                                          FontSize="base"
                                        />
                                      </div>
                                      <div className="flex mt-[5px]">
                                        <Typography
                                          label={
                                            "Add values to breaches to see the Rules of Breaches"
                                          }
                                          type="p"
                                          color="primary"
                                          variant={300}
                                          FontSize="xs"
                                        />
                                      </div>
                                    </div>
                                  </div>{" "}
                                  {formik.values.mileStones[index]
                                    ?.penalityBreach &&
                                    formik.values.mileStones[
                                      index
                                    ]?.penalityBreach.map(
                                      (
                                        penalityBreachelement: any,
                                        penalityBreachindex: any
                                      ) => (
                                        <div
                                          key={penalityBreachindex}
                                          className="mt-[10px"
                                        >
                                          <div className="flex justify-between items-center py-1 mt-[20px] border-b-[1px] border-text-gray-50">
                                            <Typography
                                              label={`${penalityBreachindex + 1
                                                }st Breach`}
                                              type="p"
                                              FontSize="sm"
                                              classname="font-bold text-text-HeadLine-100"
                                            />
                                            <div onClick={() => handleRemoveBreachRule(index, penalityBreachindex)}>
                                              <TrashIcon className="h-6 w-6 cursor-pointer text-text-danger-50" />
                                            </div>
                                          </div>
                                          <div className="relative w-full mt-[10px]">
                                            <CustomDropdown
                                              Title="Select"
                                              placeHolder={
                                                formik.values.mileStones?.[index]
                                                  ?.penalityBreach?.[
                                                  penalityBreachindex
                                                ]?.penalityType
                                              }
                                              value={
                                                formik.values.mileStones?.[index]
                                                  ?.penalityBreach?.[
                                                  penalityBreachindex
                                                ]?.penalityType
                                              }
                                              onChange={(selected) => {
                                                formik.setFieldValue(
                                                  `mileStones[${index}].penalityBreach[${penalityBreachindex}].penalityType`,
                                                  selected
                                                );
                                              }}
                                              options={[{ key: "WARNING", value: 'Warning' }, { key: "PENALTY", value: 'Penalty' }]}
                                            />
                                            {formik.touched.mileStones?.[index]
                                              ?.penalityBreach?.[
                                              penalityBreachindex
                                            ]?.penalityType &&
                                              formik.errors.mileStones?.[index]
                                                ?.penalityBreach?.[
                                                penalityBreachindex
                                              ]?.penalityType && (
                                                <HelperText
                                                  position="right"
                                                  label={
                                                    formik.errors.mileStones?.[
                                                      index
                                                    ]?.penalityBreach?.[
                                                      penalityBreachindex
                                                    ]?.penalityType
                                                  }
                                                  className="text-xxs "
                                                  color="danger"
                                                  icon={
                                                    <img
                                                      src="/Assets/Danger.svg"
                                                      alt=""
                                                      className="pt-[6px] ml-[4px]"
                                                    />
                                                  }
                                                />
                                              )}
                                          </div>
                                          <div className="mt-[10px] flex items-start gap-x-2 ">
                                            <div className="w-full">
                                              <Typography
                                                label="Penalty"
                                                FontSize="sm"
                                                color="primary"
                                                variant={200}
                                                classname="font-bold "
                                                type="h3"
                                              />
                                              <Textfield
                                                name={`mileStones[${index}].penalityBreach[${penalityBreachindex}].pentality`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                  formik.values.mileStones?.[
                                                    index
                                                  ]?.penalityBreach?.[
                                                    penalityBreachindex
                                                  ].pentality
                                                }
                                                placeHolder="0"
                                                disabled={
                                                  formik.values.mileStones?.[
                                                    index
                                                  ]?.penalityBreach?.[
                                                    penalityBreachindex
                                                  ].penalityType == "WARNING"
                                                }
                                              />
                                              {formik.touched.mileStones?.[index]
                                                ?.penalityBreach?.[
                                                penalityBreachindex
                                              ]?.pentality &&
                                                formik.errors.mileStones?.[index]
                                                  ?.penalityBreach?.[
                                                  penalityBreachindex
                                                ]?.pentality && (
                                                  <HelperText
                                                    position="right"
                                                    label={
                                                      formik.errors.mileStones?.[
                                                        index
                                                      ]?.penalityBreach?.[
                                                        penalityBreachindex
                                                      ].pentality
                                                    }
                                                    className="text-xxs "
                                                    color="danger"
                                                    icon={
                                                      <img
                                                        src="/Assets/Danger.svg"
                                                        alt=""
                                                        className="pt-[6px] ml-[4px]"
                                                      />
                                                    }
                                                  />
                                                )}
                                            </div>
                                            <div className="w-full ">
                                              <Typography
                                                label="Time Period"
                                                FontSize="sm"
                                                color="primary"
                                                variant={200}
                                                classname="font-bold "
                                                type="h3"
                                              />
                                              <Textfield
                                                name={`mileStones[${index}].penalityBreach[${penalityBreachindex}].timeperiod`}
                                                onChange={(e: any) =>
                                                  handleNumberInputChange(
                                                    e,
                                                    `mileStones[${index}].penalityBreach[${penalityBreachindex}].timeperiod`
                                                  )
                                                }
                                                onBlur={formik.handleBlur}
                                                value={
                                                  formik.values.mileStones?.[
                                                    index
                                                  ]?.penalityBreach?.[
                                                    penalityBreachindex
                                                  ].timeperiod
                                                }
                                                placeHolder="Enter"
                                              />

                                              {formik.touched.mileStones?.[index]
                                                ?.penalityBreach?.[
                                                penalityBreachindex
                                              ]?.timeperiod &&
                                                formik.errors.mileStones?.[index]
                                                  ?.penalityBreach?.[
                                                  penalityBreachindex
                                                ]?.timeperiod && (
                                                  <HelperText
                                                    position="right"
                                                    label={
                                                      formik.errors.mileStones?.[
                                                        index
                                                      ]?.penalityBreach?.[
                                                        penalityBreachindex
                                                      ].timeperiod
                                                    }
                                                    className="text-xxs "
                                                    color="danger"
                                                    icon={
                                                      <img
                                                        src="/Assets/Danger.svg"
                                                        alt=""
                                                        className="pt-[6px] ml-[4px]"
                                                      />
                                                    }
                                                  />
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  <div className="flex justify-center gap-5 mt-[20px]">

                                    <div className="w-[163px]">
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          handleAddBreachRule(index);
                                        }}
                                        label="Add Breach Rule"
                                        variant="standard"
                                        color="primary"
                                        size="small"
                                      />
                                    </div>
                                  </div>
                                </>
                              )}
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="flex justify-between items-center bg-primary-600 p-[10px] rounded-[5px] border-[1px] border-text-gray-50 mt-[10px]">
                          <Typography
                            label={"Success Bonus"}
                            FontSize="sm"
                            type="p"
                            classname="text-text-HeadLine-100"
                          />
                          {/* <Button
                            variant="line"
                            icon={
                              FAQRoyality ? (
                                <img src="/Assets/FAQOpen.svg" alt="Open FAQ" />
                              ) : (
                                <img
                                  src="/Assets/FAQClose.svg"
                                  alt="Close FAQ"
                                />
                              )
                            }
                            label=""
                            onClick={HandleFAQRoyalty}
                          /> */}
                        </div>
                        {FAQRoyality ? (
                          <div className=" mt-[20px] items-center">
                            <div className="flex justify-between gap-x-5">
                              <div className="w-full">
                                <div className="relative w-full">
                                  <CustomDropdown
                                    Title="Success Bonus Type"
                                    placeHolder={element.royaltyType}
                                    value={element.royaltyType}
                                    onChange={(selected) => {
                                      formik.setFieldValue(
                                        `mileStones[${index}].royaltyType`,
                                        selected
                                      );
                                    }}
                                    options={[
                                      {
                                        key: "PRE_PAYMENT_ROYALTY",
                                        value: "Pre payment success bonus",
                                      },
                                      // {
                                      //   key: "POST_KPI_ROYALTY",
                                      //   value: "Post KPI success bonus",
                                      // },
                                    ]}
                                  />
                                  {formik.touched.mileStones?.[index]
                                    ?.royaltyType &&
                                    formik.errors.mileStones?.[index]
                                      ?.royaltyType && (
                                      <HelperText
                                        position="right"
                                        label={
                                          formik.errors.mileStones?.[index]
                                            ?.royaltyType
                                        }
                                        className="text-xxs "
                                        color="danger"
                                        icon={
                                          <img
                                            src="/Assets/Danger.svg"
                                            alt=""
                                            className="pt-[6px] ml-[4px]"
                                          />
                                        }
                                      />
                                    )}
                                </div>
                                <div className="w-full mt-[10px] ">
                                  <Typography
                                    label="Success Bonus (in percent)"
                                    FontSize="sm"
                                    color="primary"
                                    variant={200}
                                    classname="font-bold "
                                    type="h3"
                                  />
                                  <Textfield
                                    name={`mileStones[${index}].royaltyAmount`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={element.royaltyAmount || ""}
                                    placeHolder="Enter Success Bonus in percent"
                                    rightIcon={
                                      <Typography
                                      label={`${(Number(element?.royaltyAmount) / 100) * Number(element.fundAllocation)} ${formik?.values?.currency}`}
                                      FontSize="sm"
                                      variant={100}
                                      classname="text-text-HeadLine-100 font-bold px-2"
                                      type="h3"
                                    />
                                    }
                                  />
                                  {formik.touched.mileStones?.[index]
                                    ?.royaltyAmount &&
                                    formik.errors.mileStones?.[index]
                                      ?.royaltyAmount && (
                                      <HelperText
                                        position="right"
                                        label={
                                          formik.errors.mileStones?.[index]
                                            .royaltyAmount
                                        }
                                        className="text-xxs "
                                        color="danger"
                                        icon={
                                          <img
                                            src="/Assets/Danger.svg"
                                            alt=""
                                            className="pt-[6px] ml-[4px]"
                                          />
                                        }
                                      />
                                    )}
                                  {formik.errors?.mileStoneFunds && (
                                    <HelperText
                                      position="right"
                                      label={
                                        formik.errors.mileStoneFunds
                                      }
                                      className="text-xxs "
                                      color="danger"
                                      icon={
                                        <img
                                          src="/Assets/Danger.svg"
                                          alt=""
                                          className="pt-[6px] ml-[4px]"
                                        />
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-5 mt-[20px]">
                    {user?.role === "PROVIDER" && (
                      <div className="w-[163px]">
                        <Button
                          type="button"
                          onClick={() => {
                            handleDiscardMilesStone(index);
                          }}
                          label="Discard milestone"
                          variant="Transparent"
                          color="secondary"
                          size="small"
                        />
                      </div>
                    )}
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
          {user?.role === "PROVIDER" && (
            <div className="w-[250px] mt-5 mx-auto loololo">
              <Button
                label="Add More Milestones"
                color="primary"
                variant="standard"
                size="small"
                onClick={AddMileStone}
              />
            </div>
          )}
          <div className="flex justify-between mb-[20px] mt-[20px]">
            <div className="w-[100px]">
              <Button
                onClick={() => {
                  handleBack();
                }}
                variant="Transparent"
                color="secondary"
                label="Back"
                size="small"
              />
            </div>
            <div className="w-[167px]">
              <Button label="Save & Send" size="small" type="submit" />
            </div>
          </div>
        </form>
      )}
      {showPopupSubMilestines && (
        <SubMileStoneDetails
          formik={formik}
          milestoneId={selectedCraeteSubMilestonesId}
          open={showPopupSubMilestines}
          close={handleCloseSubMilesstonePopup}
        />
      )}
    </div>
  );
};

export default MileStoneModify;
