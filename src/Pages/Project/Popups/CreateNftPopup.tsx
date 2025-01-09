import {
  PublicKey,
  TokenCreateTransaction,
  TokenMintTransaction,
  TokenSupplyType,
  TokenType,
  CustomRoyaltyFee
} from "@hashgraph/sdk";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
  Button,
  HelperText,
  Textfield,
  Typography,
} from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";
import { getNumeratorDenominator, handleCustomError, showToast } from "../../../Utils/helper";
import {
  NFT_GET_ACCOUNTIFO,
  NFT_GET_TRANSACTIONS,
  UPLOAD_WEB3_STRORAGE,
} from "../../../sevices";

const CreateNftPopup = ({
  open,
  close,
  project_Details,
  getProvider,
  getSigner,
  state,
  pairingData,
}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      SymbolOfnft: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("required"),
      SymbolOfnft: Yup.string().required("required"),
    }),
    onSubmit: () => {
      createNFT();
    },
  });

  const createNFT = async () => {
    try {
      setIsLoading(true);
      let body = {
        projectId: project_Details?.id
      }
      let res = await UPLOAD_WEB3_STRORAGE(body);
      let metaData = res?.data?.cid;

      const provider = getProvider();
      const signer = getSigner(provider);

      let accountInfo: any = await NFT_GET_ACCOUNTIFO(
        signer?.provider?.accountToSign
      );
      let key = PublicKey.fromString(accountInfo?.data?.key?.key);

      console.log("key", accountInfo?.data?.key?.key);

      const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

      let nftCreate = await new TokenCreateTransaction()
        .setTokenName(formik.values.name)
        .setTokenSymbol(formik.values.SymbolOfnft)
        .setTokenType(TokenType.NonFungibleUnique)
        .setTokenMemo("")
        .setDecimals(0)
        .setInitialSupply(0)
        .setTreasuryAccountId(signer?.provider?.accountToSign)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(1)
        .setSupplyKey(key)
        .setAdminKey(key)
        .setAutoRenewAccountId(signer?.provider?.accountToSign)
      if (project_Details?.ProjectDetails?.postKpiRoyalty) {
        let { numerator, denominator } = getNumeratorDenominator(project_Details?.ProjectDetails?.postKpiRoyalty)
        console.log("Royalty", numerator, denominator, project_Details?.ProjectMembers?.CP?.User?.walletAddress);
        if (numerator > 0) {
          let nftCustomFee = new CustomRoyaltyFee()
            .setNumerator(numerator)
            .setDenominator(denominator)
            .setFeeCollectorAccountId(project_Details?.ProjectMembers?.CP?.User?.walletAddress)
            .setAllCollectorsAreExempt(true);
          // Add the custom fee to nftCreate
          nftCreate.setCustomFees([nftCustomFee]);
        }
      }
      await nftCreate.freezeWithSigner(signer)
      let nftCreateTx = await nftCreate.executeWithSigner(signer);

      let trasitionIDSplit = nftCreateTx?.transactionId.toString().split("@");
      let trasitionid = trasitionIDSplit[1].replace(".", "-");
      trasitionid = trasitionIDSplit[0] + "-" + trasitionid;

      await delay(3000);

      let responseData: any = await NFT_GET_TRANSACTIONS(trasitionid);

      const tokkenID = responseData?.data?.transactions[0]?.entity_id;
      console.log("tokkenID", tokkenID);
      mintNFT(tokkenID, key, metaData, signer);
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const mintNFT = async (
    tokenId?: any,
    treasuryKey?: any,
    metadata?: any,
    signer?: any
  ) => {
    try {
      setIsLoading(true);

      const metadataBuffer = Buffer.from(metadata);  
      const uint8ArrayMetadata = new Uint8Array(metadataBuffer.buffer, metadataBuffer.byteOffset, metadataBuffer.length);

      // let mintTx = await new TokenMintTransaction()
      //   .setTokenId(tokenId)
      //   .setMetadata([Buffer.from(metadata)])
      //   .freezeWithSigner(signer);
      let mintTx = await new TokenMintTransaction()  
      .setTokenId(tokenId)  
      .setMetadata([uint8ArrayMetadata]) // Use Uint8Array here  
      .freezeWithSigner(signer);  

      let resecpt = await (
        await mintTx.signWithSigner(signer)
      ).executeWithSigner(signer);
      console.log("mint", resecpt);
      showToast("NFT Minted Successfully", "success");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalAtom
      close={close}
      Title={
        <div className="flex justify-between bg-primary-100 px-5 py-4">
          <Typography
            label={"Create NFT"}
            type="p"
            FontSize="base"
            classname="font-bold text-white "
          />

          <Button
            variant="line"
            label=""
            onClick={close}
            icon={<img src="/Assets/Close.svg" alt="" />}
          />
        </div>
      }
      description={
        <form onSubmit={formik.handleSubmit}>
          <div className="px-5 pt-5 border-b-[1px] border-text-gray-50">
            <Typography
              label={"Enter NFT Details"}
              FontSize="base"
              classname="font-bold text-text-HeadLine-100 "
              type="p"
            />
          </div>
          <div className="px-5 pb-5 pt-[10px]">
            <div className="shadow-navbar flex flex-col gap-[10px] items-center rounded-[5px] p-5 ">
              <div className="mt-[10px] w-[80%]">
                <Typography
                  label={"Name"}
                  color="primary"
                  variant={200}
                  classname="font-bold "
                  FontSize="sm"
                  type="p"
                />
                <Textfield
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeHolder="Enter Name"
                />
                {formik.touched.name && formik.errors.name && (
                  <HelperText
                    position="right"
                    label={formik.errors.name}
                    className="text-xxs "
                    color="danger"
                    icon={
                      <img
                        src="/Assets/Danger.svg"
                        alt=""
                        className="pt-[6px] ml-[4px]"
                      />
                    }
                  />
                )}
              </div>
              <div className="w-[80%]">
                <Typography
                  label={"Symbol of NFT"}
                  color="primary"
                  variant={200}
                  classname="font-bold "
                  FontSize="sm"
                  type="p"
                />
                <Textfield
                  name="SymbolOfnft"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.SymbolOfnft}
                  placeHolder="Enter Symbol"
                />
                {formik.touched.SymbolOfnft && formik.errors.SymbolOfnft && (
                  <HelperText
                    position="right"
                    label={formik.errors.SymbolOfnft}
                    className="text-xxs "
                    color="danger"
                    icon={
                      <img
                        src="/Assets/Danger.svg"
                        alt=""
                        className="pt-[6px] ml-[4px]"
                      />
                    }
                  />
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-5 w-[80%] ">
                <div className="w-full border-[1px] border-text-gray-50 rounded-[5px] p-5 ">
                  <Typography
                    label={"Creator"}
                    color="primary"
                    variant={200}
                    FontSize="base"
                    classname="font-bold "
                    type="p"
                  />
                  <div className="mt-[10px] p-[10px] border-[1px] border-text-gray-50 rounded-[5px]">
                    <div className="flex flex-col items-center md:flex-row gap-[10px]">
                      <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                        <img
                          src={
                            project_Details?.ProjectMembers?.CP?.User
                              ?.About.profilePictureLink
                          }
                          className="w-full h-full object-cover aspect-auto"
                          alt=""
                        />
                      </div>

                      <div>
                        <Typography
                          label={
                            project_Details?.ProjectMembers?.CP?.User
                              ?.name
                          }
                          color="primary"
                          variant={200}
                          FontSize="sm"
                          classname="font-bold "
                          type="p"
                        />
                        <div className="flex space-x-1">
                          <Typography
                            label={"A/C:"}
                            color="primary"
                            variant={300}
                            FontSize="sm"
                            classname="font-bold "
                            type="p"
                          />
                          <Typography
                            label={project_Details?.ProjectMembers?.CP?.User?.walletAddress}
                            color="primary"
                            variant={300}
                            FontSize="sm"
                            type="p"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full border-[1px] border-text-gray-50 rounded-[5px] p-5">
                  <Typography
                    label={"Owner"}
                    color="primary"
                    variant={200}
                    FontSize="base"
                    classname="font-bold "
                    type="p"
                  />
                  <div className="border-[1px] border-text-gray-50 rounded-[5px] p-[10px] mt-[10px]">
                    <div className="flex flex-col items-center md:flex-row gap-[10px]">
                      <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                        <img
                          src={
                            project_Details?.ProjectMembers?.PURCHASER?.User
                              ?.About.profilePictureLink
                          }
                          className="w-full h-full object-cover aspect-auto"
                          alt=""
                        />
                      </div>
                      <div>
                        <Typography
                          label={
                            project_Details?.ProjectMembers?.PURCHASER?.User?.name
                          }
                          color="primary"
                          variant={300}
                          type="p"
                          FontSize="sm"
                        />
                        <div className="flex space-x-1">
                          <Typography
                            label={"A/C:"}
                            color="primary"
                            variant={300}
                            FontSize="sm"
                            classname="font-bold "
                            type="p"
                          />
                          <Typography
                            label={pairingData?.accountIds[0]}
                            color="primary"
                            variant={300}
                            FontSize="sm"
                            type="p"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <div className="w-[100px]">
                <Button
                  label="Cancel"
                  color="secondary"
                  variant="Transparent"
                  size="small"
                  onClick={close}
                />
              </div>
              <div className="w-[153px]">
                <Button
                  type="submit"
                  label="Create and Receive"
                  size="small"
                  disable={isLoading}
                />
              </div>
            </div>
          </div>
        </form>
      }
      PanelPosition={"w-full md:w-[740px]"}
      open={open}
    />
  );
};

export default CreateNftPopup;
