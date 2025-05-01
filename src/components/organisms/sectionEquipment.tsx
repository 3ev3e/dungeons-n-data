import type { Option } from "../../types/interface/option";
import MultiSelect from "../atoms/multiSelect";

type Props = {
  equipment: Option[];
};

function SectionEquipment({
  equipment
}: Props) {
  return (
    <div className="section equipment">
      <h3>Equipment</h3>
    <MultiSelect label="" options={equipment} />
  </div>
  );
}

export default SectionEquipment;