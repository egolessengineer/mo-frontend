import { Typography } from "../../../Components/Atoms";
import {
  ComposedChartMolecule,
  StackedBarMolecule,
} from "../../../Components/Molecules";

const BlockChain = () => {
  return (
    <div className=" shadow-navbar rounded-[5px] px-5 pt-[10px] pb-5 ">
      <Typography
        label={"Blockchain NFT Activity"}
        classname="font-bold text-text-danger-100 "
        FontSize="2xl"
        type="p"
      />
      <div className="flex justify-between gap-5 flex-wrap">
        <div className="w-full xl:w-[45%]">
          <div className="mt-[10px]">
            <Typography
              label={"Success Bonus and Transfer"}
              type="p"
              classname="text-text-HeadLine-100 font-bold "
              FontSize="sm"
            />
          </div>

          <div className="flex justify-between gap-5 mt-[14px] pb-[10px] border-b-[1px] border-text-primary-50">
            <div>
              <Typography
                label={"Success Bonus Wallet Holding"}
                color="primary"
                variant={200}
                type="p"
                FontSize="xs"
              />{" "}
              <div className="text-right">
                <Typography
                  label={"300"}
                  type="p"
                  classname="text-text-gray-300 font-bold"
                  FontSize="base"
                />{" "}
              </div>
            </div>
            <div>
              <Typography
                label={"NFT to M.O. Library"}
                color="primary"
                variant={200}
                type="p"
                FontSize="xs"
              />{" "}
              <div className="text-right">
                <Typography
                  label={"300"}
                  type="p"
                  classname="text-text-gray-300 font-bold"
                  FontSize="base"
                />{" "}
              </div>
            </div>
            <div>
              <Typography
                label={"NFT to Purchaser"}
                color="primary"
                variant={200}
                type="p"
                FontSize="xs"
              />{" "}
              <div className="text-right">
                <Typography
                  label={"100"}
                  type="p"
                  classname="text-text-gray-300 font-bold"
                  FontSize="base"
                />{" "}
              </div>
            </div>
            <div>
              <Typography
                label={"NFT to CP"}
                color="primary"
                variant={200}
                type="p"
                FontSize="xs"
              />{" "}
              <div className="text-right">
                <Typography
                  label={"1255"}
                  type="p"
                  classname="text-text-gray-300 font-bold"
                  FontSize="base"
                />
              </div>
            </div>
          </div>
          <StackedBarMolecule />
        </div>
        <div className="w-full xl:w-[45%]">
          <div className="mt-[10px]">
            <Typography
              label={"Transaction, Creation, Average"}
              type="p"
              classname="text-text-HeadLine-100 font-bold "
              FontSize="sm"
            />
          </div>

          <div className="flex justify-between gap-5 mt-[14px] pb-[10px] border-b-[1px] border-text-primary-50">
            <div>
              <Typography
                label={"No. of Transaction On-chain"}
                color="primary"
                variant={200}
                type="p"
                FontSize="xs"
              />{" "}
              <div className="text-right">
                <Typography
                  label={"300"}
                  type="p"
                  classname="text-text-gray-300 font-bold"
                  FontSize="base"
                />{" "}
              </div>
            </div>
            <div>
              <Typography
                label={"Amount of NFT Created"}
                color="primary"
                variant={200}
                type="p"
                FontSize="xs"
              />{" "}
              <div className="text-right">
                <Typography
                  label={"1255"}
                  type="p"
                  classname="text-text-gray-300 font-bold"
                  FontSize="base"
                />{" "}
              </div>
            </div>
            <div>
              <Typography
                label={"NFTs Created Average"}
                color="primary"
                variant={200}
                type="p"
                FontSize="xs"
              />{" "}
              <div className="text-right">
                <Typography
                  label={"NFTs Created Average"}
                  type="p"
                  classname="text-text-gray-300 font-bold"
                  FontSize="base"
                />{" "}
              </div>
            </div>
          </div>
          <ComposedChartMolecule />
        </div>
      </div>
    </div>
  );
};

export default BlockChain;
