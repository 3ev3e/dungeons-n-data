import type { Option } from "../../types/interface/option";
import ReactSelect from "react-select";

type SelectProps = {
  label: string;
  options: Option[];
};

function Select({ label, options }: SelectProps) {
  return (
    <div className="block mb-2">
        {label}
        <ReactSelect
        className="select"
          options={options}
          onChange={(selected: Option | null) =>
            selected// && handleChange(fieldName, selected.value)
          }
        />
      </div>
  );
}
export default Select;
//TODO make it look like the fields