import { Structure } from "../../Components/Molecules";
import Diagrams from "./Diagrams/Diagrams";

const index = () => {
  return (
    <Structure 
      Heading={""}
      TopButton={
        <div className="w-[194px]">
          {/* <Button label="Time Frame" variant="Transparent" size="small" /> */}
        </div>
      }
      border={false}
      mainSection={<Diagrams />}
    />
  );
};

export default index;
