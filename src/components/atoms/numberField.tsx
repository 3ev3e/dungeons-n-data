import TextField from '@mui/material/TextField';

export default function numberField(fieldName: string) {
  return (
      <TextField id={fieldName + "_id"} label={fieldName} variant="outlined" type='number' />
  );
}