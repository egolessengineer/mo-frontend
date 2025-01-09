import React from "react";

export const FilterIcon = ({ color }: any) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2651_23781)">
        <path
          d="M10.4167 18.75H14.5833V16.6667H10.4167V18.75ZM3.125 6.25V8.33333H21.875V6.25H3.125ZM6.25 13.5417H18.75V11.4583H6.25V13.5417Z"
          fill={color ? color : "#585858"}
        />
      </g>
      <defs>
        <clipPath id="clip0_2651_23781">
          <rect width="25" height="25" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
