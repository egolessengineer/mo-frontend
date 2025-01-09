import { Cell, Label, Legend, Pie, PieChart, Tooltip } from "recharts";
import { projectStatus } from "../../../Constants/MenuList";
export const Piechart = ({ data }: any) => {
  const COLORS = [
    "#FF9900",
    "#319F43",
    "#A875FF",
    "#FF540D",
    "#2F2F2F",
    "#FF9900",
  ];

  const data01 = [
    { name: "Unassigned", value: 3 },
    { name: "InProgress", value: 3 },
    { name: "Hold", value: 3 },
    { name: "Rework", value: 3 },
    { name: "Completed", value: 3 },
    { name: "In Review", value: 3 },
  ];
  const renderColorfulLegendText = (value: string, entry: any) => {
    return (
      <span style={{ color: "#596579", fontWeight: 500, padding: "10px" }}>
        {projectStatus[value] || ""}
      </span>
    );
  };

  const getTotalProjects = () => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].value;
    }
    return total;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    return (
      <div className="p-3 bg-white text-black text-base shadow-md text-center">
        {active && payload &&
          <div className="flex gap-2 items-center">
            <p className="flex items-center">{projectStatus[payload[0]?.name] || ""}:</p>
            <p className="flex items-center">{payload[0]?.value || ""}</p>
          </div>
        }
      </div>
    );

  }

  return (
    <div className=" w-full min-w-[300px] shadow-navbar  rounded-[5px]">
      <PieChart width={300} height={250}>
        <Legend
          iconType={"line"}
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconSize={10}
          formatter={renderColorfulLegendText}
        />
        <Pie
          data={data}
          dataKey={"value"}
          innerRadius={60}
          outerRadius={70}
          fill="#8884d8"
        >
          <Label
            value={getTotalProjects()}
            position="centerBottom"
            className="label-top text-text-primary-200 font-bold text-[45px] "
            dy="144px"
          />

          <Label
            value="Total Projects"
            position={"centerTop"}
            className="label text-text-primary-200 font-medium text-base "
            dy={20}
          />

          {data.map((entry: any, index: any) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </div>
  );
};
