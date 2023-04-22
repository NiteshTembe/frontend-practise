import React, { forwardRef, useContext } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { ShowAlertContext } from "./context/AlertContext";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ShowAlert() {
  const [openAlert, setOpenAlert] = useContext(ShowAlertContext);

  //   use below code to show snackbar with message
  // setOpenAlert({type:"error", msg : "Working"})

  if (openAlert) {
    setTimeout(() => {
      setOpenAlert(null);
    }, 5000);

    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={true} autoHideDuration={5000}>
          <Alert severity={openAlert.type}>{openAlert.msg}</Alert>
        </Snackbar>
      </Stack>
    );
  }
  return null;
}
