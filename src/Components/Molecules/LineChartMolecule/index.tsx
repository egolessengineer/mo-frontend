import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "../../Atoms";



export const LineChartMolecule = ({data}:any) => {
  return (
    <div className="relative w-full h-[300px]">
      {data.length === 0 ? <div className="absolute w-full h-full font-extrabold text-lg flex justify-center items-center leading-3">No Data</div> : null}
      <ResponsiveContainer>
        <LineChart width={500} height={250} data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" />
          <YAxis dataKey={"Total"} />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{top:-5}}/>
          <Line name="No of Escrow" type="monotone" dataKey="escrow" stroke="#84CD9D" />
          <Line name="Penalty No" type="monotone" dataKey="penalty_no" stroke="#A126EF" />          
        </LineChart>
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
          left: 0,
          transform: "rotate(-90deg)",
        }}
      >
        <Typography
          label={"Amount"}
          type="p"
          FontSize="xs"
          classname="text-text-primary-50 font-medium "
        />
      </div>
    </div>
  );
};
