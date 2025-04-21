import Select from "react-select";

export default function select(fieldName: string, options: any) {
    /*const handleChange = (field: string, value: any) => {
        setCharacter((prev) => ({
          ...prev,
          [field]: value,
        }));
      };*/

  return (
    <label className="block mb-2">
        {fieldName}:
        <Select
          options={options}
          onChange={(selected: typeof Option | null) =>
            selected// && handleChange(fieldName, selected.value)
          }
          className="text-black"
        />
      </label>
  )
}
