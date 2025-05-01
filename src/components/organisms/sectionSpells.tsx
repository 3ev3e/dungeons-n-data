import type { Option } from "../../types/interface/option";
import MultiSelect from "../atoms/multiSelect";

type Props = {
  spells: Option[];
};

function SectionSpells({
  spells
}: Props) {
  return (
    <div className="section spells" style={{ margin: "2rem" }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <MultiSelect label="Spells" options={spells} />
    </div>
  </div>
  
  );
}

export default SectionSpells;