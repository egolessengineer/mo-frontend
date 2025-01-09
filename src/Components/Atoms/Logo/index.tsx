
interface logoInterface {
  position?: "start" | "end" | "center" | undefined;
  Shadow?: boolean;
}

export const Logo = (props: logoInterface) => {
  const { position = "start" } = props;
  let POP;

  const { Shadow = true } = props;
  if (Shadow) {
    POP = "shadow-popUps";
  } else {
    POP = "";
  }
  let positioning;
  if (position === "start") {
    positioning = "flex justify-start";
  } else if (position === "center") {
    positioning = "flex justify-center";
  } else if (position === "end") {
    positioning = "flex justify-end mr-[20px]";
  }

  return (
    <span className={`${positioning}`}>
      <img src="/Assets/MO LOGO.svg" alt="LOGO" className={POP} />
    </span>
  );
};
