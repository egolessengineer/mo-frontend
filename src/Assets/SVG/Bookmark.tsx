import { click } from "@testing-library/user-event/dist/click";
import React from "react";

export const Bookmark = (props: { clicked?: boolean; color?: string }) => {
  let { clicked, color } = props;

  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={clicked ? `#00BFFD` : "None"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.00929 5.00058V5C7.00929 4.37445 7.46275 4 7.85714 4H17.1429C17.5435 4 18 4.3812 18 5V19.4371L12.9191 17.092L12.5 16.8986L12.0809 17.092L7.00091 19.4367L7.00929 5.00058Z"
          stroke={color ? color : "#00B7FD"}
          // stroke-width="2"
          strokeWidth={2}
        />
      </svg>
    </>
  );
};
