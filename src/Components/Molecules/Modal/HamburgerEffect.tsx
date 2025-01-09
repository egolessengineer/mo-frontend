import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { HamBurgerOptions } from "./HamBurgerOptions";
export function HamburgerEffect() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return createPortal(
    <div className="fixed left-0 top-[62px] z-[9999] flex h-full w-[full]   bg-[#00000060] overflow-hidden ">
      <div className=" rounded-xxl  overflow-hidden overflow-y-hidden ">
        <HamBurgerOptions />
      </div>
    </div>,
    document.body
  );
}
