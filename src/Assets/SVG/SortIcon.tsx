import React from "react";

export const SortIcon = ({ color }: any) => {
  return (
    <svg
      width="19"
      height="13"
      viewBox="0 0 19 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.125 12.75H6.375V10.6667H0.125V12.75ZM0.125 0.25V2.33333H18.875V0.25H0.125ZM0.125 7.54167H12.625V5.45833H0.125V7.54167Z"
        fill={color ? color : "#585858"}
      />
    </svg>
  );
};
