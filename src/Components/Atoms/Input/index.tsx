import React from "react";
interface TextfieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  placeHolder?: string;
  onChange?: any;
  disable?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  multiline?: boolean;
  defaultValue?: any;
  onClick?: any;
  value?: any;
  type?: string;
  className?: string;
  style?: Object;
  name?: string;
  max?: number | any;
  min?: number | any;
  iconClassName?:string;
}

export const Textfield = ({
  placeHolder,
  onChange,
  disable = false,
  leftIcon,
  rightIcon,
  multiline = false,
  defaultValue,
  onClick,
  value,
  type = "text",
  className,
  style,
  name,
  min,
  max = 0,
  iconClassName,
  ...props
}: TextfieldProps) => {
  return (
    <div className={`relative flex  w-full ${multiline ? "h-28" : "h-10"}`}>
      {multiline ? (
        <textarea
          className={` ${
            disable
              ? " border-2 border-text-text-gray-50 opacity-40"
              : "active:border-light-primary-400 focus:border-light-primary-400 hover:border-light-primary-100"
          } placeholder:text-text-gray-50  border-[1px] p-2 resize-none rounded-[5px] w-[100%] outline-none  border-text-gray-50 focus:ring-0 focus:outline-none focus:border-text-gray-50 ${className}`}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          placeholder={placeHolder}
          disabled={disable}
          style={style}
          name={name} 
          {...props}         
        ></textarea>
      ) : (
        <>
          {leftIcon && (
            <button
              className={`${
                disable ? "opacity-40 cursor-default" : ""
              } absolute  left-[0.1rem] text-light-gray-900 outline-none flex justify-center items-center`}
              onClick={onClick}
            >
              {leftIcon}
            </button>
          )}
          <input
            min={min}
            max={max}
            id="input"
            maxLength={max === 0 ? undefined : max}
            className={`${className} ${
              disable
                ? "border-text-text-gray-50"
                : "active:border-light-primary-400 focus:border-text-gray-50   "
            } text-sm w-full placeholder:text-text-gray-50  border-[1px]  rounded-[5px] outline-none focus:outline-none border-text-gray-50 focus:ring-0
            ${leftIcon ? "pl-9 pr-2" : rightIcon ? "pr-9 pl-2" : "pl-2"}
        `}
            type={type}
            onChange={onChange}
            placeholder={placeHolder}
            defaultValue={defaultValue}
            value={value}
            disabled={disable}
            style={style}
            name={name}
            {...props}
          />
          {rightIcon && (
            <button
              className={`${
                disable ? "opacity-40 cursor-default" : ""
              } absolute top-0 bottom-0 right-0 text-light-gray-900 outline-none flex justify-center items-center ${iconClassName}`}
              onClick={onClick}
            >
              {rightIcon}
            </button>
          )}
        </>
      )}
    </div>
  );
};
