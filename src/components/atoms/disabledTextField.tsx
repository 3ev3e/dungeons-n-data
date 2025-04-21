import TextField from '@mui/material/TextField';

export default function disabledTextField(fieldName: string) {
  return (
      <TextField disabled id={fieldName + "_id"} label={fieldName} variant="outlined" />
  );
}