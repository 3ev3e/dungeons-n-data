import TextField from '@mui/material/TextField';

export default function numberField(fieldName: string) {
  return (
      <TextField id={fieldName + "_id"} label={fieldName} type='number' variant="filled" sx={{background:"rgb(255, 255, 255)"}} focused />
  );
}
//TODO add min max