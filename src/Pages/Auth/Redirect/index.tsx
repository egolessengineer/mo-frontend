import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../Components/Atoms/Loader";
import { messages } from "../../../Constants/messages";
import { AuthState } from "../../../Context/auth";
import { handleCustomError, showToast } from "../../../Utils/helper";
import { GET_ME } from "../../../sevices";

export const Redirect = () => {
  const navigation = useNavigate();
  const isInitialRender = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = AuthState();

  const redirect = async () => {
    try {
      setIsLoading(true);
      let data = await GET_ME();
      setUser(data?.data);
      localStorage.setItem("user", JSON.stringify(data?.data));
      showToast(messages.SUCCESS_LOGIN, "success");
      if (!data?.data?.role) {
        navigation("/select-role");
      } else if (data?.data?.role === "ADMIN") {
        navigation("/admin-analytics");
      } else if (
        !data?.data?.isAboutComplete ||
        !data?.data?.isAddressComplete
      ) {
        navigation("/details");
      } else if (
        data?.data?.role === "PROVIDER" &&
        !data?.data?.isExperienceComplete
      ) {
        navigation("/details");
      } else {
        navigation("/");
      }
      // window.location.href = "/redirect";
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialRender.current) {
      redirect();
      isInitialRender.current = false;
    }
  }, []);

  return <div>{isLoading && <Loader />}</div>;
};
