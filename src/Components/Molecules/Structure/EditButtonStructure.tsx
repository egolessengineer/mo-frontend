import { Button } from "../../Atoms";

export const EditButtonStructure = ({ onclick }: any) => {
  return (
    <Button
      variant="line"
      label=""
      onClick={onclick}
      icon={
        <img
          src="/Assets/Edit.svg"
          width="18px"
          className="pb-[14px] ml-[6px] "
        />
      }
      size="small"
    />
  );
};
