import {
  Button,
  HelperText,
  Textfield,
  Typography,
} from "../../../Components/Atoms";
import CustomDropdown from "../../../Components/Molecules/Structure/CustomDropdown";

const ProjectDetails = (props: any) => {
  const {
    formik,
    handleNumberInputChange,
    isLoading,
  } = props;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex  flex-col items-center mt-[12px]  ">
        <div className="lg:w-[828px] md:w-[628px] sm:w-[520px] w-[350px] shadow-navbar  rounded-[5px] ">
          <div className="border-b-[1px] border-text-primary-100-[1px] border-text-primary-100 px-5 pt-5 pb-[10px] ">
            <Typography
              label="Project Details"
              type="h2"
              FontSize="base"
              classname="text-text-HeadLine-100 font-bold leading-6 "
            />
          </div>
          <div className="pt-[10px] px-5  pb-9">
            <div className="flex md:space-x-[20px] md:flex-wrap xs:flex-col md:flex-row items-start">
              <div className="w-[320px] md:w-[384px] ">
                <Typography
                  label="Title"
                  type="p"
                  FontSize="sm"
                  color="primary"
                  variant={200}
                  classname="font-bold "
                />

                <Textfield
                  placeHolder="Title of project"
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  disable={isLoading}
                />
                {formik.touched.title && formik.errors.title && (
                  <HelperText
                    position="right"
                    label={formik.errors.title}
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
              <div className="w-[320px] md:w-[384px] self-start ">
                <div className="relative">
                  <CustomDropdown
                    Title="Select Category"
                    placeHolder={formik.values.category}
                    value={formik.values.category}
                    onChange={(selected) => {
                      formik.setFieldValue("category", selected);
                    }}
                    options={[
                      "DESIGN",
                      "RESEARCH",
                      "DEVELOPMENT",
                      "TESTING",
                      "OTHER",
                    ]}
                  />
                  {formik.touched.category && formik.errors.category && (
                    <HelperText
                      position="right"
                      label={formik.errors.category}
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
            <div className="flex md:space-x-[20px] mt-[10px] xs:flex-col md:flex-row items-start">
              <div className="w-[320px] md:w-[384px] ">
                <Typography
                  label="Project Duration"
                  type="p"
                  FontSize="sm"
                  color="primary"
                  variant={200}
                  classname="font-bold "
                />

                <Textfield
                  placeHolder="Define duration of project"
                  name="duration"
                  onChange={(e: any) => handleNumberInputChange(e, "duration")}
                  onBlur={formik.handleBlur}
                  value={formik.values.duration}
                  disable={isLoading}
                />
                {formik.touched.duration && formik.errors.duration && (
                  <HelperText
                    position="right"
                    label={formik.errors.duration}
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
              <div className="w-[320px] md:w-[384px] self-start">
                <div className="relative">
                  <CustomDropdown
                    Title="Project Duration Type"
                    placeHolder={formik.values.durationType}
                    value={formik.values.durationType}
                    onChange={(selected) => {
                      formik.setFieldValue("durationType", selected);
                    }}
                    options={["Days", "Weeks", "Months", "Year"]}
                  />
                  {formik.touched.durationType &&
                    formik.errors.durationType && (
                      <HelperText
                        position="right"
                        label={formik.errors.durationType}
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
            <div className="flex md:space-x-[20px] mt-[10px] xs:flex-col md:flex-row items-start">
              <div className="w-[320px] md:w-[384px] ">
                <Typography
                  label="Total Project Fund"
                  type="p"
                  FontSize="sm"
                  color="primary"
                  variant={200}
                  classname="font-bold "
                />
                <Textfield
                  placeHolder="Allocate fund to this project"
                  name="totalProjectFund"
                  onChange={(e: any) =>
                    handleNumberInputChange(e, "totalProjectFund")
                  }
                  onBlur={formik.handleBlur}
                  value={formik.values.totalProjectFund}
                  disable={isLoading}
                />
                {formik.touched.totalProjectFund &&
                  formik.errors.totalProjectFund && (
                    <HelperText
                      position="right"
                      label={formik.errors.totalProjectFund}
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
              <div className="w-[320px] md:w-[384px] self-start">
                <div className="relative">
                  <CustomDropdown
                    placeHolder={formik.values.currency}
                    Title="Select Currency"
                    value={formik.values.currency}
                    onChange={(selected) => {
                      formik.setFieldValue("currency", selected);
                    }}
                    options={["HBAR", "USDC"]}
                  />
                  {formik.touched.currency && formik.errors.currency && (
                    <HelperText
                      position="right"
                      label={formik.errors.currency}
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

            <div className="h-[128px] mt-[10px]">
              <Typography
                label="Project Scope"
                type="p"
                FontSize="sm"
                color="primary"
                variant={200}
                classname="font-bold "
              />

              <Textfield
                placeHolder="Define project scope of project"
                multiline={true}
                name="scope"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.scope}
                disable={isLoading}
              />
              {formik.touched.scope && formik.errors.scope && (
                <HelperText
                  position="right"
                  label={formik.errors.scope}
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
            <div className="h-[128px] mt-[10px]">
              <Typography
                label="Deliverables"
                type="p"
                FontSize="sm"
                color="primary"
                variant={200}
                classname="font-bold "
              />

              <Textfield
                placeHolder="Define project deliverables"
                multiline={true}
                name="deliverables"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.deliverables}
                disable={isLoading}
              />
              {formik.touched.deliverables && formik.errors.deliverables && (
                <HelperText
                  position="right"
                  label={formik.errors.deliverables}
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
            <div className="w-[320px] mt-[10px] md:w-[384px] ">
              <Typography
                label="Royalty"
                type="p"
                FontSize="sm"
                color="primary"
                variant={200}
                classname="font-bold "
              />

              <Textfield
                placeHolder="Define royalty on project"
                name="postKpiRoyalty"
                onChange={(e: any) => handleNumberInputChange(e, "postKpiRoyalty")}
                onBlur={formik.handleBlur}
                value={formik.values.postKpiRoyalty}
                disable={isLoading}
              />
              {formik.touched.postKpiRoyalty && formik.errors.postKpiRoyalty && (
                <HelperText
                  position="right"
                  label={formik.errors.postKpiRoyalty}
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

        <div className="flex mt-[20px] md:space-x-[20px] xs:space-y-[20px] md:space-y-[0px] xs:flex-col xs:items-center md:flex-row">
          <div className="shadow-navbar md:w-[404px] w-full rounded-[5px] h-[250px] ">
            <div className=" pt-[20px] pb-[10px] pl-[20px] border-b-[1px] border-text-primary-100-2">
              <Typography
                label="Release fund from Wallet to ESCROW"
                type="h2"
                classname="text-text-HeadLine-100 font-bold leading-6 "
                FontSize="base"
              />
            </div>
            <div className="p-[20px]">
              <div className="relative">
                <CustomDropdown
                  placeHolder={formik.values.assignedFundTo}
                  Title="Fund Release Type"
                  value={formik.values.assignedFundTo}
                  onChange={(selected) => {
                    formik.setFieldValue("assignedFundTo", selected);
                  }}
                  options={[
                    { key: "PROJECT", value: "Entire Project" },
                    { key: "MILESTONE", value: "Each Milestone" },
                  ]}
                  buttonClassName="md:w-[364px] w-[320px] h-[40px] border broder-[1px] border-text-gray-50 rounded-[5px] text-text-primary-300 outline-none  text-sm flex justify-between items-center p-[10px]"
                  optionsClassName="absolute top-[62px] z-50 w-full bg-white rounded-[5px] shadow-navbar"
                />
                {formik.touched.assignedFundTo &&
                  formik.errors.assignedFundTo && (
                    <HelperText
                      position="right"
                      label={formik.errors.assignedFundTo}
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
            <br />
            <br />
            <br />
          </div>
          <div className="shadow-navbar md:w-[404px] w-full rounded-[5px] h-[250px] ">
            <div className=" pt-[20px] pb-[10px] pl-[20px] border-b-[1px] border-text-primary-100-2">
              <Typography
                label="Release fund from ESCROW to CP"
                type="h2"
                classname="text-text-HeadLine-100 font-bold leading-6 "
                FontSize="base"
              />
            </div>
            <div className="p-[20px] ">
              <Typography
                label="Assign Fund to"
                type="p"
                FontSize="sm"
                color="primary"
                variant={200}
                classname="font-bold  "
              />
              <Textfield
                value={
                  formik.values.assignedFundTo &&
                    formik.values.assignedFundTo !== ""
                    ? formik.values.assignedFundTo
                    : "Select"
                }
                disable={true}
                className=" text-text-primary-300 f"
              />

              <div className="relative pt-5">
                <CustomDropdown
                  placeHolder={formik.values.fundTransferType}
                  Title="Fund Transfer Type"
                  value={formik.values.fundTransferType}
                  onChange={(selected) => {
                    formik.setFieldValue("fundTransferType", selected);
                  }}
                  options={[
                    {
                      key: "ProjectCompleted",
                      value: "When Project is Completed",
                    },
                    {
                      key: "MilestoneCompleted",
                      value: "When Milestone is Completed",
                    },
                  ]}
                  buttonClassName="md:w-[364px] w-[320px] h-[40px] border broder-[1px] border-text-gray-50 rounded-[5px] text-text-primary-300 outline-none  text-sm flex justify-between items-center p-[10px]"
                  optionsClassName="absolute top-[62px] z-50 w-full bg-white rounded-[5px] shadow-navbar"
                />
                {formik.touched.fundTransferType &&
                  formik.errors.fundTransferType && (
                    <HelperText
                      position="right"
                      label={formik.errors.fundTransferType}
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
      </div>
      <div className="mt-[20px] mb-[20px] flex justify-center lg:justify-end ">
        <div className="w-[167px]">
          <Button
            label="Continue"
            variant="standard"
            color="primary"
            size="small"
            type="submit"
            loading={isLoading}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
    </form>
  );
};

export default ProjectDetails;
