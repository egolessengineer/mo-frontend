import {
  Button,
  Typography
} from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";

const IndivdualProviderList = ({
  open,
  close,
  formik,
  handleSave,
  viewProjectData,
  assignIpIndex,
}: any) => {
  const { ProjectMembers } = viewProjectData;
  const dataProvider = [...ProjectMembers.IP];

  const isSelected = (targetId: any) => {
    return formik.values.subMileStones[assignIpIndex].AssignedTo?.id === targetId;
  };

  const handleToggleUser = (targetId: any) => {
    const newAssignedTo = isSelected(targetId) ? "" : targetId;
    const selectedUserDetails = dataProvider.find(
      (user: any) => user.userId === newAssignedTo
    );
    formik.setFieldValue(
      `subMileStones[${assignIpIndex}].AssignedTo`, {
      id: newAssignedTo,
      name: selectedUserDetails?.User?.About?.name,
      profileLink: selectedUserDetails?.User?.About?.profilePictureLink || ""

    }
    );
  };

  return (
    <ModalAtom
      Title={
        <div className="h-[50px] bg-primary-100 flex justify-between items-center pr-4 flex-row">
          <Typography
            label="Assign Provider"
            type="h1"
            classname="text-white font-bold pl-[15px] "
            FontSize="base"
          />
          <Button
            label=""
            icon={<img src="/Assets/Close.svg" />}
            variant="line"
            className="pr-[15px] w-[20px] h-[20px] "
            onClick={close}
          />
        </div>
      }
      description={
        <>
          {" "}
          <div className=" flex flex-col-reverse  lg:flex-row p-5 mt-[26px] gap-5 max-h-[90vh] overflow-auto-y">
            <div className="lg:w-[66%] w-full">
              <div className="flex justify-between border-b-[1px] border-text-gray-50 ">
                <Typography
                  label="Provider’s List"
                  type="h2"
                  color="primary"
                  variant={300}
                  classname="font-bold "
                  FontSize="sm"
                />
              </div>
              <div
                id="scrollableDiv"
                className="flex flex-col rounded-[5px]  shadow-navbar overflow-x-hidden overflow-y-scroll h-[370px]"
              >
                {dataProvider && dataProvider.length === 0 ? <div className="text-center mt-5">No Data</div> : dataProvider &&
                  dataProvider.length > 0 &&
                  dataProvider.map((Element: any, index: any) => {
                    let id = Element?.userId || "";

                    return (
                      <div
                        key={id}
                        className="h-[74px]   border-b-[1px] border-text-gray-50 flex"
                      >
                        <div className="mt-[10px] ml-[10px] mb-[14px]  ">
                          <div className="w-[50px] h-full capitalize bg-text-HeadLine-100 rounded-full flex justify-center items-center text-xl font-bold text-white">
                            {Element.User.name.trim().charAt(0)}
                          </div>
                        </div>
                        <div className="flex flex-col pl-[13px] pt-[9px] w-[100%]">
                          <Typography
                            label={Element.User.name}
                            type="p"
                            FontSize="base"
                            color="primary"
                            variant={200}
                            classname="font-medium leading-6 capitalize"
                          />
                          <Typography
                            label={
                              Element.User.Experiences &&
                                Element.User.Experiences.length > 0 &&
                                Element.User.Experiences[
                                  Element.User.Experiences.length - 1
                                ]?.position
                                ? Element.User.Experiences[
                                  Element.User.Experiences.length - 1
                                ]?.position
                                : ""
                            }
                            type="p"
                            FontSize="xs"
                            color="primary"
                            variant={300}
                            classname=" leading-4 uppercase"
                          />
                          <div className="flex">
                            <Typography
                              label="ID:"
                              type="p"
                              FontSize="xs"
                              color="primary"
                              variant={300}
                              classname=" leading-4 "
                            />
                            <Typography
                              label={id}
                              type="p"
                              FontSize="xs"
                              color="primary"
                              variant={300}
                              classname=" leading-4 "
                            />
                          </div>
                        </div>
                        <div className="flex justify-end items-center m-[20px]">
                          <div className="w-[131px]">
                            <Button
                              onClick={() => handleToggleUser(Element?.userId)}
                              label={
                                isSelected(Element?.userId)
                                  ? "Deselect"
                                  : "Select"
                              }
                              variant="Transparent"
                              color="secondary"
                              size="small"
                              className=""
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="flex justify-end  p-5">
            <div className="w-[100px]">
              <Button
                onClick={handleSave}
                label="Save"
                size="small"
                variant="standard"
                color="primary"
              />
            </div>
          </div>
        </>
      }
      PanelPosition={"lg:w-[1178px] w-full  shadow-popUps  overflow-y-auto"}
      open={open}
    />
  );
};

export default IndivdualProviderList;
