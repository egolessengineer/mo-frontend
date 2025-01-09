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
import React from "react";

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value.split(" ")[0]}
      </text>
    </g>
  );
};

export const StackedBarMolecule = ({ data, datamap = [] }: any) => {
  return (
    <div className="relative w-[100%] h-[300px]">
      {data.length === 0 ? <div className="absolute w-full h-full font-extrabold text-lg flex justify-center items-center leading-3">No Data</div> : null}
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" />
          <YAxis dataKey="Total" />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{top:5}} />
          {datamap.map((element: any, idx: number) => {
            return (
              <React.Fragment key={element.data + idx}>
                {!element?.line ? (
                  <Bar                    
                    name={element.name}
                    dataKey={element.data}
                    stackId="a"
                    barSize={20}
                    fill={element.color}
                  >
                    <LabelList
                      dataKey={element.data}
                      fill="white"
                      fontSize={8}
                      position={"center"}
                    />
                  </Bar>
                ) : (
                  <Line
                    name={element.name}
                    type={"monotone"}
                    dataKey={element.data}
                    stroke={element.color}
                    strokeWidth={3}
                  ></Line>
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
