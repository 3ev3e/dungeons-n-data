import TextField from "@mui/material/TextField";
import Character from "../../types/interface/character";

export default function numberFieldAbilities(
  fieldName: keyof Character,
  character: Character,
  setCharacter: React.Dispatch<React.SetStateAction<Character>>
) {
  return (
    <TextField
      id={`${fieldName}_id`}
      label={fieldName}
      type="number"
      variant="filled"
      sx={{ background: "rgb(255, 255, 255)" }}
      focused
      value={character[fieldName] as number}
      slotProps={{
        input: {
          inputProps: {
            min: 1,
            max: 30,
            step: 1,
          },
        },
      }}
      onChange={(e) =>
        setCharacter({
          ...character,
          [fieldName]: parseInt(e.target.value),
        })
      }
    />
  );
}
