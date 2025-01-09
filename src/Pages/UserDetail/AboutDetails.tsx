import moment from "moment";
import { Typography } from "../../Components/Atoms";
import Notes from "./Notes";

const AboutDetails = ({ provideDetails, setProviderDetails }: any) => {
  return (
    <div className="w-full ">
      <div className="border-b-[1px] border-text-gray-50">
        <Typography
          label="About"
          type="p"
          color="primary"
          variant={200}
          classname="font-bold "
          FontSize="sm"
        />
      </div>
      <div className="flex flex-col space-y-[20px] ">
        <div className=" shadow-navbar rounded-[5px] mt-[10px]  ">
          <div className="border-b-[1px] border-text-gray-50 pt-[20px] lg:pb-[6px] pl-[20px] pr-[20px]">
            <Typography
              label={provideDetails?.About?.about}
              type="p"
              color="primary"
              variant={300}
              FontSize="sm"
              classname="capitalize"
            />
            <div className="mt-[20px]">
              <Typography
                type="p"
                label="Experience"
                FontSize="sm"
                color="primary"
                variant={200}
                classname="font-bold "
              />
            </div>
          </div>
          {provideDetails?.Experiences &&
            provideDetails?.Experiences.map((exp: any, idx: any) => {
              return (
                <div
                  key={exp?.id}
                  className="flex justify-between pt-[10px] pb-[10px] pl-[20px] pr-[20px] border-b-[1px] border-text-[1px]"
                >
                  <div className="flex flex-col  space-y-[10px]">
                    <Typography
                      label={exp?.company}
                      type="p"
                      color="primary"
                      classname="font-bold uppercase"
                      variant={300}
                      FontSize="sm"
                    />
                    <Typography
                      label={exp?.position}
                      type="p"
                      color="primary"
                      variant={50}
                      FontSize="sm"
                      classname="capitalize"
                    />
                  </div>
                  <div className="flex items-center">
                    <Typography
                      label={`${moment(exp?.startDate).format(
                        "YYYY"
                      )} - ${moment(exp?.endDate).format("YYYY")}`}
                      type="p"
                      color="primary"
                      variant={50}
                      FontSize="sm"
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <Notes
          provideDetails={provideDetails}
          setProviderDetails={setProviderDetails}
        />
      </div>
    </div>
  );
};

export default AboutDetails;
