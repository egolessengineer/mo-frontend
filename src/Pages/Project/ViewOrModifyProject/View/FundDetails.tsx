import { useEffect, useState } from "react";
import { Typography } from "../../../../Components/Atoms";
import { AuthState } from "../../../../Context/auth";
import EscrowTOCP from "./EscrowTOCP";
import WalletToEscrow from "./WalletToEscrow";

const FundDetails = ({ viewProjectData, refetch }: any) => {
  const [Active, setActive] = useState("WalletToEscrow");
  const handleActive = (name: any) => {
    setActive(name);
  };
  const { user } = AuthState();

  const TabList = [{
    value: "WalletToEscrow",
    label: "Funds: Wallet to ESCROW"
  },
  {
    value: "EscrowToCP",
    label: "Funds: ESCROW to CP"
  }]

  useEffect(() => {
    if (user) {
      user.role == 'PROVIDER' && setActive('EscrowToCP')
    }
  }, [user])

  return (
    <div className="w-full">
      {viewProjectData?.Escrow && viewProjectData?.Escrow?.transferOwnershipStatus === "SUCCESS" ?
        <>
          {viewProjectData?.projectRole == 'PURCHASER' &&
            <div className="flex">
              {TabList.map((tab) => (
                <div
                  key={tab.value}
                  className={`px-2 py-1 flex justify-center items-center cursor-pointer font-bold first:rounded-l-md last:rounded-r-md ${Active === tab.value
                    ? "bg-text-secondary-50   text-white"
                    : "border-text-secondary-50  text-text-secondary-50 bg-white   border-[2px]"
                    }`}
                  onClick={() => {
                    handleActive(tab.value);
                  }}
                >
                  {tab.label}
                </div>
              ))}
            </div>}
          {Active === "WalletToEscrow" && (
            <WalletToEscrow viewProjectData={viewProjectData} refetch={refetch} />
          )}
          {Active === "EscrowToCP" && <EscrowTOCP viewProjectData={viewProjectData} refetch={refetch} />}

        </> : <div className=" h-[calc(100vh-50%)] flex flex-col justify-center items-center ">
          <div className="shadow-navbar p-5 rounded-[5px]">
            <div className="flex justify-center">
              <Typography
                label={"“No ESCROW Created”"}
                classname="text-text-HeadLine-100 text-[36px] "
                type="p"
              />
            </div>
            <div className="mt-[10px] flex  justify-center-center ">
              <div className="w-[482px]">
                <Typography
                  label={
                    "You do not have any active ESCROW transaction  at the moment. Create an ESCROW to securely manage the funds for your project."
                  }
                  type="p"
                  FontSize="base"
                  color="primary"
                  variant={300}
                  classname="font-medium "
                />
              </div>
            </div>
          </div>
        </div>}
    </div>
  );
};

export default FundDetails;
