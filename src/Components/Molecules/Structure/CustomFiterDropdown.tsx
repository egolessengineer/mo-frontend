import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Typography } from "../../Atoms";

interface CustomFilterDropdownProps {
  Title?: string;
  value: string | null;
  onChange?: (newValue: any) => void;
  options: { key: string; value: string }[] | any[];
  selected?: boolean;
  buttonClassName?: string;
  optionsClassName?: string;
  icon?: any;
  iconPosition?: "left" | "right";
}

const CustomFilterDropdown: React.FC<CustomFilterDropdownProps> = ({
  Title,
  value,
  onChange,
  options,
  selected,
  buttonClassName = "w-full",
  optionsClassName = "top-[35px] z-50 w-full bg-white rounded-[5px] shadow-navbar overflow-hidden",
  icon,
  iconPosition = "right",
  ...rest
}) => {
  return (
    <>
      <Typography
        label=""
        type="p"
        FontSize="sm"
        color="primary"
        variant={200}
        classname="font-bold "
      />
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={` min-w-[160px] h-[35px] font-semibold border broder-[1px] border-text-secondary-50 rounded-[5px] text-text-secondary-50 outline-none  text-base flex justify-between gap-1 items-center p-[20px] ${buttonClassName} 
               ${iconPosition === "left"
                  ? "flex-row-reverse"
                  : "flex-row-reverse"
                }`}
            >
              {!icon ? (
                <img
                  src={
                    Title === "Sort By"
                      ? "/Assets/Sort.svg"
                      : "/Assets/filter.svg"
                  }
                  className=""
                  alt=""
                />
              ) : (
                icon
              )}
              <span className="block truncate">
                {value ? options.find(option => option.key === value)?.value : Title}
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={`absolute bg-white rounded-[5px] shadow-navbar ${optionsClassName}`}
              >
                {options?.map((element, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-[6px]  px-[10px] pr-4 ${active ? "bg-primary-500" : ""
                      }`
                    }
                    value={element?.key}
                  >
                    {({ selected }) => (
                      <>
                        <span className="block truncate">{element?.value}</span>
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

export default CustomFilterDropdown;
