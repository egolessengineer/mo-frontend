import { Button, HelperText, Textfield, Typography } from "../../../../Components/Atoms";
import { Option } from "../../../../Components/Molecules";

const ExcludedStructure = ({formik,milestoneId,index,element}:any) => {
  return (
    <div>
      <div className="flex justify-between mt-[10px]">
        <div className="relative">
          <Option
            placeholder="select"
            options={["percent", "addition"]}
            Title={"Penalty Value in"}
            optionsClassName="w-[384px]"
            buttonClassName="w-[384px] "
          />
          {formik.touched.mileStones?.[milestoneId]
                              ?.subMilestones?.[index]?.penalty.penaltyValue &&
                              formik.errors.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.penalty.penaltyValue && (
                                <HelperText
                                  position="right"
                                  label={
                                    formik.errors.mileStones?.[milestoneId]
                                    ?.subMilestones?.[index]?.penalty.penaltyValue
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
            <Option
            placeholder="select"
              options={["Hour", "Burn"]}
              Title={"Duration"}
              style={{ zIndex: "999" }}
              optionsClassName="w-[384px]"
              buttonClassName="w-[384px] "
            />
            {formik.touched.mileStones?.[milestoneId]
                              ?.subMilestones?.[index]?.penalty.duration &&
                              formik.errors.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.penalty.duration && (
                                <HelperText
                                  position="right"
                                  label={
                                    formik.errors.mileStones?.[milestoneId]
                                    ?.subMilestones?.[index]?.penalty.duration
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
        <div className=" p-[10px] border-[1px] border-text-primary-50 h-[69px] rounded-[5px]">
          <div className="flex justify-center">
            <Typography
              label={"Rule of Breaches"}
              classname="font-bold text-text-danger-100 "
              FontSize="base"
              type="p"
            />
          </div>
          <Typography
            label={"Add values to breaches to see the Rules of Breaches"}
            classname=""
            color="primary"
            variant={300}
            FontSize="sm"
            type="p"
          />
        </div>
      </div>
      <div className="mt-5 border-b-[1px] border-text-gray-50">
        <Typography
          label={"1st Breach"}
          type="p"
          classname="font-bold text-text-HeadLine-100 "
          FontSize="sm"
        />
      </div>
      <div className="mt-[10px] relative">
        <Option placeholder="select" Title="Select" options={["send warning"]} />
        {formik.touched.mileStones?.[milestoneId]
                              ?.subMilestones?.[index]?.penalty.breach.select &&
                              formik.errors.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.penalty.breach.select && (
                                <HelperText
                                  position="right"
                                  label={
                                    formik.errors.mileStones?.[milestoneId]
                                    ?.subMilestones?.[index]?.penalty.breach.select
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
      <div className="flex space-x-5 mt-[10px]">
        <div className="w-[50%]">
          <Typography
            label={"Penality"}
            color="primary"
            variant={200}
            classname="font-bold "
            type="p"
            FontSize="sm"
          />
          <Textfield 
           className=""
           name={`mileStones[${milestoneId}].subMilestones[${index}].penalty.breach.penality`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={element.penalty.breach.penality}
            placeHolder="0" />
          {formik.touched.mileStones?.[milestoneId]
                              ?.subMilestones?.[index]?.penalty.breach.penality &&
                              formik.errors.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.penalty.breach.penality && (
                                <HelperText
                                  position="right"
                                  label={
                                    formik.errors.mileStones?.[milestoneId]
                                    ?.subMilestones?.[index]?.penalty.breach.penality
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
            label={"Time Period"}
            color="primary"
            variant={200}
            classname="font-bold "
            type="p"
            FontSize="sm"
          />
          <Textfield className=""
          name={`mileStones[${milestoneId}].subMilestones[${index}].penalty.breach.timePeriod`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={element.penalty.breach.timePeriod}
          placeHolder="0 Hour - 2 Hours" />
          {formik.touched.mileStones?.[milestoneId]
                              ?.subMilestones?.[index]?.penalty.breach.timePeriod &&
                              formik.errors.mileStones?.[milestoneId]
                                ?.subMilestones?.[index]?.penalty.breach.timePeriod && (
                                <HelperText
                                  position="right"
                                  label={
                                    formik.errors.mileStones?.[milestoneId]
                                    ?.subMilestones?.[index]?.penalty.breach.timePeriod
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
      <div className="flex justify-center mt-5 space-x-5">
        <div className="w-[145px]">
          <Button
            label="Discard Breach"
            variant="Transparent"
            color="secondary"
            size="small"
          />
        </div>
        <div className="w-[153px]">
          <Button label="Add Breach Rule" size="small" />
        </div>
      </div>
    </div>
  );
};

export default ExcludedStructure;
