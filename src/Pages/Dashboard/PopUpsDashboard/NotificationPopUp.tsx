import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";
const NotificationPopUp = ({ OpenNotify, close, notificationList }: any) => {
  let history = useNavigate();

  return (
    <ModalAtom
      close={close}
      open={OpenNotify}
      Title={<div className="relative"></div>}
      PanelPosition={"!w-[300px]"}
      positionDiv={
        "absolute lg:top-[73px] lg:right-[250px] top-[45px] right-[100px]"
      }
      description={
        <>
          <div className="flex flex-col">
            {notificationList && notificationList.length === 0 ? (
              <div className="text-center p-5">No Notification</div>
            ) : (
              notificationList &&
              notificationList.slice(0, 5).map((element: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="border-b-2 pl-[20px] pt-[10px] pb-[10px] pr-[20px] flex justify-between"
                  >
                    <div className="flex gap-5">
                      {/* <div className="my-auto">
                        <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-[#3498db]">
                          {element?.content?.senderProfileImage ? (
                            <img
                              src={element?.content?.senderProfileImage}
                              className="w-full h-full object-cover"
                              alt=""
                            />
                          ) : (
                            <div className="text-white font-bold text-xl">
                              N
                            </div>
                          )}
                        </div>
                      </div> */}
                      <div className="">
                        <Typography
                          label={element?.content?.message || ""}
                          FontSize="sm"
                          color="primary"
                          classname="font-bold leading-4"
                          variant={200}
                          type="p"
                        />
                        <Typography
                          label={moment(element?.createdAt).format("DD-MM-YY hh:mm a")}
                          FontSize="xs"
                          color="primary"
                          variant={300}
                          type="p"
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div className="flex justify-end pt-[18px] pb-[22px] px-10">
              <div className="w-[145px]">
                <Button
                  size="small"
                  variant="Transparent"
                  color="secondary"
                  label="Activity History"
                  icon={<img src="/Assets/Next.svg" alt="" />}
                  iconPosition="left"
                  onClick={() => {
                    close();
                    history("/activity-history");
                  }}
                />
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default NotificationPopUp;
