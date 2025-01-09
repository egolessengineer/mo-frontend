
interface Checkboxs {
  Onchange?: any;
  checked?: boolean;
  borderColor?: string;
  label: any;
  Name?: string;
  Id?: string;
  checkedColor?: string;
  disabled?: boolean
}
export const CheckBoxAtom = ({
  Onchange,
  checked,
  borderColor = "primary-300",
  label = "",
  Name = "",
  Id = "",
  checkedColor = "primary-300",
  disabled
}: Checkboxs) => {
  return (
    <>
      <div className="flex gap-x-[5px] ">
        <input
          name={Name}
          id={Id}
          type="checkbox"
          onChange={Onchange && Onchange}
          checked={checked && checked}
          value=""
          disabled={disabled}
          className={`w-4 h-4   border-[2px] border-${borderColor} rounded ring-0  outline-none  focus:ring-transparent checked:outline-none mt-[4px] text-${checkedColor} cursor-pointer 
          
          }  `}
        />
        {label}
      </div>
    </>
  );
};
