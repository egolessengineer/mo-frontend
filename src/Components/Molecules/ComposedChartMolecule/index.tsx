import React, { useEffect, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Typography } from "../../Atoms";

export const ComposedChartMolecule = ({ data, datakey = [] }: any) => {
  return (
    <div className="relative w-full h-[250px]">
      {data.length === 0 ? <div className="absolute w-full h-full font-extrabold text-lg flex justify-center items-center leading-3">No Data</div> : null}
      <ResponsiveContainer>
        <ComposedChart
          width={1140}
          height={250}
          data={data}
          barGap={0}
          barSize={23}
          margin={{top:15}}
        >
          <XAxis dataKey="month" />
          <YAxis dataKey="Total" />
          <Tooltip />

          <Legend verticalAlign="top" align="left" wrapperStyle={{top:5, left:10}} />

          <CartesianGrid vertical={false} />
          {datakey.map((element: any, idx: number) => {
            return (
              <React.Fragment key={idx}>
                {!element?.line ? (
                  <Bar
                    name={element.name}                    
                    dataKey={element.data}
                    barSize={23}
                    fill={element.color}
                  >
                    <LabelList
                      dataKey={element.data}
                      position="center"
                      fontSize={8}
                      fill="white"
                    />
                  </Bar>
                ) : (
                  <Line
                    name={element.name}
                    key={idx + "line"}
                    dataKey={element.data}
                    stroke={element.color}
                    strokeWidth={3}
                    values=""
                  >
                    <LabelList
                      dataKey={element.data}
                      fill="#FF540D"
                      fontSize={12}
                      position={"top"}
                    />
                  </Line>
                )}
              </React.Fragment>
            );
          })}
        </ComposedChart>
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
          left: "-3%",
          transform: "rotate(-90deg)",
        }}
      >
        <Typography
          label={"Platform Revenue"}
          type="p"
          FontSize="xs"
          classname="text-text-primary-50 font-medium "
        />
      </div>
    </div>
  );
};
