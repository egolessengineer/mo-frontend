import { useEffect, useState } from "react";
import {
  Button,
  HelperText,
  Typography
} from "../../Components/Atoms";
import { ModalAtom, Option } from "../../Components/Molecules";
import { handleCustomError } from "../../Utils/helper";
import { GET_TEAM } from "../../sevices";

export const SelectTeamPopup = ({ open, close, formik, loader }: any) => {
  const [teamOption, setTeamOption] = useState<any>();

  async function handleGetTeam() {
    try {
      let res = await GET_TEAM();
      setTeamOption(res?.data);
    } catch (error: any) {
      handleCustomError(error);
    }
  }

  useEffect(() => {
    handleGetTeam();
  }, []);

  return (
    <ModalAtom
      close={close}
      Title={
        <div className="flex justify-between bg-primary-100 rounded-t-[5px]  ">
          <Typography
            label="Select Team"
            type="h3"
            classname="font-bold text-white pt-[15px] pr-[20px] pb-[15px] pl-[20px] "
            FontSize="base"
          />
          <div className="mt-[12px] mr-[20px]">
            <Button
              variant="line"
              icon={<img src="/Assets/Close.svg" alt="" />}
              label=""
              onClick={() => {
                close();
              }}
              size="small"
            />
          </div>
        </div>
      }
      description={
        <form onSubmit={formik.handleSubmit} className="p-5">
          <div className="mt-[18px] relative">
            <Option
              value={formik.values.teamName}
              placeholder="Select"
              handledropDown={(e: any) => {
                formik.setFieldValue("teamId", e.id);
                formik.setFieldValue("teamName", e.name);
              }}
              Title={
                <Typography
                  label="Select Team"
                  type="p"
                  FontSize="sm"
                  color="primary"
                  variant={200}
                />
              }
              options={teamOption && [...teamOption]}
              optionLabel="name"
              buttonClassName="w-full"
            />
            {formik.touched.teamId && formik.errors.teamId && (
              <HelperText
                position="right"
                label={formik.errors.teamId}
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
          <div className="flex flex-row justify-between items-center gap-5 mt-5">
            <Button
              label="Cancel"
              variant="Transparent"
              color="secondary"
              size="small"
              onClick={close}
            />
            <Button
              type="submit"
              label="Add To Team"
              variant="Transparent"
              color="secondary"
              size="small"
              disable={loader}
            />
          </div>
        </form>
      }
      PanelPosition={"w-[50%]"}
      open={open}
    />
  );
};
