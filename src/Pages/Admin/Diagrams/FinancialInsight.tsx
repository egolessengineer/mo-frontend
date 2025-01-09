import moment from "moment";
import { Typography } from "../../../Components/Atoms";
import { BarChartMolecule } from "../../../Components/Molecules";

const FinancialInsight = ({ chartData }: any) => {
  let { financialRevenuePurchaser, financialRevenuePlatform } = chartData;

  let totalfinancialRevenuePurchaser =
    financialRevenuePurchaser &&
    financialRevenuePurchaser[financialRevenuePurchaser.length - 1]
      ?.hbar_totalfundallocation +
      financialRevenuePurchaser[financialRevenuePurchaser.length - 1]
        ?.usdc_totalfundallocation;

  let totalfinancialRevenuePlatform =
    financialRevenuePlatform &&
    financialRevenuePlatform &&
    financialRevenuePlatform[financialRevenuePlatform.length - 1]
      ?.platform_usdc_rev +
      financialRevenuePlatform[financialRevenuePlatform.length - 1]
        ?.platform_hbar_rev;

  let financialRevenuePurchaserSliced =
    financialRevenuePurchaser &&
    financialRevenuePurchaser
      .map((item: any, idx: number) => {
        return {
          ...item,
          Total: totalfinancialRevenuePurchaser,
          month: moment(item?.month, "YYYY-MM").format("MMM YY"),
        };
      })
      .slice(0, financialRevenuePurchaser.length - 1);

  let financialRevenuePlatformSliced =
    financialRevenuePlatform &&
    financialRevenuePlatform
      .map((item: any, idx: number) => {
        return {
          ...item,
          Total: totalfinancialRevenuePlatform,
          month: moment(item.month , "YYYY-MM").format("MMM YY"),
        };
      })
      .slice(0, financialRevenuePlatform.length - 1);

  return (
    <div className=" shadow-navbar rounded-[5px] pb-5">
      <div className="px-4 pt-4">
        <Typography
          label={"Financial Insights"}
          classname="font-bold text-[#FFD700] "
          FontSize="2xl"
          type="p"
        />
      </div>
      <div className="flex px-5 py-[10px] justify-between flex-wrap  ">
        <div className="w-full xl:w-[45%]">
          <div className="mt-[10px]">
            <Typography
              label={"Platform Revenue"}
              type="p"
              classname="text-text-HeadLine-100 font-bold "
              FontSize="sm"
            />
          </div>
          <div className="mt-[10px] flex justify-start gap-10 border-b-[1px] border-text-primary-50 pb-[5px] ">
            <div className="">
              <Typography
                label={"Total USDC Revenue"}
                color="primary"
                variant={200}
                FontSize="xs"
                type="p"
              />
              <div className="text-right">
                <Typography
                  label={
                    financialRevenuePlatform &&
                    financialRevenuePlatform[
                      financialRevenuePlatform.length - 1
                    ]?.platform_usdc_rev
                  }
                  type="p"
                  FontSize="base"
                  classname="text-text-gray-200 font-bold "
                />
              </div>
            </div>
            <div className="">
              <Typography
                label={"Total HBAR Revenue"}
                color="primary"
                variant={200}
                FontSize="xs"
                type="p"
              />
              <div className="text-right">
                <Typography
                  label={
                    financialRevenuePlatform &&
                    financialRevenuePlatform[
                      financialRevenuePlatform.length - 1
                    ]?.platform_hbar_rev
                  }
                  type="p"
                  FontSize="base"
                  classname="text-text-gray-200 font-bold "
                />
              </div>
            </div>            
          </div>

          <div>
            <BarChartMolecule
              data={financialRevenuePlatformSliced || []}
              BarColorFirst="#0166B1"
              BarColorSecond="#70c9f1"
              XAxisdata={"month"}
              showname={["USDC Revenue", "HBAR Revenue"]}
              showKeys={["platform_usdc_rev", "platform_hbar_rev"]}
            />
          </div>
        </div>
        <div className="mt-[8px] w-full  xl:w-[45%] ">
          <div className="mt-[10px]">
            <Typography
              label={"Average Revenue per Purchaser"}
              type="p"
              classname="text-text-HeadLine-100 font-bold "
              FontSize="sm"
            />
          </div>
          <div className="mt-[10px] flex justify-start gap-10 border-b-[1px] border-text-primary-50 pb-[5px]">
            <div className="">
              <Typography
                label={"Total USDC Revenue"}
                color="primary"
                variant={200}
                FontSize="xs"
                type="p"
              />
              <div className="text-right">
                <Typography
                  label={
                    financialRevenuePurchaser &&
                    financialRevenuePurchaser[
                      financialRevenuePurchaser.length - 1
                    ]?.usdc_totalfundallocation
                  }
                  type="p"
                  FontSize="base"
                  classname="text-text-gray-200 font-bold "
                />
              </div>
            </div>
            <div className="">
              <Typography
                label={"Total HBAR Revenue"}
                color="primary"
                variant={200}
                FontSize="xs"
                type="p"
              />
              <div className="text-right">
                <Typography
                  label={
                    financialRevenuePurchaser &&
                    financialRevenuePurchaser[
                      financialRevenuePurchaser.length - 1
                    ]?.hbar_totalfundallocation
                  }
                  type="p"
                  FontSize="base"
                  classname="text-text-gray-200 font-bold "
                />
              </div>
            </div>
            
          </div>

          <div>
            <BarChartMolecule
              data={financialRevenuePurchaserSliced || []}
              BarColorFirst="#0166B1"
              BarColorSecond="#70c9f1"
              XAxisdata={"month"}
              showname={["USDC Revenue", "HBAR Revenue"]}
              showKeys={[
                "usdc_totalfundallocation",
                "hbar_totalfundallocation",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialInsight;
