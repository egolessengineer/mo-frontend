import moment from "moment";
import { Typography } from "../../Components/Atoms";
import { Loader } from "../../Components/Atoms/Loader";

const ActivityFAQ = ({ notificationList, isLoading }: any) => {

  return (
    <div className=" w-full shadow-faq rounded-[5px] mt-[10px] overflow-auto lg:ml-[0px] lg:mr-[0px] ">
      {isLoading ? (
        <Loader />
      ) : notificationList && notificationList.length === 0 ? (
        <div className="text-center p-5">No Notification</div>
      ) : (
        notificationList &&
        notificationList.map((element: any, index: any) => (
          <div
            key={index}
            className="border-b-[1px] border-text-gray-50 p-5 flex flex-row justify-between items-center"
          >
            <Typography
              label={
                element?.content?.message?.data || element?.content?.message
              }
              FontSize="base"
              color="primary"
              variant={200}
              classname="font-medium"
              type="p"
            />
            <Typography
              label={moment(element?.createdAt).format("DD-MM-YY hh:mm a")}
              FontSize="sm"
              color="primary"
              variant={200}
              classname="font-medium"
              type="p"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ActivityFAQ;
