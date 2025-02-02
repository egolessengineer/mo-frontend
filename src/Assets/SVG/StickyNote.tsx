import React from "react";
import { useState } from "react";

export const StickyNote = () => {
  const [ShowSticky, setShowSticky] = useState(false);
  setTimeout(() => {
    setShowSticky(true);
  }, 3000);
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_3089_19097)">
          <path
            d="M19 3H4.99C3.89 3 3 3.9 3 5L3.01 19C3.01 20.1 3.9 21 5 21H15L21 15V5C21 3.9 20.1 3 19 3ZM7 8H17V10H7V8ZM12 14H7V12H12V14ZM14 19.5V14H19.5L14 19.5Z"
            fill="white"
          />
          {!ShowSticky && (
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
        </g>
        <defs>
          <clipPath id="clip0_3089_19097">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
