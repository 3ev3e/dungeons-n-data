import Option from "../../types/interface/option";
import numberField from "../atoms/numberField";
import select from "../atoms/select";
import textField from "../atoms/textField";

export default function characterHeaderEdit(classes: never[], races: Option[]) {
  return (
    <>
      <div className="character-header">
        
        <div>
          <h2>{textField("Name")}</h2>
          <span>
            {numberField("Level")}
          </span>
          <span>
            {select("Class", classes)}
          </span>
        </div>
        <div>
          <span>{select("Race", races)} </span>
          <span>Background: </span>
          <span>AC:  | HP: </span>
        </div>
      </div>
    </>
  );
}