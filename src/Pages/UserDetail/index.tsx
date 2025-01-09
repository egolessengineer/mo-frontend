import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Typography } from "../../Components/Atoms";
import { Loader } from "../../Components/Atoms/Loader";
import { handleCustomError } from "../../Utils/helper";
import { GET_PROVIDER_DETAILS } from "../../sevices";
import AboutDetails from "./AboutDetails";
import Profille from "./Profille";

const Index = () => {
  const {
    state: { id, activeBtn , showButton },
  } = useLocation();

  
  const [provideDetails, setProviderDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function handleGetProviderDetails(id: any, activeBtn: any) {
    try {
      setIsLoading(true);
      let res = await GET_PROVIDER_DETAILS(id);
      setProviderDetails(res?.data);
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    handleGetProviderDetails(id, activeBtn);
  }, [id, activeBtn]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex justify-between pt-[20px] p-5">
        <Typography
          type="h1"
          label="Provider"
          variant={50}
          color="secondary"
          FontSize="3xl"
          classname="leading-[32px] "
        />
        <div className="flex justify-between space-x-[20px]  ">
         
        </div>
      </div>
      <div className="md:flex-row mt-[20px] md:space-x-[20px] px-5 pb-5 flex flex-col xs:space-y-[20px] md:space-y-[0px] ">
        {/* //!right section */}
        <Profille provideDetails={provideDetails} />
        <AboutDetails
          provideDetails={provideDetails}
          setProviderDetails={setProviderDetails}
        />
      </div>
    </>
  );
};

export default Index;
