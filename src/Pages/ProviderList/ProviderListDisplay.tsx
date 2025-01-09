import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router";
import { Bookmark } from "../../Assets/SVG";
import { Button, Typography } from "../../Components/Atoms";
import { handleCustomError, showToast } from "../../Utils/helper";
import { POST_SHORTLIST_PROVIDER_LIST } from "../../sevices";
import InviteToProjectPop from "./InviteToProjectPop";

const ProviderListDisplay = ({
  dataProvider,
  setDataProvider,
  handleFetchMoreData,
  hasMoreData,
  handleOpenteamPopup,
  formik,
  loader,
  activeBtn,
}: any) => {
  const [invitePrj, setinvitePrj] = useState(false);
  const navigate = useNavigate();

  const toggleBookmark = async (id: any, isBookmark: boolean) => {
    try {
      let action = isBookmark ? 1 : 0;

      let body = {
        providerId: id,
        action: action,
      };

      let fildata;
      if (activeBtn === "All") {
        fildata = dataProvider.map((item: any) => {
          if (action === 0) {
            return item.id === id
              ? { ...item, ProviderListMember: [{ id }] }
              : item;
          } else {
            return item.id === id ? { ...item, ProviderListMember: [] } : item;
          }
        });
      } else {
        fildata = dataProvider.filter((item: any) => item.Member.id !== id);
      }
      await POST_SHORTLIST_PROVIDER_LIST(body);
      setDataProvider(fildata);
      showToast(
        !isBookmark
          ? "saved bookmark successfully"
          : "removed bookmark successfully",
        "success"
      );
    } catch (error: any) {
      handleCustomError(error);
    } finally {
    }
  };

  const InviteFun = () => {
    setinvitePrj((prev) => !prev);
  };
  const closeInviteFun = () => {
    setinvitePrj(false);
  };

  function handleOpenProviderDetails(id: any , showButton?:any) {
    navigate("/user-details", { state: { id, activeBtn , showButton } });
  }

  return (
    <>
      <div
        id="providelistScroll"
        style={{ height: "calc(100vh - 380px)" }}
        className="max-h-full min-h-full overflow-y-auto"
      >
        <InfiniteScroll
          dataLength={dataProvider && dataProvider.length}
          next={() => {
            handleFetchMoreData();
          }}
          hasMore={true}
          loader={
            <h4 className="text-center">
              {loader
                ? "Loading..."
                : dataProvider.length === 0
                ? "No data"
                : null}
            </h4>
          }
          scrollableTarget="providelistScroll"
        >
          {dataProvider.map((provider: any, index: any) => {
            return (
              <div
                key={provider.id}
                className="w-full border-b-[1px] border-text-primary-100 p-5  flex justify-between items-center h-min-[82px]"
              >
                <div className="flex gap-5 w-1/4">
                  {provider?.About?.profilePictureLink ? (
                    <img
                      src={provider?.About?.profilePictureLink}
                      alt="profile"
                      className="w-16 h-16  rounded-full flex justify-center items-center text-xl font-bold text-white"
                    />
                  ) : provider?.Member?.About?.profilePictureLink ? (
                    <img
                      src={provider?.Member?.About?.profilePictureLink}
                      alt="profile"
                      className="w-16 h-16  rounded-full flex justify-center items-center text-xl font-bold text-white"
                    />
                  ) : (
                    <div className="w-16 h-16 capitalize bg-text-HeadLine-100 rounded-full flex justify-center items-center text-xl font-bold text-white">
                      {provider?.name
                        ? provider?.name.trim().charAt(0)
                        : provider?.Member?.name.trim().charAt(0)}
                    </div>
                  )}
                  <div>
                    <Typography
                      type="h3"
                      label={provider?.name || provider?.Member?.name}
                      FontSize="2xl"
                      color="primary"
                      variant={200}
                      classname="font-bold capitalize"
                    />
                    <Typography
                      type="h3"
                      label={
                        provider?.Address?.[0]?.country ||
                        provider?.Member?.Address?.[0]?.country
                      }
                      FontSize="sm"
                      color="primary"
                      variant={300}
                    />
                  </div>
                </div>
                <div>
                  <Typography
                    type="h3"
                    label={
                      provider?.Experiences
                        ? provider?.Experiences[
                            provider?.Experiences.length - 1
                          ]?.position
                        : provider?.Member?.Experiences[
                            provider?.Member?.Experiences.length - 1
                          ]?.position
                    }
                    FontSize="base"
                    color="primary"
                    variant={200}
                    classname="uppercase"
                  />
                </div>
                
                <div className="flex gap-5">
                  {
                    <Button
                      label=""
                      variant="line"
                      onClick={() => {
                        let isBookMark =
                          activeBtn !== "All"
                            ? true
                            : provider?.ProviderListMember.length !== 0
                            ? true
                            : false;
                        let id =
                          activeBtn !== "All"
                            ? provider?.Member.id
                            : provider?.id;
                        toggleBookmark(id, isBookMark);
                      }}
                      icon={
                        <Bookmark
                          clicked={
                            activeBtn === "All"
                              ? provider?.ProviderListMember &&
                                provider?.ProviderListMember.length !== 0
                              : true
                          }
                        />
                      }
                    />
                  }
                  <Button
                    label=""
                    variant="line"
                    icon={<img src="/Assets/NAvNext.svg" alt="" />}
                    onClick={() => {
                      activeBtn === "All"?
                      handleOpenProviderDetails(provider?.id , provider?.ProviderListMember[0]?.id ? false : true):
                      handleOpenProviderDetails(provider?.memberId , false);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
      {invitePrj && (
        <InviteToProjectPop open={invitePrj} close={closeInviteFun} />
      )}
    </>
  );
};

export default ProviderListDisplay;
