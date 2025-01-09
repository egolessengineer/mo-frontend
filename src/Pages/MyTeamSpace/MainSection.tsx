import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Bookmark } from "../../Assets/SVG";
import { Button, Typography } from "../../Components/Atoms";
import { handleCustomError, showToast } from "../../Utils/helper";
import { ADD_IP, UPDATE_TEAM } from "../../sevices";
import InviteToProject from "./MyTeamSpacePopups/InviteProject";

const MainSection = ({ teams, setTeams }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [invitepopup, setInvitePopup] = useState(false);
  const [providerId, setProviderId] = useState("");

  const navigate = useNavigate();

  function handleOpenProviderDetails(id: any) {
    navigate("/user-details", { state: { id } });
  }

  const handleBookmark = async (
    id: any,
    teamId: any,
    action?: number,
    memberId?: any
  ) => {
    try {
      setIsLoading(true);
      let body = {
        id: id,
        usersId: [teamId],
        action: action,
      };
      let fitdata = teams.map((team: any) => {
        if (team.id === id) {
          let fil = team?.TeamMembers.map((mem: any) => {
            if (mem.id === memberId) {
              return { ...mem, isBookmarked: action === 1 ? false : true };
            } else {
              return mem;
            }
          });
          return { ...team, TeamMembers: fil };
        }
        return team;
      });
      setTeams(fitdata);
      await UPDATE_TEAM(body);
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  };
  async function handleRemoveMemberFromTeam(
    id: any,
    teamId: any,
    memberId?: any
  ) {
    try {
      setIsLoading(true);
      let body = {
        id: id,
        usersId: [teamId],
        action: 3,
      };
      let fitdata = teams.map((team: any) => {
        if (team.id === id) {
          let fil = team?.TeamMembers.filter((mem: any) => mem.id !== memberId);
          return { ...team, TeamMembers: fil };
        }
        return team;
      });
      setTeams(fitdata);
      await UPDATE_TEAM(body);
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenInvidePopup() {
    setInvitePopup(true);
  }

  function handleCloseInvitePopup() {
    setInvitePopup(false);
  }

  async function hanldeInviteToProject(id: any) {
    try {
      setIsLoading(true);
      let body = {
        projectId: id,
        providerIds: [providerId],
      };

      await ADD_IP(body);
      showToast("Invite Project Successfully", "success");
      handleCloseInvitePopup();
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col 2xl:items-center space-y-[20px] mt-[10px] pb-[40px]">
        {/* //Graphic Designer */}
        <div className="xl:w-[1190px]   w-full shadow-navbar rounded-[5px] overflow-y-auto ">
          {teams && teams.length === 0 ? (
            <div className="text-center p-5">No Data</div>
          ) : (
            teams &&
            teams.map((team: any, idx: any) => (
              <React.Fragment key={idx}>
                <div className="border-b-[1px] border-text-primary-100 p-[20px]">
                  <Typography
                    label={team.name}
                    type="h2"
                    classname="text-text-HeadLine-100 font-bold uppercase"
                    FontSize="2xl"
                  />
                </div>
                {team &&
                  team?.TeamMembers.map((element: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="border-b-[1px] border-text-primary-100 p-5 flex flex-row justify-between items-center"
                      >
                        <div className="flex gap-5 w-[40%]">
                          {element?.User?.About?.profilePictureLink ? (
                            <div className="w-[55px] rounded-full overflow-hidden">
                              <img
                                src={element?.User?.About?.profilePictureLink}
                                alt="UserImage"
                                className="object-cover h-full w-full"
                              />
                            </div>
                          ) : (
                            <div className="bg-gray-400 w-[55px] rounded-full flex justify-center items-center text-white font-bold text-2xl uppercase">
                              {element?.User?.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <Typography
                              type="h3"
                              label={element?.User?.name}
                              FontSize="2xl"
                              color="primary"
                              variant={200}
                              classname="font-bold capitalize"
                            />
                            <Typography
                              type="h3"
                              label={element?.User?.Address[0]?.country || "-"}
                              FontSize="sm"
                              color="primary"
                              variant={300}
                              classname="capitalize"
                            />
                          </div>
                        </div>
                        <div className="w-[20%]">
                          <Typography
                            type="h3"
                            label={element?.User?.Experiences[0]?.position}
                            FontSize="base"
                            color="primary"
                            classname="uppercase"
                            variant={200}
                          />
                        </div>
                        <div className="flex gap-5 w-[30%]">
                          <div className="w-[172px]">
                            <Button
                              label="Remove from Team"
                              variant="Transparent"
                              color="secondary"
                              size="small"
                              onClick={() => {
                                handleRemoveMemberFromTeam(
                                  team.id,
                                  element.User?.id,
                                  element.id
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-5 w-[100px] ml-auto">
                          <Button
                            label=""
                            variant="line"
                            onClick={() => {
                              if (element.isBookmarked) {
                                handleBookmark(
                                  team.id,
                                  element.User?.id,
                                  1,
                                  element.id
                                );
                              } else {
                                handleBookmark(
                                  team.id,
                                  element.User?.id,
                                  0,
                                  element.id
                                );
                              }
                            }}
                            icon={<Bookmark clicked={element?.isBookmarked} />}
                          />
                          <Button
                            label=""
                            variant="line"
                            icon={<img src="/Assets/NAvNext.svg" alt="" />}
                            onClick={() => {
                              handleOpenProviderDetails(element?.userId);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </React.Fragment>
            ))
          )}
        </div>
      </div>
      {invitepopup && (
        <InviteToProject
          open={invitepopup}
          close={handleCloseInvitePopup}
          hanldeInviteToProject={hanldeInviteToProject}
        />
      )}
    </>
  );
};

export default MainSection;
