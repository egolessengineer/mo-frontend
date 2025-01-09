import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader } from "../../../Components/Atoms/Loader";
import { handleCustomError, showToast } from "../../../Utils/helper";
import { VERIFY_EMAIL } from "../../../sevices";

const VerifyEmailScreen = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Verify();
  }, []);
  const Verify = async () => {
    const token = searchParams.get("token");
    try {
      setIsLoading(true);
      let data = await VERIFY_EMAIL({
        token: token,
      });
      showToast(data?.data, "success");
      navigate("/signin");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return <div> {isLoading && <Loader />}</div>;
};

export default VerifyEmailScreen;
