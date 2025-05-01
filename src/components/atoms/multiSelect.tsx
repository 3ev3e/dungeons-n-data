import type { Option } from "../../types/interface/option";
import ReactSelect from "react-select";

type SelectProps = {
  label: string;
  options: Option[];
};

function MultiSelect({ label, options }: SelectProps) {
  return (
    <label className="block mb-2">
      {label}
      <ReactSelect
        className="select"
        options={options}
        isMulti
        /*onChange={(selected) => setCharacter({
              ...character,
              equipment: selected.map((item: { value: any; }) => item.value),
  })}*/
      />
    </label>
  );
}
export default MultiSelect;
//TODO make it look like the fields
//TODO make handle change work