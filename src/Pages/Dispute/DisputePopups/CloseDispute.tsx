import React from "react";
import { ModalAtom } from "../../../Components/Molecules";
import {
  Typography,
  Button,
  Textfield,
  HelperText,
  CheckBoxAtom,
} from "../../../Components/Atoms";

const CloseDispute = ({ open, close, formik , role}: any) => {
  return (
    <ModalAtom
      Title={
        <div className="bg-primary-100 flex justify-between px-[20px] py-[15px] rounded-t-[5px]">
          <Typography
            label={"Close Dispute"}
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
      description={
        <form onSubmit={formik.handleSubmit} className="px-[20px] py-[20px]">
          <Typography
            label={"Add Comment (if any)"}
            color="primary"
            variant={200}
            classname="font-bold "
            FontSize="sm"
            type="p"
          />
          <Textfield
            name="closeComment"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.closeComment}
            multiline={true}
            placeHolder="Enter Comment"
          />
          {formik.touched.closeComment && formik.errors.closeComment && (
            <HelperText
              position="right"
              label={formik.errors.closeComment}
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
          {role !== "ADMIN" && <div className="mt-3">
            <CheckBoxAtom
              Onchange={(e: any) => {
                const { checked } = e.target;
                formik.handleChange(e);
                if (!checked) {
                  formik.setFieldValue("closed", null);
                }
              }}
              checked={formik.values.closed}
              Name="closed"
              label={
                <label
                  htmlFor="checkbox"
                  className="text-text-primary-300 text-xxs capitalize"
                >
                  please confirm that the dispute raised by you has been
                  resolved between the parties involved. By confirming, you
                  acknowledge that the matter has been satisfactorily addressed
                  and the dispute can be officially closed.
                </label>
              }
            />
            {formik.touched.closed && formik.errors.closed && (
              <HelperText
                position="right"
                label={formik.errors.closed}
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
          </div>}
          <div className="flex justify-between mt-[20px]">
            <div className="w-[100px]">
              <Button
                label="Cancel"
                color="secondary"
                variant="Transparent"
                onClick={close}
                size="small"
              />
            </div>
            <div className="w-[147px]">
              <Button type="submit" label="Send and Close" size="small" />
            </div>
          </div>
        </form>
      }
      PanelPosition={"w-[868px]"}
      open={open}
    />
  );
};

export default CloseDispute;
