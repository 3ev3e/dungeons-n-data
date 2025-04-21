import Button from '@mui/material/Button';

export default function button(fieldName: string) {
  return (
    <Button variant="contained">{fieldName}</Button>
  );
}