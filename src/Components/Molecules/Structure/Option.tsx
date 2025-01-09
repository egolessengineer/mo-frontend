import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { Typography } from "../../Atoms";

interface OptionProps {
  options: any[]; // Define the type of the options prop as an array of strings
  optionLabel?: string;
  buttonClassName?: string;
  optionsClassName?: string;
  Title: any;
  style?: any;
  icon?: any;
  handledropDown?: any;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
  optionBeforeImg?: boolean;
}
export const Option = ({
  options = [],
  handledropDown,
  buttonClassName = "w-full",
  optionsClassName = "top-[62px] z-50 w-full bg-white rounded-[5px] shadow-navbar pb-[10px]",
  Title = "",
  style,
  icon,
  value,
  placeholder,
  optionLabel,
  disabled,
  optionBeforeImg,
}: OptionProps) => {
  const [selected, setSelected] = useState("");

  let propertyNames: any = optionLabel && optionLabel.split(".");

  return (
    <>
      <Typography
        label={Title}
        type="p"
        FontSize="sm"
        color="primary"
        variant={200}
        classname="font-bold "
      />
      <Listbox
        value={value || selected}
        onChange={(e) => {
          handledropDown(e);
          let checkType = typeof e === "object";
          if (checkType) {
            let result = propertyNames.reduce((o: any, key: any) => o[key], e);
            setSelected(result);
          } else {
            setSelected(e);
          }
        }}
        disabled={disabled || (options && options.length < 1)}
      >
        <Listbox.Button
          className={` h-[40px] border broder-[1px] border-text-gray-50 rounded-[5px] text-text-primary-300 outline-none  text-sm flex justify-between items-center p-[10px] ${buttonClassName}`}
          style={style}
        >
          <span className="block truncate">
            {value || selected || placeholder}
          </span>
          {!icon ? (
            <img src="/Assets/DropDownICon.svg" className="" alt="Dropdown" />
          ) : (
            icon
          )}
        </Listbox.Button>
        <Listbox.Options
          className={`absolute bg-white rounded-[5px] shadow-navbar overflow-y-auto ${options.length > 10 ? "!h-[300px]" : ""} ${optionsClassName} `}
        >
          {options.map((element, index) => {
            let checkType = typeof element === "object";
            let result = element;
            if (checkType) {
              result = propertyNames.reduce(
                (o: any, key: any) => o[key],
                element
              );
            }
            return (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-[6px] px-[10px] pr-4 ${active ? "bg-primary-500" : ""
                  } flex items-center gap-3`
                }
                value={element}
              >
                {optionBeforeImg && (
                  <div className="bg-[#3498db] rounded-full text-white w-[40px] h-[40px] flex justify-center items-center">
                    {result.charAt(0) || element.charAt(0)}
                  </div>
                )}
                {result || element}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </Listbox>
    </>
  );
};
