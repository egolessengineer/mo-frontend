import moment from "moment";
import { Button, Textfield, Typography } from "../../Components/Atoms";
import { Loader } from "../../Components/Atoms/Loader";
import { Option } from "../../Components/Molecules";
import NotePopUp from "./HcsPopUp/NotePopUp";

const NoteHistory = ({
  project,
  projectDetails,
  setProjectDetails,
  projectsNotes,
  isLoading,
  userDetails,
  note,
  setReplyNotes,
  notepopup,
  setNotepopup,
  formik,
  searchval , 
  setSearchVal
}: any) => {
  const CloseNoteReply = () => {
    setNotepopup(false);
  };

  const OpenNoteReply = (rpNotes: any) => {
    setReplyNotes(rpNotes);
    setNotepopup(true);
  };

  return (
    <div className="shadow-navbar rounded-[5px]">
      <div className="flex justify-between p-5 border-b-[1px] border-text-gray-50 gap-5">
        <div className="relative w-[25%]">
          <Option
            Title={""}
            placeholder={!projectDetails ?"No Data" :"Select"}
            handledropDown={(e: any) => {              
              setProjectDetails(e);
            }}
            style={{ border: "1px solid #00B7FD" }}
            icon={<img src="/Assets/BlueDropDown.svg" alt="" />}
            options={project && project}
            value={projectDetails?.title}
            optionLabel="title"
            disabled={!projectDetails ? true : false}
          />
        </div>
        <div className="lg:w-[603px] lg:h-[32px]  flex-1">
          <Textfield
            type="search"
            value={searchval}
            onChange={(e:any)=>setSearchVal(e.target.value)}
            placeHolder="Search freelancer/projects"
            rightIcon={
              <img
                src="/Assets/Search.svg"
                height="36px"
                width="36px"
                className="rounded-[5px] mt-[1.5px]"
                alt=""
              />
            }
          />
        </div>
       
      </div>
      {isLoading ? (
        <Loader />
      ) : (projectsNotes && Object.keys(projectsNotes).length === 0) || !projectDetails ? (
        <div className="text-center p-5">No Data</div>
      ) : (
        projectsNotes &&
        Object.keys(projectsNotes).map((keyname, index) => {
          return <div className="" key={keyname + index}>
              <div className="p-5">
                <Typography
                  classname="font-bold text-text-HeadLine-100 "
                  label={keyname}
                  FontSize="2xl"
                  type="p"
                />
              </div>
              {projectsNotes[keyname].map((notes: any, idx: any) => {
                return (
                  <div key={notes?.id} className="mt-[10px] flex justify-between border-b-[1px] border-text-gray-50 p-5">
                    <div className="flex gap-[10px]">
                      <div className="min-w-[80px] w-[80px] min-h-[80px] h-[80px]">
                        <img
                          src={notes?.From?.About?.profilePictureLink}
                          className="rounded-full w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="flex gap-[10px]">
                          <Typography
                            label={`${
                              userDetails?.id === notes?.From?.id
                                ? "You"
                                : `${notes?.From?.name}`
                            } sent a note to ${
                              userDetails?.id === notes?.To?.id
                                ? "You"
                                : `${notes?.To?.name}`
                            }`}
                            FontSize="base"
                            classname="font-medium "
                            type="p"
                            color="primary"
                            variant={200}
                          />
                          <Typography
                            label={moment(notes?.createdAt).format(
                              "DD-MM-YY, h:mm:ss a"
                            )}
                            classname="font-medium mt-[5px] text-text-gray-50 "
                            FontSize="xxs"
                            type="p"
                          />
                        </div>
                        <Typography
                          label={notes?.message}
                          color="primary"
                          variant={300}
                          FontSize="xs"
                          type="p"
                        />
                      </div>
                    </div>
                    <Button
                      label=""
                      icon={<img src="/Assets/FAQClose.svg" alt="" />}
                      variant="line"
                      onClick={() => OpenNoteReply(notes)}
                    />
                  </div>
                );
              })}
            </div>
          
        })
      )}
      {notepopup && (
        <NotePopUp
          open={notepopup}
          close={CloseNoteReply}
          note={note}
          formik={formik}
          user={userDetails}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default NoteHistory;
