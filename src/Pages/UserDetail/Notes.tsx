import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
  Button,
  HelperText,
  Textfield,
  Typography,
} from "../../Components/Atoms";
import { messages } from "../../Constants/messages";
import { handleCustomError, showToast } from "../../Utils/helper";
import { UPDATE_SHORTLIST_PROVIDER_LIST } from "../../sevices";

const Notes = ({ provideDetails, setProviderDetails }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [iseditNotes , setIsEditNotes] = useState(false)
  let formik = useFormik({
    initialValues: {
      note: "",
    },
    validationSchema: Yup.object({
      note: Yup.string()
        .required("Required")
        .min(5, messages.ENTER_MIN_CHAR),
    }),
    onSubmit: (value, { resetForm }) => {
      handleSaveNote();
      resetForm();
    },
  });

  async function handleSaveNote() {
    try {
      setIsLoading(true);
      let body = {
        providerId: provideDetails?.id,
        note: formik.values.note,
      };
      let res = await UPDATE_SHORTLIST_PROVIDER_LIST(body);
      setProviderDetails({
        ...provideDetails,
        ProviderListMember: [res?.data],
      });
      setIsEditNotes(false)
      showToast("Note Saved", "success");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleEditNotes(){
    setIsEditNotes(true)
    formik.setFieldValue('note',provideDetails?.ProviderListMember[0]?.note)
  }

  return (
    <div className=" shadow-navbar rounded-[5px] pb-[14px] ">
      <div className="pt-[10px] pb-[10px] pl-[20px] border-b-[1px] border-text-gray-50">
        <Typography
          label={"Notes"}
          color="primary"
          variant={200}
          classname="font-bold "
          FontSize="sm"
          type="p"
        />
      </div>
      {(provideDetails?.ProviderListMember.length === 0 || provideDetails?.ProviderListMember[0]?.note === null) || iseditNotes  ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="pt-[10px] pr-[20px] pl-[20px]">
            <Textfield
              multiline
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.note}
              placeHolder="Enter Notes"
              name="note"
            ></Textfield>
            {formik.touched.note && formik.errors.note && (
              <HelperText
                position="right"
                label={formik.errors.note}
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
          <div className="flex justify-center mt-[20px]">
            <div className="w-[100px]">
              <Button
                type="submit"
                label="Save"
                size="small"
                disable={isLoading}
              />
            </div>
          </div>
        </form>
      ) : (
        <div className="pt-[10px] pr-[20px] pl-[20px]">
          <div >
            <Typography
              label={provideDetails?.ProviderListMember[0]?.note}
              color="primary"
              variant={300}
              FontSize="sm"
              type="p"
              classname="capitalize"
              />
          </div>
          <Button                
                label="Edit"
                size="small"
                disable={isLoading}
                onClick={handleEditNotes}
                className="!w-fit m-auto mt-5 px-4"
              />
        </div>
      )}
    </div>
  );
};

export default Notes;
