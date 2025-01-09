import { useState } from "react";
import { Button, Typography } from "../../../Components/Atoms";
import { ModalAtom } from "../../../Components/Molecules";
import { handleCustomError, showToast } from "../../../Utils/helper";
import { UPDATE_DISPUTE } from "../../../sevices";

const FAQResolutionPopUp = ({ open, close, disputeId,disputeDetails, setDisputeDetails }: any) => {

  const [isLoading, setIsLoading] = useState(false)

  async function handleFAQResolution() {
    try {
      setIsLoading(true);
      let body = {
        id: disputeId,
        resolutionType: "FAQ",        
      };
      let res = await UPDATE_DISPUTE(body);
      setDisputeDetails({ ...disputeDetails, ...res?.data });
      close()
      showToast("Please Refer FAQ", "success");
    } catch (error) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <ModalAtom
      Title={
        <div className="bg-primary-100 flex justify-between px-[20px] py-[15px] rounded-t-[5px]">
          <Typography
            label={"refer FAQ for resolution"}
            type="p"
            classname="font-bold text-text-white-50 capitalize"
            FontSize="base"
          />
          <Button
            variant="line"
            label=""
            onClick={close}
            icon={<img src="/Assets/Close.svg" alt=""/>}
          />
        </div>
      }
      description={
        <div className="px-[20px] py-[20px]">        
          <div className="flex justify-between mt-[20px]">
              <div className="w-[100px]">
                <Button
                  label="Cancel"
                  color="secondary"
                  variant="Transparent"
                  onClick={close}
                  size="small"
                />
              </div>
              <div className="w-[147px]">
                <Button onClick={handleFAQResolution} disable={isLoading} label="Send" size="small" />
              </div>
            </div>
        </div>
      }
      PanelPosition={"w-[868px]"}
      open={open}
    />
  );
};

export default FAQResolutionPopUp;
