import type { Option } from "../../types/interface/option";
import Select from "../atoms/select";

export default function sectionSpells(spells: Option[]) {
  return (
    <div className="section spells" style={{ margin: "2rem" }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Select label="Spells" options={spells} />
    </div>
  </div>
  
  );
}