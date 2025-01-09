import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Atoms";
import CustomTooltip from "../../Components/Molecules/CustomTooltip";
import { AuthState } from "../../Context/auth";

const SideBar = () => {
  let History = useNavigate();
  const NavigatorFunction = (name: any) => {
    History(name);
  };
  const [isVisible, setIsVisible] = useState(false);
  const toggleContent = () => {
    setIsVisible(!isVisible);
  };

  const mainDivWidth = isVisible ? "w-[250px]" : "w-[60px]";
  const mainDivpadding = isVisible ? "px-8 py-3" : "px-4 py-2";
  const { user } = AuthState();
  return (
    <>
      <div className={`bg-primary-100 ${mainDivWidth} h-[100vh]`}>
        <div className="flex flex-col pt-5 items-start justify-center space-y-[15px] overflow-y-auto">
          {user?.role === "ADMIN" && (
            <>
            {isVisible ? (
              <div
                className={`w-full flex items-center gap-3 ${mainDivpadding} hover:bg-bg`}
              >
                <Button
                  label=""
                  variant="line"
                  icon={
                    <img
                      src="/Assets/Dashboard.svg"
                      className=" hover:w-[20px]"
                      alt=""
                    />
                  }
                  onClick={() => {
                    NavigatorFunction("/admin-analytics");
                  }}
                />
                {isVisible && <div className="text-white">dashboard</div>}
              </div>
            ) : (
              <div className={`w-full ${mainDivpadding}  hover:bg-bg`}>
                <CustomTooltip content={"Dashboard"}>
                  <Button
                    label=""
                    variant="line"
                    icon={
                      <img
                        src="/Assets/Dashboard.svg"
                        className=" hover:w-[20px]"
                        alt=""
                      />
                    }
                    onClick={() => {
                      NavigatorFunction("/admin-analytics");
                    }}
                  />
                </CustomTooltip>
              </div>
            )}
          </>
          )}
          {user?.role === "PURCHASER" && (
            <>
              {isVisible ? (
                <div
                  className={`w-full flex items-center gap-3 ${mainDivpadding} hover:bg-bg`}
                >
                  <Button
                    label=""
                    variant="line"
                    icon={
                      <img
                        src="/Assets/Dashboard.svg"
                        className=" hover:w-[20px]"
                        alt=""
                      />
                    }
                    onClick={() => {
                      NavigatorFunction("/");
                    }}
                  />
                  {isVisible && <div className="text-white">dashboard</div>}
                </div>
              ) : (
                <div className={`w-full ${mainDivpadding}  hover:bg-bg`}>
                  <CustomTooltip content={"Dashboard"}>
                    <Button
                      label=""
                      variant="line"
                      icon={
                        <img
                          src="/Assets/Dashboard.svg"
                          className=" hover:w-[20px]"
                          alt=""
                        />
                      }
                      onClick={() => {
                        NavigatorFunction("/");
                      }}
                    />
                  </CustomTooltip>
                </div>
              )}
            </>
          )}
          {user?.role === "PROVIDER" && (
            <>
              {isVisible ? (
                <div
                  className={`w-full flex items-center gap-3 ${mainDivpadding} hover:bg-bg`}
                >
                  <Button
                    label=""
                    variant="line"
                    icon={
                      <img
                        src="/Assets/BookLibrary.svg"
                        className=" hover:w-[25px]"
                        alt=""
                      />
                    }
                    onClick={() => {
                      NavigatorFunction("/myproject");
                    }}
                  />
                  {isVisible && <div className="text-white">My Projects</div>}
                </div>
              ) : (
                <div className={`w-full ${mainDivpadding}  hover:bg-bg`}>
                  <CustomTooltip content={"My Projects"}>
                    <Button
                      label=""
                      variant="line"
                      icon={
                        <img
                          src="/Assets/BookLibrary.svg"
                          className=" hover:w-[25px]"
                          alt=""
                        />
                      }
                      onClick={() => {
                        NavigatorFunction("/myproject");
                      }}
                    />
                  </CustomTooltip>
                </div>
              )}
            </>
          )}
          {user?.role === "PROVIDER" &&
            (isVisible ? (
              <div
                className={`w-full flex items-center gap-3 ${mainDivpadding} hover:bg-bg`}
              >
                <Button
                  label=""
                  variant="line"
                  icon={
                    <img
                      src="/Assets/AccountGrp.svg"
                      className=" hover:w-[30px]"
                      alt=""
                    />
                  }
                  onClick={() => {
                    NavigatorFunction("/myteam-space");
                  }}
                />
                {isVisible && <div className="text-white">My Team Space</div>}
              </div>
            ) : (
              <div className={`w-full ${mainDivpadding}  hover:bg-bg`}>
                <CustomTooltip content={"My Team Space"}>
                  <Button
                    label=""
                    variant="line"
                    icon={
                      <img
                        src="/Assets/AccountGrp.svg"
                        className=" hover:w-[30px]"
                        alt=""
                      />
                    }
                    onClick={() => {
                      NavigatorFunction("/myteam-space");
                    }}
                  />
                </CustomTooltip>
              </div>
            ))}
          {isVisible ? (
            <div
              className={`w-full flex items-center gap-3 ${mainDivpadding} hover:bg-bg`}
            >
              <Button
                label=""
                variant="line"
                icon={
                  <img
                    src="/Assets/Diversity.svg"
                    className=" hover:w-[30px]"
                    alt=""
                  />
                }
                onClick={() => {
                  NavigatorFunction("/provider-list");
                }}
              />
              {isVisible && <div className="text-white">Provider list</div>}
            </div>
          ) : (
            <div className={`w-full ${mainDivpadding}  hover:bg-bg`}>
              <CustomTooltip content={"Provider list"}>
                <Button
                  label=""
                  variant="line"
                  icon={
                    <img
                      src="/Assets/Diversity.svg"
                      className=" hover:w-[30px]"
                      alt=""
                    />
                  }
                  onClick={() => {
                    NavigatorFunction("/provider-list");
                  }}
                />
              </CustomTooltip>
            </div>
          )}
          
          {isVisible ? (
            <div
              className={`w-full flex items-center gap-3 ${mainDivpadding} hover:bg-bg`}
            >
              <Button
                label=""
                variant="line"
                icon={
                  <img
                    src="/Assets/BaseLineHistory.svg"
                    className=" hover:w-[30px]"
                    alt=""
                  />
                }
                onClick={() => {
                  NavigatorFunction("/activity-history");
                }}
              />
              {isVisible && <div className="text-white">Activity History</div>}
            </div>
          ) : (
            <div className={`w-full ${mainDivpadding}  hover:bg-bg`}>
              <CustomTooltip content={"Activity History"}>
                <Button
                  label=""
                  variant="line"
                  icon={
                    <img
                      src="/Assets/BaseLineHistory.svg"
                      className=" hover:w-[30px]"
                      alt=""
                    />
                  }
                  onClick={() => {
                    NavigatorFunction("/activity-history");
                  }}
                />
              </CustomTooltip>
            </div>
          )}
          
          {isVisible ? (
            <div
              className={`w-full flex items-center gap-3 ${mainDivpadding} hover:bg-bg`}
            >
              <Button
                label=""
                variant="line"
                icon={
                  <img
                    src="/Assets/gravel.svg"
                    className=" hover:w-[30px]"
                    alt=""
                  />
                }
                onClick={() => {
                  NavigatorFunction("/dispute");
                }}
              />
              {isVisible && <div className="text-white">Dispute</div>}
            </div>
          ) : (
            <div className={`w-full ${mainDivpadding}  hover:bg-bg`}>
              <CustomTooltip content={"Dispute"}>
                <Button
                  label=""
                  variant="line"
                  icon={
                    <img
                      src="/Assets/gravel.svg"
                      className=" hover:w-[30px]"
                      alt=""
                    />
                  }
                  onClick={() => {
                    NavigatorFunction("/dispute");
                  }}
                />
              </CustomTooltip>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default SideBar;
