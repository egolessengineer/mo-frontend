import {
  ContractExecuteTransaction,
  ContractFunctionParameters
} from "@hashgraph/sdk";
import moment from "moment";
import { useState } from "react";
import { Button, Typography } from "../../../../Components/Atoms";
import { gasLimit } from "../../../../Constants/Hedera";
import { useHashConnect } from "../../../../Providers/HasConnectAPIProvider";
import { handleCustomError, showToast, updateTransactionDetails } from "../../../../Utils/helper";
import { REQUEST_FUND } from "../../../../sevices";
import FundRequestPopUp from "./../../Popups/FundRequestPopUp";
import ReleaseFundSucess from "./../../Popups/ReleaseFundSucess";
import RoyalityRelease from "./../../Popups/RoyalityRelease";
import RoyalityRequestModal from "./../../Popups/RoyalityRequestModal";

const EscrowTOCP = ({ viewProjectData, refetch }: any) => {
  const { getProvider, getSigner, state } = useHashConnect();
  const [fundState, setfundState] = useState(false);
  const [RoyalityState, setRoyalityState] = useState(false);
  const [FundSuccess, setFundSucess] = useState(false);
  const [RoyalitySuccess, setRoyalitySucess] = useState(false);
  const OpenFundSucess = () => {
    setFundSucess((prev) => !prev);
  };
  const CloseFundSucess = () => {
    setFundSucess(false);
  };
  const OpenRoyalitySucess = () => {
    setRoyalitySucess((prev) => !prev);
  };
  const CloseRoyalitySucess = () => {
    setRoyalitySucess(false);
  };
  const FundRequestClose = () => {
    setfundState(false);
  };

  const RoyalityRequestClose = () => {
    setRoyalityState(false);
  };
  const { Funds, Escrow } = viewProjectData

  const transaferFund = async (type: string, id: any) => {
    try {
      let fundType = type === 'Project' ? 'payoutProject' : 'payoutMilestone'
      if (state === "Connected") {
        if (Escrow.escrowContractId) {
          const provider = getProvider();
          const signer = getSigner(provider);
          let payoutProjectFunds: any;
          if (fundType === 'payoutProject') {
            payoutProjectFunds = await new ContractExecuteTransaction()
              .setContractId(Escrow.escrowContractId)
              .setGas(gasLimit)
              .setFunction(fundType)
              .freezeWithSigner(signer);
          } else {
            payoutProjectFunds = await new ContractExecuteTransaction()
              .setContractId(Escrow.escrowContractId)
              .setGas(gasLimit)
              .setFunction(
                fundType,
                new ContractFunctionParameters().addString(id),
              ).freezeWithSigner(signer);
          }
          let payoutProjectFundsTx = await payoutProjectFunds.executeWithSigner(signer);
          console.log("payoutProjectFundsTx: ", payoutProjectFundsTx);
          if (payoutProjectFundsTx?.transactionId) {
            let transactionIDSplit = payoutProjectFundsTx?.transactionId.toString().split("@");
            let transactionid = transactionIDSplit[1].replace(".", "-");
            transactionid = transactionIDSplit[0] + "-" + transactionid;
            await updateTransactionDetails(transactionid, fundType, 'MilestonePayout')
            console.log('transactionid', transactionid);
          }
          await refetch()
        } else {
          showToast('The escrow has not been created yet.', 'info')
        }
      } else {
        showToast('Please connect your wallet', 'info')
      }
    } catch (error) {
      console.log("Error in Fund Payout", error);
    }
  };
  const royalityPayout = async (id: any) => {
    try {
      if (state === "Connected") {
        if (Escrow.escrowContractId) {
          const provider = getProvider();
          const signer = getSigner(provider);
          let payoutProjectFunds = await new ContractExecuteTransaction()
            .setContractId(Escrow.escrowContractId)
            .setGas(gasLimit)
            .setFunction(
              'payoutMilestoneRoyalty',
              new ContractFunctionParameters().addString(
                id,
              ),
            ).freezeWithSigner(signer);
          let payoutProjectFundsTx = await payoutProjectFunds.executeWithSigner(signer);
          console.log("payoutProjectFundsTx: ", payoutProjectFundsTx);
          if (payoutProjectFundsTx?.transactionId) {
            let transactionIDSplit = payoutProjectFundsTx?.transactionId.toString().split("@");
            let transactionid = transactionIDSplit[1].replace(".", "-");
            transactionid = transactionIDSplit[0] + "-" + transactionid;
            await updateTransactionDetails(transactionid, 'payoutMilestoneRoyalty', 'RoyaltyPaid')
            console.log('transactionid', transactionid);
          }
          await refetch()
        } else {
          showToast('The escrow has not been created yet.', 'info')
        }
      } else {
        showToast('Please connect your wallet', 'info')
      }
    } catch (error) {
      console.log("Error in Fund Payout", error);
    }
  };

  const reuqestFund = async (id: any, idType: any, requestType: any) => {
    try {
      let params = {
        id: id,
        idType: idType, //0: PROJECT, 1: MILESTONE
        requestType: requestType //0: FUND,1: ROYALTY
      }
      let data = await REQUEST_FUND(params)
      showToast(`${requestType == 0 ? "Fund" : "Success Bonus"} Requested Successfully`, "success")
    } catch (error) {
      handleCustomError(error)
    } finally {

    }
  }
  return (
    <>
      {FundSuccess && (
        <ReleaseFundSucess open={FundSuccess} close={CloseFundSucess} />
      )}
      {RoyalitySuccess && (
        <RoyalityRelease open={RoyalitySuccess} close={CloseRoyalitySucess} />
      )}
      {fundState && (
        <FundRequestPopUp
          open={fundState}
          close={FundRequestClose}
          nextpop={OpenFundSucess}
        />
      )}
      {RoyalityState && (
        <RoyalityRequestModal
          open={RoyalityState}
          close={RoyalityRequestClose}
          nextpop={OpenRoyalitySucess}
        />
      )}
      <div className=" shadow-navbar rounded-[5px] mt-[20px]">
        <div className="px-5 pt-5 pb-[10px] border-b-[1px] border-text-gray-50">
          <Typography
            label={"Project Transaction Details"}
            classname="text-text-HeadLine-100 font-bold "
            FontSize="base"
            type="p"
          />
        </div>

        <div className="flex justify-between px-5 pb-5 mt-[10px]">
          <div className="flex flex-col space-y-[10px]">
            <div className="flex space-x-1 ">
              <Typography
                label={"Fund Assign to:"}
                type="p"
                color="primary"
                variant={200}
                classname="font-bold "
                FontSize="sm"
              />
              <Typography
                label={Funds?.escorwToCp?.fundAssignedTo == "MILESTONE" ? 'Each Milestone' : 'Project Completion'}
                type="p"
                color="primary"
                variant={300}
                FontSize="sm"
              />
            </div>
            <div className="flex space-x-1 ">
              <Typography
                label={"Fund Transfer Type: "}
                type="p"
                color="primary"
                variant={200}
                classname="font-bold "
                FontSize="sm"
              />
              <Typography
                label={Funds?.escorwToCp?.fundTransferType == "MilestoneCompleted" ? 'Milestone Completed' : 'Project Completed'}
                type="p"
                color="primary"
                variant={300}
                FontSize="sm"
              />
            </div>
            <div className="flex space-x-1 ">
              <Typography
                label={"Project Fund Allocated:"}
                type="p"
                color="primary"
                variant={200}
                classname="font-bold "
                FontSize="sm"
              />
              <Typography
                label={`$ ${Funds?.escorwToCp?.projectFundAllocated}`}
                type="p"
                color="primary"
                variant={300}
                FontSize="sm"
              />
            </div>
            <div className="flex space-x-1 ">
              <Typography
                label={"Total Fund Transferred:"}
                type="p"
                color="primary"
                variant={200}
                classname="font-bold "
                FontSize="sm"
              />
              <Typography
                label={`$ ${Funds?.escorwToCp?.totalFundTransfered || 0}`}
                type="p"
                color="primary"
                variant={300}
                FontSize="sm"
              />
            </div>
            <div className="flex space-x-1 ">
              <Typography
                label={"Last Transaction Date:"}
                type="p"
                color="primary"
                variant={200}
                classname="font-bold "
                FontSize="sm"
              />
              <Typography
                label={Funds?.escorwToCp?.lastTransactionDate !== "NA" ? moment.unix(Funds?.escorwToCp?.lastTransactionDate).format('DD-MMM-YYYY') : Funds?.escorwToCp?.lastTransactionDate}
                type="p"
                color="primary"
                variant={300}
                FontSize="sm"
              />
            </div>
            {/* <div className="flex space-x-1 ">
              <Typography
                label={"Fund Remaining:"}
                type="p"
                color="primary"
                variant={200}
                classname="font-bold "
                FontSize="sm"
              />
              <Typography
                label={`$ ${Funds?.escorwToCp?.fundRemaining || 0}`}
                type="p"
                color="primary"
                variant={300}
                FontSize="sm"
              />
            </div> */}
          </div>
          {Funds?.escorwToCp?.fundTransferType !== "MilestoneCompleted" &&
            <div className="space-y-2">
              {Funds?.escorwToCp?.payoutStatus ?
                <Typography
                  label={"Fund Transferred Successfully"}
                  classname="px-4 py-1 font-bold text-text-sucess-50 bg-text-sucess-200 flex justify-center items-center"
                  type="p"
                  FontSize="sm"
                /> :
                <>
                  {viewProjectData?.projectRole == 'PURCHASER' &&
                    <Button
                      label="Release ESCROW Fund"
                      variant="Transparent"
                      color="secondary"
                      onClick={() => transaferFund('Project', '')}
                      size="small"
                      disable={!Funds?.escorwToCp?.enablePayout} //Todo Need To map Release Payout Key
                      className={"border-[1px] border-text-gray-400 text-text-gray-300 "}
                    />}
                  {viewProjectData?.projectRole == 'CP' &&
                    <Button
                      label="Request Fund Release"
                      variant="Transparent"
                      color="secondary"
                      size="small"
                      onClick={() => reuqestFund(viewProjectData?.id, 0, 0)}
                      disable={!Funds?.escorwToCp?.enablePayout} //Todo Need To map Release Payout Key
                      className={"border-[1px] border-text-gray-400 text-text-gray-300"}
                    />}
                </>
              }
            </div>}
        </div>
      </div >
      < div className=" shadow-navbar mt-[20px] rounded-[5px] " >
        

        {Funds && Funds.milestones && Funds.milestones.length > 0 && Funds.milestones.map((element: any, index: any) => {
          return (
            <div className="flex justify-between p-5 border-b-[1px] border-text-gray-50"
              key={`${index}-fundMilestone`}>
              <div className="flex flex-col space-y-[10px]">
                <Typography
                  label={element?.title}
                  type="p"
                  classname="text-text-HeadLine-100 font-bold  "
                  FontSize="base"
                />
                <div className="flex space-x-1 ">
                  <Typography
                    type="p"
                    label={"Fund Allocation:"}
                    classname="font-bold "
                    color="primary"
                    variant={200}
                    FontSize="sm"
                  />{" "}
                  <Typography
                    type="p"
                    label={`$ ${element?.fundAllocation || 0}`}
                    classname=""
                    FontSize="sm"
                    color="primary"
                    variant={300}
                  />
                </div>
                <div className="flex space-x-1 ">
                  <Typography
                    type="p"
                    label={"Transaction Date: "}
                    classname="font-bold "
                    FontSize="sm"
                    color="primary"
                    variant={200}
                  />{" "}
                  <Typography
                    type="p"
                    label={element?.transactionDate !== "NA" ? moment.unix(element?.transactionDate).format('DD-MMM-YYYY') : element?.transactionDate}
                    classname=""
                    FontSize="sm"
                    color="primary"
                    variant={300}
                  />
                </div>
                <div className="flex space-x-1 ">
                  <Typography
                    type="p"
                    label={`${element?.royaltyType == "PRE_PAYMENT_ROYALTY" ? "Prepayment" : "PostPayment"} Success Bonus (%): `}
                    classname="font-bold text-text-sucess-100  "
                    FontSize="sm"
                  />{" "}
                  <Typography
                    type="p"
                    label={`${element?.royaltyValue}`}
                    classname=" text-text-sucess-100 "
                    FontSize="sm"
                  />
                </div>
                <div className="flex space-x-1 ">
                  <Typography
                    type="p"
                    label={"Fund Transferred:"}
                    classname="font-bold "
                    FontSize="sm"
                    color="primary"
                    variant={200}
                  />{" "}
                  <Typography
                    type="p"
                    label={`$ ${element?.milestoneFundsStatus?.fundTransferred ? element?.fundAllocation : 0}`}
                    classname=""
                    FontSize="sm"
                    color="primary"
                    variant={300}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex flex-col">
                  <div className="flex flex-col gap-1 items-center">
                    <Typography
                      label={"Assigned to:"}
                      type="p"
                      color="primary"
                      variant={200}
                      FontSize="sm"
                      classname="font-bold "
                    />
                    <div className="flex items-center gap-1">
                      <div className="w-[20px] h-[20px] rounded-full overflow-hidden">
                        <img className="w-full h-full object-cover" src={element.receipt.About?.profilePictureLink} alt="" />
                      </div>
                      <Typography
                        label={element.receipt.name}
                        type="p"
                        color="primary"
                        variant={200}
                        FontSize="sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col  space-y-5`}>
                {Funds?.escorwToCp?.fundTransferType == "MilestoneCompleted" && <>
                  {element?.milestoneFundsStatus?.fundTransferred ? <Typography
                    label={"Fund Transferred Successfully"}
                    classname="px-4 py-1 font-bold text-text-sucess-50 bg-text-sucess-200 flex justify-center items-center"
                    type="p"
                    FontSize="sm"
                  /> :
                    <>
                      {viewProjectData?.projectRole == 'PURCHASER' &&
                        <Button
                          label="Release ESCROW Fund"
                          variant="Transparent"
                          color="secondary"
                          onClick={() => transaferFund('Milestone', element?.milestoneId)}
                          disable={!element?.milestoneFundsStatus?.enableFundTransfer}
                          size="small"
                          className={"border-[1px] border-text-gray-400 text-text-gray-300 "}
                        />}
                      {viewProjectData?.projectRole == 'CP' &&
                        <Button
                          label="Request Release Milestone Fund"
                          variant="Transparent"
                          color="secondary"
                          onClick={() => reuqestFund(element?.milestoneId, 1, 0)}
                          disable={!element?.milestoneFundsStatus?.enableFundTransfer}
                          size="small"
                          className={"border-[1px] border-text-gray-400 text-text-gray-300 "}
                        />}
                    </>}</>}

                {element?.milestoneFundsStatus?.royalityTransferred ? <Typography
                  label={"Success Bonus Transferred Successfully"}
                  classname="px-4 py-1 font-bold text-text-sucess-50 bg-text-sucess-200 flex justify-center items-center"
                  type="p"
                  FontSize="sm"
                /> : <>
                  {viewProjectData?.projectRole == 'PURCHASER' &&
                    <Button
                      label="Release Success Bonus"
                      variant="Transparent"
                      color="secondary"
                      size="small"
                      disable={!element?.milestoneFundsStatus?.enableRoyalityTransfer}
                      onClick={() => royalityPayout(element?.milestoneId)}
                      className={"border-[1px] border-text-gray-400 text-text-gray-300"}
                    />}
                  {viewProjectData?.projectRole == 'CP' &&
                    <Button
                      label="Request Release Success Bonus"
                      variant="Transparent"
                      color="secondary"
                      size="small"
                      disable={!element?.milestoneFundsStatus?.enableRoyalityTransfer}
                      onClick={() => reuqestFund(element?.milestoneId, 1, 1)}
                      className={"border-[1px] border-text-gray-400 text-text-gray-300"}
                    />}
                </>}
              </div>
            </div>
          );
        })
        }
      </div >
    </>
  );
};

export default EscrowTOCP;
