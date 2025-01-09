import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Typography } from "../../Atoms";

interface CustomDropdownProps {
  Title?: string;
  placeHolder?: string;
  value: string | null;
  onChange: (newValue: any) => void;
  options: (string | { key: string; value: string })[];
  selected?: boolean;
  buttonClassName?: string;
  optionsClassName?: string;
  icon?: any;
  disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  Title,
  value,
  onChange,
  options,
  selected,
  placeHolder,
  buttonClassName = "w-full",
  optionsClassName = "top-[62px] z-50 w-full bg-white rounded-[5px] shadow-navbar",
  icon,
  disabled,
  ...rest
}) => {
  return (
    <>
      <Typography
        label={Title}
        type="p"
        FontSize="sm"
        color="primary"
        variant={200}
        classname="font-bold  "
      />
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={` h-[40px] border broder-[1px] border-text-gray-50 rounded-[5px] text-text-primary-300 outline-none  text-sm flex justify-between items-center p-[10px] ${buttonClassName}`}
            >
              <span className="block truncate">
                {value === null || value === ""
                  ? placeHolder || "Select"
                  : typeof options[0] === "string"
                  ? options.includes(value)
                    ? value
                    : placeHolder || "Select"
                  : options.map((option) =>
                      typeof option === "string"
                        ? option
                        : option.key === value
                        ? option.value
                        : null
                    )}
              </span>
              {!icon ? (
                <img
                  src="/Assets/DropDownICon.svg"
                  className=""
                  alt="Dropdown"
                />
              ) : (
                icon
              )}
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={`absolute bg-white rounded-[5px] shadow-navbar overflow-scroll overflow-x-hidden max-h-[150px] ${optionsClassName}`}
              >
                {options.map((element, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-[6px]  px-[10px] pr-4 ${
                        active ? "bg-primary-500" : ""
                      }`
                    }
                    value={typeof element === "string" ? element : element.key}
                  >
                    {({ selected }) => (
                      <>
                        <span className="block truncate">
                          {typeof element === "string"
                            ? element
                            : element.value}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#731B17]">
                            {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </>
  );
};

export default CustomDropdown;
