import type { Option } from "../../types/interface/option";
import Select from "../atoms/select";


export default function sectionEquipment(equipment: Option[]) {
  return (
    <div className="section equipment">
      <h3>Equipment</h3>
    <Select label="" options={equipment} />
  </div>
  );
}