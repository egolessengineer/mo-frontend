import { Menu } from "@headlessui/react";
interface MenuInfterface {
  BtnClass: string;
  BtnData: any;
  BtnMenu: string;
  MenuList: Array<string>;
  active?: any;
  functionHandle: any;
}

export const MenuMolecule = ({
  BtnClass,
  BtnData,
  BtnMenu,
  MenuList = [],
  active,
  functionHandle,
}: MenuInfterface) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className={`    ${BtnClass}`}>
        {BtnData && BtnData}
      </Menu.Button>

      <Menu.Items
        className={`shadow-popUps border-b-[1px] border-text-gray-50 origin-top-right  rounded-md bg-white   focus:outline-none  ${BtnMenu}`}
      >
        {MenuList &&
          MenuList.map((element, index) => {
            return (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary-400" : "text-black"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => {
                      functionHandle(element);
                    }}
                  >
                    {element}
                  </button>
                )}
              </Menu.Item>
            );
          })}
      </Menu.Items>
    </Menu>
  );
};
