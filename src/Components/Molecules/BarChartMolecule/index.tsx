import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Typography } from "../../Atoms";

export const BarChartMolecule = ({
  BarColorFirst,
  BarColorSecond,
  data,
  XAxisdata,
  showname = [],
  showKeys = [],
}: any) => {
  return (
    <div className="relative  w-full h-[250px]">
      {data.length === 0 ? (
        <div className="absolute w-full h-full font-extrabold text-lg flex justify-center items-center leading-3">
          No Data
        </div>
      ) : null}
      <ResponsiveContainer>
        <BarChart
          width={551}
          height={250}
          data={data}
          barGap={0}
          margin={{ top: 15 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey={XAxisdata} />
          <YAxis dataKey={"Total"} />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ top: 5}} />

          <Bar
            name={showname[0]}
            dataKey={showKeys[0]}
            barSize={23}
            fill={BarColorFirst}
          >
            <LabelList
              dataKey={showKeys[0]}
              fontSize={8}
              fill="#FFFFFF"
              position={"center"}
            />
          </Bar>
          <Bar
            name={showname[1]}
            dataKey={showKeys[1]}
            barSize={23}
            fill={BarColorSecond}
          >
            <LabelList
              dataKey={showKeys[1]}
              fontSize={8}
              fill="#74777A"
              position={"center"}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ position: "absolute", bottom: "-3%", left: "50%" }}>
        <Typography
          label={"Time (Months)"}
          type="p"
          FontSize="xs"
          classname="text-text-primary-50 font-medium "
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "-8%",
          transform: "rotate(-90deg)",
        }}
      >
        <Typography
          label={"Total USDC Revenue"}
          type="p"
          FontSize="xs"
          classname="text-text-primary-50 font-medium "
        />
      </div>
    </div>
  );
};
