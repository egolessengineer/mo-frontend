import { Typography } from "../../Atoms";

interface Struct {
  optionText?: any;
  TopButton?: any;
  Buttons?: any;
  Heading: any;
  sideComponent?: any;
  sideComponetHeading?: any;
  mainSection: any;
  border?: boolean;
  className?:any
}
let a = [1, 2, 34];
export const Structure = (props: Struct) => {
  const {
    Buttons,
    TopButton,
    optionText,
    Heading,
    sideComponent,
    sideComponetHeading,
    mainSection,
    border = true,
    className,
  } = props;
  let borderBottom;
  if (border) {
    borderBottom =
      "mt-[20px] flex lg:justify-between justify-center border-b-[1px] border-text-gray-50  ";
  } else {
    borderBottom = "mt-[20px] flex lg:justify-between justify-center ";
  }
  return (
    <div className="scroll-smooth p-4 lg:p-5 mb-10 flex flex-col flex-grow">
      <div className="flex flex-row justify-between sm:flex p-5 lg:p-0">
        <div className="">
          <Typography
            type="h1"
            label={Heading}
            variant={50}
            color="secondary"
            FontSize="3xl"
            classname={`leading-[32px] capitalize ${className}`}
          />
        </div>
        <div>
          {TopButton && <div className="flex  space-x-[20px]">{TopButton}</div>}
        </div>
      </div>
      <div className="flex lg:flex-row xs:flex-col lg:space-x-5 gap-4 flex-grow">
        <div className="w-[100%] flex-grow flex flex-col">
          <div className={borderBottom}>
            <div className=" flex space-x-[10px] pt-[5px] ">
              {optionText && optionText}
            </div>
            {Buttons && (
              <div className="flex gap-5 w-full justify-end ">{Buttons}</div>
            )}
          </div>
          <div className=" py-4 flex-grow flex flex-col justify-between">{mainSection}</div>
        </div>
        {sideComponent && (
          <div className="w-full lg:w-[30%] m-0">
            <div className="mt-[35px] border-b-[1px] border-text-gray-50 ">
              {sideComponetHeading}
            </div>
            <div className="py-4">{sideComponent}</div>
          </div>
        )}
      </div>
    </div>
  );
};
