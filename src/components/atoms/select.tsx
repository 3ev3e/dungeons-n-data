import { colors, InputLabel } from "@mui/material";
import Select from "react-select";
//TODO try to change to mui select
export default function select(fieldName: string, options: any) {
    /*const handleChange = (field: string, value: any) => {
        setCharacter((prev) => ({
          ...prev,
          [field]: value,
        }));
      };*/

  return (
    <div className="block mb-2">
        {fieldName}:
        <Select
        className="select"
          options={options}
          onChange={(selected: typeof Option | null) =>
            selected// && handleChange(fieldName, selected.value)
          }
        />
      </div>
  )
}
