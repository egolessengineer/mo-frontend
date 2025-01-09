import {
    ContractExecuteTransaction,
    ContractFunctionParameters,
    AccountAllowanceApproveTransaction
} from "@hashgraph/sdk";
import moment from 'moment';
import { Button, Typography } from '../../../../Components/Atoms';
import { TOKEN_ID, USDC_VALUE, gasLimit } from '../../../../Constants/Hedera';
import { useHashConnect } from '../../../../Providers/HasConnectAPIProvider';
import { handleCustomError, showToast, updateTransactionDetails } from '../../../../Utils/helper';
import { AuthState } from "../../../../Context/auth";
const WalletToEscrow = ({ viewProjectData, refetch }: any) => {
    const { user } = AuthState()
    const { getProvider, getSigner, state } = useHashConnect();
    const { Funds, Escrow } = viewProjectData

    const fundProject = async (type: string, amount: any, id: any, royaltyValue: any) => {
        try {
            let fundType = type === 'Project' ? viewProjectData.ProjectDetails.currency === "HBAR" ? 'fundProject' : 'fundUsdcToProject'
                : viewProjectData.ProjectDetails.currency === "HBAR" ? 'fundMilestone' : 'fundUsdcToMilestone'
            if (state === "Connected") {
                if (Escrow.escrowContractId) {
                    const provider = getProvider();
                    const signer = getSigner(provider);
                    let fundProject: any;
                    if (fundType === 'fundProject') {
                        fundProject = await new ContractExecuteTransaction()
                            .setContractId(Escrow.escrowContractId)
                            .setGas(gasLimit)
                            .setPayableAmount(amount)
                            .setFunction(fundType)
                            .freezeWithSigner(signer);
                    } else if (fundType === 'fundMilestone') {
                        let amountWithRoyalty = amount + (amount * royaltyValue / 100)
                        fundProject = await new ContractExecuteTransaction()
                            .setContractId(Escrow.escrowContractId)
                            .setGas(gasLimit)
                            .setPayableAmount(amountWithRoyalty)
                            .setFunction(
                                'fundMilestone',
                                new ContractFunctionParameters().addString(id),
                            ).freezeWithSigner(signer);
                    } else if (fundType === 'fundUsdcToProject') {
                        //Create the allowance transaction
                        let transaction = await new AccountAllowanceApproveTransaction()
                            .approveTokenAllowance(
                                TOKEN_ID,
                                user.walletAddress,
                                Escrow.escrowContractId,
                                amount * USDC_VALUE,
                            ).freezeWithSigner(signer)
                        let transactionTx = await transaction.executeWithSigner(signer);
                        console.log("transactionTx: ", transactionTx)
                        fundProject = await new ContractExecuteTransaction()
                            .setContractId(Escrow.escrowContractId)
                            .setGas(gasLimit)
                            .setFunction('fundUsdcToProject')
                            .freezeWithSigner(signer);
                    } else {
                        let amountWithRoyalty = amount + (amount * royaltyValue / 100)
                        let transaction = await new AccountAllowanceApproveTransaction()
                            .approveTokenAllowance(
                                TOKEN_ID,
                                user.walletAddress,
                                Escrow.escrowContractId,
                                amountWithRoyalty * USDC_VALUE,
                            ).freezeWithSigner(signer)
                        let transactionTx = await transaction.executeWithSigner(signer);
                        console.log("transactionTx: ", transactionTx)
                        fundProject = await new ContractExecuteTransaction()
                            .setContractId(Escrow.escrowContractId)
                            .setGas(gasLimit)
                            .setFunction(
                                'fundUsdcToMilestone',
                                new ContractFunctionParameters().addString(id),
                            ).freezeWithSigner(signer);
                    }
                    let fundProjecteTx = await fundProject.executeWithSigner(signer);
                    console.log("fundProjecteTx: ", fundProjecteTx);
                    if (fundProjecteTx?.transactionId) {
                        let transactionIDSplit = fundProjecteTx?.transactionId.toString().split("@");
                        let transactionid = transactionIDSplit[1].replace(".", "-");
                        transactionid = transactionIDSplit[0] + "-" + transactionid;
                        await updateTransactionDetails(transactionid, fundType, 'MilestoneFunded')
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
            console.log("Error in Fund Transfer", error);
        }
    };

    const releaseRemainingFund = async () => {
        try {
            if (state === "Connected") {
                if (Escrow.escrowContractId) {
                    const provider = getProvider();
                    const signer = getSigner(provider);
                    let releaseRemainingFund = await new ContractExecuteTransaction()
                        .setContractId(Escrow.escrowContractId)
                        .setGas(gasLimit)
                        .setFunction('releaseFreeBalance')
                        .freezeWithSigner(signer);
                    let releaseRemainingFundTx = await releaseRemainingFund.executeWithSigner(signer);
                    if (releaseRemainingFundTx?.transactionId) {
                        let transactionIDSplit = releaseRemainingFundTx?.transactionId.toString().split("@");
                        let transactionid = transactionIDSplit[1].replace(".", "-");
                        transactionid = transactionIDSplit[0] + "-" + transactionid;
                        await updateTransactionDetails(transactionid, 'releaseFreeBalance', 'FreeBalanceReleased')
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
            handleCustomError(error)
            console.log(error);
        }
    }
    const fundProjectEscrow = async (type: string, amount: any, id: any, royaltyValue?: any) => {
        fundProject(type, amount, id, royaltyValue)
    }
    return (
        <div>
            <div className="shadow-navbar   rounded-[5px]">
                <div className="px-5 py-[10px] mt-[10px] border-b-[1px] border-text-gray-50">
                    <Typography
                        label={"Project Transaction Details"}
                        FontSize="base"
                        classname="font-bold text-text-HeadLine-100 "
                        type="p"
                    />
                </div>
                <div className="px-[20px] py-[10px] mb-[10px] flex justify-between ">
                    <div className="flex flex-col space-y-[10px]">
                        <div className="flex space-x-1">
                            <Typography
                                label={"Fund Assign to:"}
                                type="p"
                                FontSize="sm"
                                color="primary"
                                variant={200}
                                classname="font-bold "
                            />{" "}
                            <Typography
                                label={Funds?.walletToEscorw?.fundAssignedTo == "MILESTONE" ? 'Each Milestone' : 'Project Completion'}
                                type="p"
                                FontSize="sm"
                                color="primary"
                                variant={300}
                            />{" "}
                        </div>
                        <div className="flex space-x-1">
                            <Typography
                                label={"Fund Transfer Type:"}
                                type="p"
                                FontSize="sm"
                                color="primary"
                                variant={200}
                                classname="font-bold "
                            />{" "}
                            <Typography
                                label={Funds?.walletToEscorw?.fundTransferType == "MilestoneCompleted" ? 'Milestone Completed' : 'Project Completed'} type="p"
                                FontSize="sm"
                                color="primary"
                                variant={300}
                            />{" "}
                        </div>
                        <div className="flex space-x-1">
                            <Typography
                                label={"Project Fund Allocated:"}
                                type="p"
                                FontSize="sm"
                                color="primary"
                                variant={200}
                                classname="font-bold "
                            />{" "}
                            <Typography
                                label={`$ ${Funds?.walletToEscorw?.projectFundAllocated}`}
                                type="p"
                                FontSize="sm"
                                color="primary"
                                variant={300}
                            />
                        </div>
                        <div className="flex space-x-1">
                            <Typography
                                label={"Total Fund Transferred:"}
                                type="p"
                                FontSize="sm"
                                color="primary"
                                variant={200}
                                classname="font-bold "
                            />{" "}
                            <Typography
                                label={`$ ${Funds?.walletToEscorw?.totalFundTransfered || 0}`}
                                type="p"
                                FontSize="sm"
                                color="primary"
                                variant={300}
                            />{" "}
                        </div>
                        <div className="flex space-x-1">
                            <Typography
                                label={"Last Transaction Date:"}
                                type="p"
                                FontSize="sm"
                                color="primary"
                                variant={200}
                                classname="font-bold "
                            />{" "}
                            <Typography
                                label={Funds?.walletToEscorw?.lastTransactionDate !== "NA" ? moment.unix(Funds?.walletToEscorw?.lastTransactionDate).format('DD-MMM-YYYY') : Funds?.walletToEscorw?.lastTransactionDate}
                                type="p"
                                FontSize="sm"
                                color="primary"
                                variant={300}
                            />{" "}
                        </div>
                        {/* <div className="flex space-x-1">
                            <Typography
                                label={"Fund Remaining:"}
                                type="p"
                                FontSize="sm"
                                color="primary"
                                variant={200}
                                classname="font-bold "
                            />{" "}
                            <Typography
                                label={`$ ${Funds?.walletToEscorw?.fundRemaining || 0}`}
                                type="p"
                                FontSize="sm"
                                color="primary"
                                variant={300}
                            />{" "}
                        </div> */}
                    </div>
                    <div className="flex flex-col gap-2">
                        {Funds?.walletToEscorw?.fundAssignedTo == "PROJECT" &&
                            <div className="flex flex-col items-end">
                                {Funds?.walletToEscorw?.fundTransfered ?
                                    <div className="px-2 bg-text-sucess-200 rounded-[5px] flex  justify-center ">
                                        <Button
                                            variant="line"
                                            label="Fund Transferred Successfully"
                                            className="text-text-sucess-100 font-bold text-sm "
                                        />
                                    </div> :
                                    <Button
                                        label="Fund Project"
                                        variant="Transparent"
                                        color="secondary"
                                        size="small"
                                        className='px-4'
                                        onClick={() => fundProjectEscrow('Project', Funds?.walletToEscorw?.projectFundAllocated, '')}
                                    />}
                            </div>}
                        {/* <div className="flex flex-col items-end">
                            {Funds?.walletToEscorw?.enableRemainingFundRelease ?
                                <div className="px-2 bg-text-sucess-200 rounded-[5px] flex  justify-center ">
                                    <Button
                                        variant="line"
                                        label="Remaining Fund Released Successfully"
                                        className="text-text-sucess-100 font-bold text-sm "
                                    />
                                </div> :
                                <Button
                                    label="Release Remaining Fund"
                                    variant="Transparent"
                                    color="secondary"
                                    size="small"
                                    className={"px-4 border-[1px] border-text-gray-400 text-text-gray-300 "}
                                    disable={!Funds?.walletToEscorw?.freeBalanceReleased}
                                    onClick={() => releaseRemainingFund()}
                                />}
                        </div> */}
                    </div>
                </div>
            </div>
            {Funds?.walletToEscorw?.fundAssignedTo !== "PROJECT" &&
                <div className="mt-[20px] shadow-navbar   rounded-[5px]">
                    {Funds && Funds.milestones && Funds.milestones.length > 0 && Funds.milestones.map((element: any, index: any) => {
                        return (
                            <div className="p-4 flex justify-between border-b-[1px] border-text-gray-50" key={`${index}-fundMilestone`}>
                                <div>
                                    <Typography
                                        label={element?.title}
                                        FontSize="base"
                                        classname="text-text-HeadLine-100 font-bold py-2"
                                        type="p"
                                    />

                                    <div className="flex space-x-1 py-1">
                                        <Typography
                                            label={"Fund Transferred:"}
                                            type="p"
                                            FontSize="sm"
                                            color="primary"
                                            variant={200}
                                            classname="font-bold "
                                        />{" "}
                                        <Typography
                                            label={`$ ${element?.fundTransfered || 0}`}
                                            type="p"
                                            FontSize="sm"
                                            color="primary"
                                            variant={300}
                                        />{" "}
                                    </div>{" "}
                                    <div className="flex space-x-1 py-1">
                                        <Typography
                                            label={"Transaction Date:"}
                                            type="p"
                                            FontSize="sm"
                                            color="primary"
                                            variant={200}
                                            classname="font-bold "
                                        />{" "}
                                        <Typography
                                            label={element?.transactionDate !== "NA" ? moment.unix(element?.transactionDate).format('DD-MMM-YYYY') : element?.transactionDate}
                                            type="p"
                                            FontSize="sm"
                                            color="primary"
                                            variant={300}
                                        />{" "}
                                    </div>{" "}
                                    <div className="flex space-x-1 py-1">
                                        <Typography
                                            label={"Total Fund Remaining: "}
                                            type="p"
                                            FontSize="sm"
                                            color="primary"
                                            variant={200}
                                            classname="font-bold "
                                        />{" "}
                                        <Typography
                                            label={`$ ${element?.fundAllocation || 0 - element?.fundTransfered || 0}`} type="p"
                                            FontSize="sm"
                                            color="primary"
                                            variant={300}
                                        />{" "}
                                    </div>
                                </div>
                                <div>
                                    {element?.milestoneFundsStatus?.fundTranscationIdToEscrow &&
                                        element?.milestoneFundsStatus?.fundTranscationIdToEscrow !== "" ?
                                        <div className="w-[246px] h-[32px] bg-text-sucess-200 rounded-[5px] flex  justify-center ">
                                            <Button
                                                variant="line"
                                                label="Fund Transferred Successfully"
                                                className="text-text-sucess-100 font-bold text-sm !cursor-default"
                                            />
                                        </div> :
                                        <Button
                                            label="Fund Milestone"
                                            variant="Transparent"
                                            color="secondary"
                                            size="small"
                                            className='px-4'
                                            onClick={() => fundProjectEscrow('Milestone', element?.fundAllocation, element?.milestoneId, element?.royaltyValue)}
                                        />}
                                </div>
                            </div>
                        );
                    })}
                </div>}
        </div>)
}

export default WalletToEscrow