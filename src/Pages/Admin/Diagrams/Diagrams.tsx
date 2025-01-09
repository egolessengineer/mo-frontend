import { useEffect, useState } from "react";
import { Button, Typography } from "../../../Components/Atoms";
import { Loader } from "../../../Components/Atoms/Loader";
import { handleCustomError } from "../../../Utils/helper";
import { ADMIN_ANALYTICS, ADMIN_FEE } from "../../../sevices";
import SetCommission from "../SetCommission";
import FinancialInsight from "./FinancialInsight";
import ProjectCount from "./ProjectCount";
import RoyalityManagement from "./RoyalityManagement";
import UserRoleOverview from "./UserRoleOverview";

const Diagrams = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false)
  const [chartData, setChartData] = useState({})
  const [commissionData, setCommissionData] = useState<any>(null)
  const [popup, setPopup] = useState<any>(null)

  async function handleGet_ADMIN_ANALYTICS() {
    try {
      setIsLoading(true)
      let res = await ADMIN_ANALYTICS()
      setChartData(res?.data)
      setCommissionData(res?.data?.commission)
    }
    catch (error: any) {
      handleCustomError(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleUpdateCommisson = async (data: any) => {
    try {
      setIsBtnLoading(true)
      let body = { 
        commission:JSON.stringify(parseFloat(data.commission))
      }
      await ADMIN_FEE(body)
      await handleGet_ADMIN_ANALYTICS()
      setPopup(null)
    }
    catch (error: any) {
      handleCustomError(error)
    }
    finally {
      setIsBtnLoading(false)
    }
  }


  useEffect(() => {
    handleGet_ADMIN_ANALYTICS()
  }, [])

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex justify-between items-center -mt-4">
        <Typography
          type="h1"
          label={'Dashboard'}
          variant={50}
          color="secondary"
          FontSize="3xl"
          classname={`leading-[32px] capitalize`}
        />
        <div className="w-[140px]">
          <Button label="M.O. Commission"
            color="secondary"
            className="font-medium "
            variant="Transparent"
            size="small"
            onClick={() => setPopup('commission')} />
        </div>
      </div>
      <FinancialInsight chartData={chartData} />
      <UserRoleOverview chartData={chartData} />
      <ProjectCount chartData={chartData} />
      {/* <BlockChain /> */}
      <RoyalityManagement chartData={chartData} />
      {popup === 'commission' && (
        <SetCommission
          data={commissionData}
          isLoading={isBtnLoading}
          changeCommission={(values: any) => handleUpdateCommisson(values)}
          open={popup === 'commission' ? true : false}
          close={() => setPopup(null)}
        />
      )}
    </div>
  );
};

export default Diagrams;
