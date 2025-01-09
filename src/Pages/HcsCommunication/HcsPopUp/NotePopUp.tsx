import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button, HelperText, Textfield, Typography } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";

const NotePopUp = ({ open, close, note, user, formik, isLoading }: any) => {
  let history = useNavigate();
  const Handle = () => {
    history("/hcs-communication");
    close();
  };

  
  return (
    <ModalAtom    
      close={close}
      Title={
        <div className="flex justify-between bg-primary-100 px-5 py-4">
          <Typography
            label={"Note"}
            type="p"
            FontSize="base"
            classname="font-bold text-white "
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
        <>
          <form
            onSubmit={formik.handleSubmit}
            className="px-5 pt-[10px] pb-5 flex justify-between items-center gap-5"
          >
            <div className="flex-grow">
              <Textfield
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.replymsg}
                placeHolder="Enter Reply message"
                name="replymsg"
                className="w-full"
              />
              {formik.touched.replymsg && formik.errors.replymsg && (
              <HelperText
                position="right"
                label={formik.errors.replymsg}
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
            <div className="w-[100px]">
              <Button
                type="submit"
                label="Reply"
                size="small"
                disable={isLoading}                
              />
            </div>
          </form>
          <div className={`px-5 pt-[10px] pb-5 ${note?.Notes && note?.Notes.length > 1 ? "h-[300px]" : 'h-fit'} min-h-fit max-h-fit overflow-y-auto`}>
            {note?.Notes.length === 0?(
              <div className="p-5 text-center">No Reply</div>
            ) : (

              note?.Notes.map((notedetails: any, idx: any) => {
                return (
                  <div key={idx} className="shadow-navbar rounded-[5px] p-5">
                    <div className="flex gap-x-[10px]">
                      <div className="min-w-[80px] w-[80px] min-h-[80px] h-[80px]">
                        <img
                          src={notedetails?.From?.About?.profilePictureLink}
                          className="rounded-full w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                      <div>
                        <Typography
                          label={`${
                            user?.id === notedetails?.From?.id
                              ? "You"
                              : `${notedetails?.From?.name}`
                          } sent a note to ${
                            user?.id === notedetails?.To?.id
                              ? "You"
                              : `${notedetails?.To?.name}`
                          }`}
                          color="primary"
                          variant={200}
                          classname="font-medium "
                          type="p"
                          FontSize="base"
                        />
                        <Typography
                          label={notedetails?.message}
                          color="primary"
                          variant={300}
                          type="p"
                          FontSize="sm"
                        />
                        <Typography
                          label={moment(notedetails?.createdAt).format(
                            "DD-MM-YY, h:mm:ss a"
                          )}
                          color="primary"
                          variant={300}
                          type="p"
                          FontSize="xxs"
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            <div className="flex justify-between mt-[10px]">
              <div>
                <Button
                  label="Note History"
                  variant="Transparent"
                  color="secondary"
                  size="small"
                  onClick={Handle}
                />
              </div>
            </div>
          </div>
        </>
      }
      PanelPosition={"w-[500px]"}
      open={open}
    />
  );
};

export default NotePopUp;
