import React, { memo } from "react";

export const Notification = ({ isNotification }: any) => {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 19V10C6 8.4087 6.63214 6.88258 7.75736 5.75736C8.88258 4.63214 10.4087 4 12 4C13.5913 4 15.1174 4.63214 16.2426 5.75736C17.3679 6.88258 18 8.4087 18 10V19M6 19H18M6 19H4M18 19H20M11 22H13"
          stroke="white"
          // stroke-width="1.5"
          strokeWidth="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 4C12.5523 4 13 3.55228 13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3C11 3.55228 11.4477 4 12 4Z"
          stroke="white"
        />

        {isNotification && (
          <>
            <circle
              cx="5"
              cy="5"
              r="5"
              transform="matrix(1 0 0 -1 14 10)"
              fill="#60A3BA"
            />
            <circle
              cx="4.16667"
              cy="4.16667"
              r="4.16667"
              transform="matrix(1 0 0 -1 14.833 9.1665)"
              fill="white"
            />
            <circle
              cx="3.33333"
              cy="3.33333"
              r="3.33333"
              transform="matrix(1 0 0 -1 15.667 8.3335)"
              fill="#319F43"
            />
          </>
        )}
      </svg>
    </>
  );
};
