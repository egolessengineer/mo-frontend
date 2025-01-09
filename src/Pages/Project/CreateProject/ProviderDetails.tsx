import { useState } from "react";
import {
  Button,
  HelperText,
  Typography,
} from "../../../Components/Atoms";
import AddProviderModal from "./Popups/AddProviderModal";

const ProviderDetails = (props: any) => {
  const [modalStatus, setmodalStatus] = useState(false);

  const {
    formik,
    handleBack,
    isLoading,
  } = props;

  const openModal = () => {
    setmodalStatus((prev) => !prev);
  };
  const closeModal = () => {
    setmodalStatus(false);
  };

  return (
    <>
      {modalStatus && (
        <AddProviderModal
          open={modalStatus}
          close={closeModal}
          indexFormik={formik}
        />
      )}
      <form
        className="flex flex-col flex-grow justify-between"
        onSubmit={formik.handleSubmit}
      >
        <div className=" flex flex-col items-center mt-[10px] ">
          <div className="lg:w-[828px] w-full shadow-navbar rounded-[5px]">
            <div className="pt-5 px-5 pb-[10px] border-b-[1px] border-text-gray-50">
              <Typography
                classname="text-text-HeadLine-50 font-bold leading-6 "
                type="h2"
                label="Assign Provider"
                FontSize="base"
              />
            </div>
            <div className="p-[20px]">
              <div className="flex justify-between">
                <div>
                  <Typography
                    label="Project Title"
                    type="h3"
                    FontSize="sm"
                    color="primary"
                    classname="font-bold leading-5 "
                    variant={200}
                  />
                  <Typography
                    label={formik.values.title}
                    type="p"
                    color="primary"
                    classname="leading-5 mt-[3px] "
                    FontSize="sm"
                    variant={300}
                  />
                </div>
                <div className="text-right ">
                  <Typography
                    label="Category"
                    type="h3"
                    FontSize="sm"
                    color="primary"
                    classname="font-bold leading-5 "
                    variant={200}
                  />
                  <Typography
                    label={formik.values.category}
                    type="p"
                    color="primary"
                    classname="leading-5 mt-[3px] "
                    FontSize="sm"
                    variant={300}
                  />
                </div>
              </div>
              <div className="mt-[10px]">
                <Typography
                  label="Scope"
                  type="h3"
                  FontSize="sm"
                  color="primary"
                  classname="font-bold leading-5 "
                  variant={200}
                />
                <Typography
                  label={formik.values.scope}
                  type="p"
                  color="primary"
                  classname="leading-5 mt-[3px] "
                  FontSize="sm"
                  variant={300}
                />
              </div>
              <div className="mt-[10px] ">
                <div className="flex">
                  <Typography
                    label="Provider"
                    type="h3"
                    FontSize="sm"
                    color="primary"
                    classname="font-bold leading-5 "
                    variant={200}
                  />
                </div>

                <div className="h-[40px] mt-[2px] relative">
                  <div className="w-full h-full border-2 rounded-md flex items-center gap-3 pl-3">
                    {formik.values.provider?.name &&
                      <>
                        <Typography
                          label={formik.values.provider?.name || ""}
                          type="h3"
                          FontSize="sm"
                          color="primary"
                          classname="font-bold leading-5 "
                          variant={200}
                        />
                        <HelperText
                          className="cursor-pointer"
                          onClick={() =>
                            formik.setFieldValue('provider',
                              { id: '', name: '' }
                            )
                          }
                          label=""
                          icon={
                            <img
                              src="/Assets/Error.svg"
                              className="mt-[3px]"
                              alt="remove"
                            />
                          }
                        />
                      </>
                    }
                  </div>

                </div>
                {formik.errors.provider && (
                  <HelperText
                    position="right"
                    label={formik.errors.provider?.name}
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
            <div className="flex justify-center">
              <div className="w-[132px] pb-[20px] ">
                <Button
                  variant="standard"
                  color="primary"
                  label="Add Provider"
                  size="small"
                  onClick={openModal}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between m-[20px]">
          <div className="w-[100px]">
            <Button
              variant="Transparent"
              color="secondary"
              label="Back"
              size="small"
              onClick={handleBack}
            />
          </div>
          <div>
            <div className="w-[100px]">
              <Button
                variant="standard"
                color="primary"
                label="Save"
                size="small"
                type="submit"
                disable={isLoading}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProviderDetails;
