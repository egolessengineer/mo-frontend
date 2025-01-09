import React from "react";
import { Typography } from "../Typography";

interface CustomStatusTextProps {
  title: string;
  status: string;
}

const CustomStatusText: React.FC<CustomStatusTextProps> = ({ title, status }) => {
  const buttonStyles = [
    status.toLowerCase() === "in_progress"
      ? "bg-[#FFEBCC]"
      : status.toLowerCase() === "hold"
        ? "bg-text-Hold-100"
        : status.toLowerCase() === "rework"
          ? "bg-danger_bg"
          : status.toLowerCase() === "draft"
            ? "bg-danger_bg" :
            status.toLocaleLowerCase() === "complete" ? "bg-text-sucess-200"
              : "bg-text-Hold-100"
  ];

  const textStyles = [
    status.toLowerCase() === "in_progress"
      ? "text-[#FF9900]"
      : status.toLowerCase() === "hold"
        ? "text-text-Hold-50"
        : status.toLowerCase() === "rework"
          ? "text-text-danger-100"
          : status.toLowerCase() === "draft"
            ? "text-text-danger-100" :
            status.toLocaleLowerCase() === "complete" ? "text-text-sucess-100"
              : "text-text-Hold-50",
  ];

  return (
    <div className={`${buttonStyles} rounded-md`}>
      {title && (
        <Typography
          label={title}
          color={`${textStyles.join(" ")}`}
          variant={300}
          FontSize="xxs"
          type="p"
          classname={`${textStyles.join(
            " "
          )} h-max py-1 px-3 min-w-max font-medium tracking-wide`}
        />
      )}
    </div>
  );
};

export default CustomStatusText;
