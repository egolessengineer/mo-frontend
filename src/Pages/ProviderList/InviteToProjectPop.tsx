import { Button, Textfield, Typography } from "../../Components/Atoms";
import { ModalAtom } from "../../Components/Molecules";

const InviteToProjectPop = ({ open, close }: any) => {
  return (
    <ModalAtom
      Title={
        <div className="flex justify-between bg-primary-100 rounded-t-[5px]  ">
          <Typography
            label="Connect to Wallet"
            type="h3"
            classname="font-bold text-white pt-[15px] pr-[20px] pb-[15px] pl-[20px] "
            FontSize="base"
          />
          <div className="mt-[12px] mr-[20px]">
            <Button
              variant="line"
              icon={<img src="/Assets/Close.svg" />}
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
        <>
          {" "}
          <div className="lg:w-[350px] w-full  p-[20px]">
            <Textfield
              type="search"
              placeHolder="Search name, skill or user id"
              rightIcon={
                <img
                  src="/Assets/Search.svg"
                  height="36px"
                  width="36px"
                  className="rounded-[5px] mt-[1.5px]"
                ></img>
              }
            />
          </div>
          <div className="px-5  pb-[6px]">
            <div className="border-b-[1px] border-text-gray-50">
              <Typography
                label="List of Projects"
                type="h2"
                color="primary"
                variant={200}
                classname="font-bold "
                FontSize="sm"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="lg:w-[750px] w-full h-[315px] mr-[20px] ml-[20px] mb-[20px] shadow-navbar rounded-[5px] overflow-auto">
              {[1, 2, 3, 4, 5].map((element) => {
                return (
                  <div className="border-b-[1px] border-text-gray-50 pt-[10px] pb-[10px] pr-[20px] pl-[20px] flex justify-between">
                    {/* //!typo */}
                    <div className="">
                      <Typography
                        label="Fitness App UX/UI Design Project"
                        color="primary"
                        variant={200}
                        FontSize="base"
                        classname="font-medium "
                        type="p"
                      />
                      <Typography
                        color="primary"
                        label="Design"
                        variant={200}
                        FontSize="xxs"
                        classname="font-medium "
                        type="p"
                      />
                    </div>
                    <div className="w-[100px]">
                      <Button
                        variant="Transparent"
                        color="secondary"
                        label="Invite"
                        size="small"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      }
      PanelPosition={"w-[50%]"}
      open={open}
    />
  );
};

export default InviteToProjectPop;
