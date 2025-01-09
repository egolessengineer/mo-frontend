import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "error";
  size?: "xs" | "small" | "medium" | "large" | "xm";
  label: string | React.ReactNode;
  disable?: boolean;
  variant?: "standard" | "line" | "Transparent";
  onClick?: any;
  icon?: string | any;
  style?: object;
  className?: string;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  iconPosition?: "left" | "right";
  icon2?: any;
  children?: any;
}

export const Button = ({
  color = "primary",
  size = "medium",
  label,
  disable = false,
  variant = "standard",
  icon,
  style,
  className = "",
  loading = false,
  type = "button",
  iconPosition = "right",
  icon2,
  children,
  ...props
}: ButtonProps) => {
  const sizeValues = {
    xs: "min-h-[30px]",
    small: "min-h-8  ",
    medium: "min-h-11  ",
    xm: "min-h-[44px]",
    large: " min-h-[46px]",
  };

  const colorValues = {
    primary:
      variant == "standard"
        ? "bg-primary-300 text-text-white-50 font-base hover:shadow-button"
        : "text-light-primary-500 ",
    secondary:
      variant == "standard"
        ? "bg-white text-dark-primary-500"
        : "text-light-secondary-500 hover:shadow-button",
    error:
      variant == "standard"
        ? "bg-danger-50 text-danger-400"
        : "text-danger-500 hover:text-danger-600",
  };

  const ColorTransparent = {
    primary:
      variant == "Transparent"
        ? "border border-[3px] border-text-text-gray-50 font-base text-text-primary-200"
        : "text-light-primary-500",
    secondary:
      variant == "Transparent"
        ? " border border-[1px]  border-text-secondary-50 font-base text-text-secondary-50 hover:bg-text-secondary-100 "
        : "",
    error: "",
  };

  const variantValues = {
    standard: ` w-full justify-center p-[0.2rem] font-medium   shadow-[1px_1px_5px_rgba(0,0,0,0.14)] border border-transparent box-border rounded-md 
    ${
      disable || loading
        ? "bg-gray-300 text-dark-secondary-300"
        : colorValues[color] +
          `${
            color == "error"
              ? " hover:bg-danger-500 hover:text-white"
              : " hover:shadow-button "
          }`
    }`,
    line: `${
      disable || loading ? "text-dark-secondary-300" : colorValues[color]
    } min-h-[32px] min-w-max justify-start`,

    Transparent: ` w-full bg-transparent font-medium  justify-center p-[0.2rem]   box-border rounded-md     ${
      disable || loading
        ? "bg-dark-secondary-100 text-dark-secondary-300"
        : ColorTransparent[color] +
          `${
            color == "error"
              ? " hover:bg-primary-50 hover:text-white"
              : " hover:shadow-button "
          }`
    }`,
  };

  return (
    <button
      type={type}
      className={`bg-dan bg-sec flex items-center   ${variantValues[variant]} ${
        disable || loading ? "cursor-not-allowed" : "cursor-pointer "
      }  ${
        iconPosition === "left" ? "flex-row-reverse" : "flex-row-reverse" // Conditionally set icon position
      } ${icon ? "gap-1 " : ""} ${sizeValues[size]} ${className}`}
      disabled={loading ? true : disable}
      style={{ ...style }}
      {...props}
    >
      {loading ? (
        <div className="min-w-min flex gap-2 justify-center ">
          <div
            className={`animate-spin w-6 h-6 border rounded-full ${
              disable ? "border-white " : "border-gray-600"
            }`}
          ></div>
          loading...
        </div>
      ) : (
        <>
          {icon2 && <span className=""> {icon2}</span>}
          {icon && (
            <span className="">{iconPosition === "left" ? icon : null}</span>
          )}

          {label ? label : children}
          {icon && (
            <span className="">{iconPosition === "right" ? icon : null}</span>
          )}
        </>
      )}
    </button>
  );
};
