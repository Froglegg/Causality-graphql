import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function PositionedSnackbar(props: any) {
  return (
    <Snackbar
      // set position as object{vertical: "top", horizontal: "bottom"}
      anchorOrigin={props.position}
      open={props.open}
      onClose={props.handleClose}
      message={props.message}
      key={props.position}
    />
  );
}
