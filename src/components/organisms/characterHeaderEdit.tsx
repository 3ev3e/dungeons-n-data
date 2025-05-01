import numberField from "../atoms/numberField";
import Select from "../atoms/select";
import textField from "../atoms/textField";
import type { Option } from "../../types/interface/option";

type Props = {
  classes: Option[];
  races: Option[];
};

function CharacterHeaderEdit({
  classes,
  races
}: Props) {

  return (
    <div className="character-header">
      <div>
        <h2>{textField("Name")}</h2>
        <span>{numberField("Level")}</span>
        <span><Select label="Class" options={classes} />
        </span>
      </div>
      <div>
        <span><Select label="Race" options={races} />
        </span>
        <span>
          {numberField("Armor Class")} {numberField("Health Points")}
        </span>
      </div>
    </div>
  );
}

export default CharacterHeaderEdit;