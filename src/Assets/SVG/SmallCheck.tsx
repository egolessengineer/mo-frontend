import React from "react";

export const SmallCheck = ({ stroke, fill }: any) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.295 3.79L5 7.085L3.205 5.295L2.5 6L5 8.5L9 4.5L8.295 3.79ZM6 1C3.24 1 1 3.24 1 6C1 8.76 3.24 11 6 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 6 1ZM6 10C3.79 10 2 8.21 2 6C2 3.79 3.79 2 6 2C8.21 2 10 3.79 10 6C10 8.21 8.21 10 6 10Z"
        fill={fill ? fill : "#74777A"}
        stroke={stroke ? stroke : "none"}
      />
    </svg>
  );
};
