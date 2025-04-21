import TextField from '@mui/material/TextField';

export default function textField(fieldName: string) {
  return (
      <TextField id={fieldName + "_id"} label={fieldName} variant="outlined" />
  );
}