import TextField from '@mui/material/TextField';

export default function disabledTextField(fieldName: string, defaultValue: string) {
  return (
      <TextField disabled id={fieldName + "_id"} label={fieldName} sx={{background:"rgb(255, 255, 255)"}} defaultValue={defaultValue} variant="filled" />
  );
}