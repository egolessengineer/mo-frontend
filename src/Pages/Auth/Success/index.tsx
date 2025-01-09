import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader } from "../../../Components/Atoms/Loader";
import { messages } from "../../../Constants/messages";
import { handleCustomError, showToast } from "../../../Utils/helper";

const Success = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const success = async () => {
    const token = searchParams.get("token");

    if (token) {
      try {
        setIsLoading(true);
        localStorage.setItem("access_token", token);
        window.location.href = "/redirect";
      } catch (error: any) {
        handleCustomError(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      showToast(messages.ERROR_FETCHING_TOKEN, "error");
    }
  };

  useEffect(() => {
    success();
  }, []);

  return <div>{isLoading && <Loader />}</div>;
};

export default Success;
