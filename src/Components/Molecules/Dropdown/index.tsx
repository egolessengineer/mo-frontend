import { Menu } from "@headlessui/react";
import React from "react";

interface MenuItem {
  label: string;
  value: any;
}

interface MenuInterface {
  BtnClass: string;
  BtnData: any;
  BtnMenu: string;
  MenuList: MenuItem[];
  active?: any;
  disable?: boolean;
  functionHandle: (value: any) => void;
}

export const DropdownMolecule: React.FC<MenuInterface> = ({
  BtnClass,
  BtnData,
  BtnMenu,
  MenuList = [],
  active,
  disable = false,
  functionHandle,
}: MenuInterface) => {
    return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className={`    ${BtnClass}`} disabled={disable}>
        {BtnData && BtnData}
      </Menu.Button>

      <Menu.Items
        className={`shadow-popUps border-b-[1px] border-text-gray-50 origin-top-right  rounded-md bg-white   focus:outline-none  ${BtnMenu}`}
      >
        {MenuList &&
          MenuList.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                  className={`${active ? "bg-primary-400" : "text-black"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm ${disable ? 'cursor-not-allowed' : 'cursor-default'}`}
                  onClick={() => {
                    functionHandle(item.value);
                  }}
                >
                  {item.label}
                </button>
              )}
            </Menu.Item>
          ))}
      </Menu.Items>
    </Menu>
  );
};
