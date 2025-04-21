import { Alert } from "@mui/material";

export default function alertFail(text: string) {
    return (
      <Alert severity="error">
        {text}
      </Alert>
    );
  }