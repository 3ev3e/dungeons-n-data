import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function alertSuccess(text: string) {
  return (
    <Alert severity="success">
      {text}
    </Alert>
  );
}