import { useState } from "react";
import {
  Button,
  CheckBoxAtom,
  HelperText,
  Textfield,
  Typography,
} from "../../../Components/Atoms";
import { ModalAtom, Option } from "../../../Components/Molecules";
import ExcludedStructure from "../ViewOrModifyProject/View/ExcludedStructure2";

const SubMileStoneDetails = ({ formik, milestoneId, open, close }: any) => {
  const [openIndex, setOpenIndex] = useState(-1);
  const [FAQPenality, setFAQPenality] = useState(false);
  const [FAQRoyality, setFAQRoyality] = useState(false);
  const [Ischecked, setISchecked] = useState(false);

  const Exclude = (e: any) => {
    setISchecked(e.target.checked);
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  const HandleFAQPenality = () => {
    setFAQPenality((prevValue) => !prevValue);
  };
  const HandleFAQRoyality = () => {
    setFAQRoyality((prevValue) => !prevValue);
  };

  const AddMileStone = (id: any) => {
    let subMilesStoneObj = {
      title: "",
      noOfRevision: "",
      endPoint: "",
      startHour: "",
      endHour: "",
      description: "",
      requirements: "",
      acceptanceCriteria: "",
      fundAllocation: "",
      fundTransferType: "",
      penalty: {
        excludePenalties: "",
        penaltyValue: "",
        duration: "",
        breach: {
          select: "",
          penality: "",
          timePeriod: "",
        },
      },
      royalty: {
        royaltyType: "",
        royalties: "",
      },
    };
    let modifyMilestones = formik.values.mileStones.map((miles: any) => {
      if (miles.id === milestoneId) {
        return miles.hasOwnProperty("subMilestones")
          ? {
            ...miles,
            subMilestones: [...miles.subMilestones, subMilesStoneObj],
          }
          : { ...miles, subMilestones: [subMilesStoneObj] };
      }
      return miles;
    });
    formik.setFieldValue("mileStones", modifyMilestones);
  };

  let submileStone = formik.values.mileStones.find(
    (mil: any) => mil.id === milestoneId
  )?.subMilestones;

  return (
    <ModalAtom
      PanelPosition={"max-w-[90%]"}
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
            icon={<img src="/Assets/Close.svg" alt="" />}
          />
        </div>
      }
      open={open}
      close={close}
      description={
        <div className="p-5 flex flex-col gap-5">
          <div className="shadow-navbar rounded-[5px]">
            <div className="px-5 pt-5 pb-[10px] border-b-[1px] border-text-gray-50 ">
              <Typography
                label={`Milestone ${milestoneId + 1}`}
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
                  label={"Ideation"}
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
                    "Focus is on understanding the target audience and gathering requirements for the fitness app."
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
                <ol className="list-decimal text-sm text-text-primary-300 ml-5">
                  <li>
                    Conduct user interviews and surveys to gather insights about
                    user preferences, pain points, and expectations related to
                    fitness apps.
                  </li>
                  <li>
                    Create user personas and user journey maps based on the
                    collected data.
                  </li>
                  <li>
                    Define the key features and functionalities that should be
                    incorporated into the app based on user needs.
                  </li>
                  <li>
                    Document the research findings and requirements in a clear
                    and comprehensive manner.
                  </li>
                </ol>
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
                    label={"100 $"}
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
                    label={"0/3"}
                    color="primary"
                    variant={300}
                    FontSize="sm"
                    type="p"
                  />
                </div>
                <div>
                  <Typography
                    label={"Start Date "}
                    color="primary"
                    variant={200}
                    classname="font-bold "
                    FontSize="sm"
                    type="p"
                  />
                  <Typography
                    label={"June 21, 2023"}
                    color="primary"
                    variant={300}
                    FontSize="sm"
                    type="p"
                  />
                </div>
                <div>
                  <Typography
                    label={"Completion Date"}
                    color="primary"
                    variant={200}
                    classname="font-bold "
                    FontSize="sm"
                    type="p"
                  />
                  <Typography
                    label={"June 21, 2023"}
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
                    "For completion of milestone freelancer must transfer all assets related to research."
                  }
                  color="primary"
                  variant={300}
                  FontSize="sm"
                />
              </div>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {submileStone &&
              submileStone?.map((element: any, index: any) => {
                return (
                  <div key={index} className="shadow-navbar rounded-[5px]  ">
                    <div className="flex justify-between px-5 py-[10px] border-b-[1px] border-text-gray-50  ">
                      <Typography
                        label={`Sub-Milestone ${milestoneId + 1} (${index + 1
                          })`}
                        classname="text-text-HeadLine-100 font-bold "
                        type="p"
                      />
                      <div className="flex gap-5">
                        <Button
                          label=""
                          size="small"
                          variant="line"
                          icon={<img src="/Assets/Edit.svg" alt="" />}
                        />
                        <Button
                          label={""}
                          size="small"
                          variant="line"
                          onClick={() => {
                            toggleFAQ(index);
                          }}
                          icon={
                            openIndex === index ? (
                              <img src="/Assets/FAQOpen.svg" alt="Open FAQ" />
                            ) : (
                              <img src="/Assets/FAQClose.svg" alt="Open FAQ" />
                            )
                          }
                        />
                      </div>
                    </div>
                    {openIndex === index && (
                      <>
                        <div className="flex gap-x-5 gap-y-[10px] px-5 pt-[10px] pb-5 flex-wrap ">
                          <div className="w-[48%]">
                            <Typography
                              label={"Title"}
                              type="p"
                              color="primary"
                              variant={200}
                              FontSize="sm"
                              classname="font-bold "
                            />
                            <Textfield
                              type="text"
                              name={`mileStones[${milestoneId}].subMilestones[${index}].title`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={element.title}
                              placeHolder="Ideation"
                            />
                            {formik.touched.mileStones?.[milestoneId]
                              ?.subMilestones?.[index]?.title &&
                              formik.errors.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.title && (
                                <HelperText
                                  position="right"
                                  label={
                                    formik.errors.mileStones?.[milestoneId]
                                      ?.subMilestones?.[index]?.title
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
                          <div className="w-[48%]">
                            <Typography
                              label={"No. of Revisions"}
                              type="p"
                              color="primary"
                              variant={200}
                              FontSize="sm"
                              classname="font-bold "
                            />
                            <Textfield type="text"
                              name={`mileStones[${milestoneId}].subMilestones[${index}].noOfRevision`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={element.noOfRevision}
                              placeHolder="Ideation" />
                            {formik.touched.mileStones?.[milestoneId]
                              ?.subMilestones?.[index]?.noOfRevision &&
                              formik.errors.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.noOfRevision && (
                                <HelperText
                                  position="right"
                                  label={
                                    formik.errors.mileStones?.[milestoneId]
                                      ?.subMilestones?.[index]?.noOfRevision
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
                          <div className="w-[48%] relative">
                            <Option
                              placeholder="Select"
                              Title={"End Point"}
                              options={["Hours", "Burn"]}
                            />
                            {formik.touched.mileStones?.[milestoneId]
                              ?.subMilestones?.[index]?.endPoint &&
                              formik.errors.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.endPoint && (
                                <HelperText
                                  position="right"
                                  label={
                                    formik.errors.mileStones?.[milestoneId]
                                      ?.subMilestones?.[index]?.endPoint
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
                          <div className="w-[48%]">
                            <div className=" flex gap-x-5 gap-y-[10px] ">
                              <div className="w-[50%]">
                                <Typography
                                  label={"Start Hours"}
                                  type="p"
                                  color="primary"
                                  variant={200}
                                  FontSize="sm"
                                  classname="font-bold "
                                />
                                <Textfield type="text"
                                  name={`mileStones[${milestoneId}].subMilestones[${index}].startHour`}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={element.startHour}
                                  placeHolder="3 Hrs" />
                                {formik.touched.mileStones?.[milestoneId]
                                  ?.subMilestones?.[index]?.startHour &&
                                  formik.errors.mileStones?.[milestoneId]
                                    ?.subMilestones?.[index]?.startHour && (
                                    <HelperText
                                      position="right"
                                      label={
                                        formik.errors.mileStones?.[milestoneId]
                                          ?.subMilestones?.[index]?.startHour
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
                              <div className="w-[50%]">
                                <Typography
                                  label={"End Hours"}
                                  type="p"
                                  color="primary"
                                  variant={200}
                                  FontSize="sm"
                                  classname="font-bold "
                                />
                                <Textfield type="text"
                                  name={`mileStones[${milestoneId}].subMilestones[${index}].endHour`}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={element.endHour}
                                  placeHolder="3 Hrs" />
                                {formik.touched.mileStones?.[milestoneId]
                                  ?.subMilestones?.[index]?.endHour &&
                                  formik.errors.mileStones?.[milestoneId]
                                    ?.subMilestones?.[index]?.endHour && (
                                    <HelperText
                                      position="right"
                                      label={
                                        formik.errors.mileStones?.[milestoneId]
                                          ?.subMilestones?.[index]?.endHour
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
                          <div className="w-full">
                            <Typography
                              label={"Description"}
                              type="p"
                              color="primary"
                              variant={200}
                              FontSize="sm"
                              classname="font-bold "
                            />
                            <Textfield
                              type="text"
                              name={`mileStones[${milestoneId}].subMilestones[${index}].description`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={element.description}
                              placeHolder="Focus is on understanding the target audience and gathering requirements for the fitness app."
                              multiline={true}
                            />
                            {formik.touched.mileStones?.[milestoneId]
                              ?.subMilestones?.[index]?.description &&
                              formik.errors.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.description && (
                                <HelperText
                                  position="right"
                                  label={
                                    formik.errors.mileStones?.[milestoneId]
                                      ?.subMilestones?.[index]?.description
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
                              label={"Requirements"}
                              type="p"
                              color="primary"
                              variant={200}
                              FontSize="sm"
                              classname="font-bold "
                            />
                            <Textfield
                              type="text"
                              name={`mileStones[${milestoneId}].subMilestones[${index}].requirements`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={element.requirements}
                              placeHolder="1.Conduct user interviews and surveys to gather insights about user preferences, pain points, and expectations related to fitness apps.
2.Create user personas and user journey maps based on the collected data.
3.Define the key features and functionalities that should be incorporated into the app based on user needs.
4.Document the research findings and requirements in a clear and comprehensive manner."
                              multiline={true}
                            />
                            {formik.touched.mileStones?.[milestoneId]
                              ?.subMilestones?.[index]?.requirements &&
                              formik.errors.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.requirements && (
                                <HelperText
                                  position="right"
                                  label={
                                    formik.errors.mileStones?.[milestoneId]
                                      ?.subMilestones?.[index]?.requirements
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
                              label={"Acceptance Criteria"}
                              type="p"
                              color="primary"
                              variant={200}
                              FontSize="sm"
                              classname="font-bold "
                            />
                            <Textfield
                              type="text"
                              name={`mileStones[${milestoneId}].subMilestones[${index}].acceptanceCriteria`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={element.acceptanceCriteria}
                              placeHolder="For completion of milestone freelancer must transfer all assets related to research."
                            />
                            {formik.touched.mileStones?.[milestoneId]
                              ?.subMilestones?.[index]?.acceptanceCriteria &&
                              formik.errors.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.acceptanceCriteria && (
                                <HelperText
                                  position="right"
                                  label={
                                    formik.errors.mileStones?.[milestoneId]
                                      ?.subMilestones?.[index]?.acceptanceCriteria
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
                          <div className=" w-full flex gap-y-[10px] gap-x-5">
                            <div className="w-[48%]">
                              <Typography
                                label={"Fund Allocation"}
                                type="p"
                                color="primary"
                                variant={200}
                                FontSize="sm"
                                classname="font-bold "
                              />
                              <Textfield type="text"
                                name={`mileStones[${milestoneId}].subMilestones[${index}].fundAllocation`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={element.fundAllocation}
                                placeHolder="50 $" />
                              {formik.touched.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.fundAllocation &&
                                formik.errors.mileStones?.[milestoneId]
                                  ?.subMilestones?.[index]?.fundAllocation && (
                                  <HelperText
                                    position="right"
                                    label={
                                      formik.errors.mileStones?.[milestoneId]
                                        ?.subMilestones?.[index]?.fundAllocation
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
                            </div>{" "}
                            <div className="w-[48%] relative">
                              <Option
                                placeholder="Select"
                                Title={"Fund Transfer Type"}
                                options={["Hbar", "etc"]}
                              />
                              {formik.touched.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.fundTransferType &&
                                formik.errors.mileStones?.[milestoneId]
                                  ?.subMilestones?.[index]?.fundTransferType && (
                                  <HelperText
                                    position="right"
                                    label={
                                      formik.errors.mileStones?.[milestoneId]
                                        ?.subMilestones?.[index]?.fundTransferType
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
                        <div className="flex justify-between bg-primary-600 p-[10px] mx-5 rounded-[5px] border-[1px] border-text-gray-50 ">
                          <Typography
                            label={"Penalty"}
                            FontSize="sm"
                            type="p"
                            classname="text-text-HeadLine-100 "
                          />
                          <Button
                            variant="line"
                            icon={
                              FAQPenality ? (
                                <img src="/Assets/FAQOpen.svg" alt="Open FAQ" />
                              ) : (
                                <img
                                  src="/Assets/FAQClose.svg"
                                  alt="Open FAQ"
                                />
                              )
                            }
                            label=""
                            onClick={HandleFAQPenality}
                          />
                        </div>
                        {FAQPenality && openIndex === index && (
                          <div className="p-5">
                            <div className="flex mt-[8px] space-x-1">
                              <div
                                className="mt-[] "
                              >
                                <CheckBoxAtom
                                  label={""}
                                  Onchange={Exclude}
                                  checked={Ischecked}
                                  borderColor="text-primary-300"
                                />
                              </div>
                              <Typography
                                label={"Exclude this milestone from Penalties"}
                                color="primary"
                                variant={300}
                                type="p"
                                FontSize="sm"
                              />
                            </div>
                            {Ischecked && (
                              <div className="mt-[20px] flex justify-center">
                                <div className="w-[191px]">
                                  <Button label="Add  Penality" size="small" />
                                </div>
                              </div>
                            )}

                            {!Ischecked && <ExcludedStructure formik={formik} milestoneId={milestoneId} element={element} index={index} />}
                          </div>
                        )}

                        <div className="flex justify-between bg-primary-600 p-[10px] m-5   rounded-[5px] border-[1px] border-text-gray-50 ">
                          <Typography
                            label={"Success Bonus"}
                            FontSize="sm"
                            type="p"
                            classname="text-text-HeadLine-100 "
                          />
                          <Button
                            variant="line"
                            icon={
                              FAQRoyality ? (
                                <img src="/Assets/FAQOpen.svg" alt="Open FAQ" />
                              ) : (
                                <img
                                  src="/Assets/FAQClose.svg"
                                  alt="Open FAQ"
                                />
                              )
                            }
                            label=""
                            onClick={HandleFAQRoyality}
                          />
                        </div>
                        {FAQRoyality && openIndex === index ? (
                          <div className="px-5 pb-5 relative ">
                            <Option
                              placeholder="select"
                              Title={"Success Bonus Type"}
                              options={[
                                "Prepayment Success Bonus",
                                "Prepayment Success Bonus",
                              ]}
                            />
                            {formik.touched.mileStones?.[milestoneId]
                              ?.subMilestones?.[index]?.royalty.royaltyType &&
                              formik.errors.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.royalty.royaltyType && (
                                <HelperText
                                  position="right"
                                  label={
                                    formik.errors.mileStones?.[milestoneId]
                                      ?.subMilestones?.[index]?.royalty.royaltyType
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

                            <div className="mt-[10px]">
                              <Typography
                                label={"Success Bonus (in percent)"}
                                type="p"
                                color="primary"
                                variant={200}
                                FontSize="sm"
                                classname="font-bold "
                              />
                              <Textfield
                                name={`mileStones[${milestoneId}].subMilestones[${index}].royalty.royalties`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={element.royalty?.royalties}
                                placeHolder="Enter Royalties in percent" />
                              {formik.touched.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.royalty.royalties &&
                                formik.errors.mileStones?.[milestoneId]
                                  ?.subMilestones?.[index]?.royalty.royalties && (
                                  <HelperText
                                    position="right"
                                    label={
                                      formik.errors.mileStones?.[milestoneId]
                                        ?.subMilestones?.[index]?.royalty.royalties
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

                            <div className="mt-[20px] flex justify-between space-x-2 ">
                              <div className="flex">
                                <img src="/Assets/People/AssignIpTo.png" alt=""/>
                                <div className="w-[113px]">
                                  <Button
                                    label="Assign IP"
                                    size="small"
                                    variant="Transparent"
                                    color="secondary"
                                    icon={<img src="/Assets/AssignIp.svg" alt="" />}
                                  />
                                </div>
                              </div>
                              <div className=" flex gap-5 ">
                                <div className="w-[191px]">
                                  <Button
                                    label="Discard milestone"
                                    size="small"
                                    variant="Transparent"
                                    color="secondary"
                                  />
                                </div>
                                <div className="w-[120px]">
                                  <Button
                                    type="submit"
                                    label="Save Milestone"
                                    // disable={true}
                                    className="bg-transparent border-[2px] border-text-gray-50 text-text-gray-50"
                                    size="small"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            <div className="flex justify-center mt-4">
              <div className="w-[250px]">
                <Button
                  label="Add Sub-Milestones"
                  size="small"
                  onClick={AddMileStone}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-[100px]">
                <Button
                  onClick={close}
                  label="Discard"
                  size="small"
                  variant="Transparent"
                  color="secondary"
                />
              </div>
              <div className="w-[100px]">
                <Button label="save" size="small" />
              </div>
            </div>
          </form>
        </div>
      }
    />
  );
};

export default SubMileStoneDetails;
