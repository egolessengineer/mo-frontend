import { assets } from "../../../Assets";
import { CloseHamBurger, SucessAssign } from "../../../Assets/SVG";
import { Button, Typography } from "../../../Components/Atoms";
import { ButtonLoader } from "../../../Components/Atoms/Loader";
import { ModalAtom } from "../../../Components/Molecules";

// interface

const CreateEscrowPopup = ({
  OpenInfoPOP,
  POPInfoClose,
  prevpage,
  project_name,
  provider_name,
  project_id,
  fund_allocation,
  handlecreateEscrow,
  isLoading
}: any) => {
  return (
    <ModalAtom
      Title={
        <div
          className="flex justify-end m-[10px] cursor-pointer"
          onClick={POPInfoClose}
        >
          {!isLoading && <CloseHamBurger color="#00B7FD" width={"24"} />}
        </div>
      }
      description={
        isLoading ?
          <div className="flex flex-col items-center justify-center h-[80vh]">
            Escrow creation is in progress.
            Please await the completion of escrow setup.
            <img src={assets.GearLoader} alt="" />
          </div>
          : <>
            {" "}
            <div className="flex flex-col items-center">
              <SucessAssign />
              <div className="mt-[20px]">
                <Typography
                  label="Project Accepted"
                  type="p"
                  classname="text-text-sucess-100  "
                  style={{ fontSize: "36px" }}
                />
              </div>
              <div className="mt-[10px]">
                <Typography
                  label=" Your project has been accepted by provider"
                  type="p"
                  color="primary"
                  variant={300}
                  FontSize="3xl"
                />
              </div>
            </div>
            <div className="mt-[10px] shadow-navbar p-5 flex justify-between rounded-[5px] m-5 mb-1">
              <div className="text-left">
                <Typography
                  label={"Project"}
                  color="priamry"
                  variant={200}
                  FontSize="base"
                  classname="font-medium "
                  type="p"
                />
                <Typography
                  label={project_name}
                  color="priamry"
                  variant={200}
                  FontSize="sm"
                  type="p"
                />
                <div className="mt-[10px]">
                  <Typography
                    label={"Provider"}
                    color="priamry"
                    variant={200}
                    FontSize="base"
                    classname="font-medium "
                    type="p"
                  />
                  <Typography
                    label={provider_name}
                    color="priamry"
                    variant={200}
                    FontSize="sm"
                    type="p"
                  />
                </div>
              </div>
              <div className="text-right">
                <Typography
                  label={"Project ID"}
                  color="priamry"
                  variant={200}
                  FontSize="base"
                  classname="font-medium "
                  type="p"
                />
                <Typography
                  label={project_id}
                  color="priamry"
                  variant={200}
                  FontSize="sm"
                  type="p"
                />
                <div className="mt-[10px]">
                  <Typography
                    label={"Total Fund Allocation"}
                    color="priamry"
                    variant={200}
                    FontSize="base"
                    classname="font-medium "
                    type="p"
                  />
                  <Typography
                    label={fund_allocation + "$"}
                    color="priamry"
                    variant={200}
                    FontSize="sm"
                    type="p"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-start items-center py-1 px-5">
              <Typography
                label={"Note: Establishing escrow could require more time."}
                variant={200}
                FontSize="base"
                classname="font-medium text-text-danger-200"
                type="p"
              />
            </div>
            <div className="flex justify-end space-x-5 mx-5 mb-5">
              <div className="w-[140px]">
                <Button
                  onClick={handlecreateEscrow}
                  label={isLoading ? <div className="flex items-center gap-2">
                    <div className="flex items-center">Creating</div>
                    <ButtonLoader />
                  </div> : "Create Escrow"}
                  variant="Transparent"
                  color="secondary"
                  disable={isLoading}
                />
              </div>
              <div className="w-[176px]">
                <Button
                  onClick={prevpage}
                  label="View Project Details"
                  size="small"
                />
              </div>
            </div>
          </>
      }
      PanelPosition={"w-[565px]"}
      positionDiv={
        "flex min-h-full items-center justify-center p-4 text-center"
      }
      open={OpenInfoPOP}
    />
  );
};

export default CreateEscrowPopup;
