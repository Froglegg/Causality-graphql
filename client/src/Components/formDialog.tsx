import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    if (props.deleteUser) {
      props.handleSubmit({
        variables: {
          password: data,
        },
      });
    }
  };

  return (
    <div style={props.hide ? { display: "none" } : {}}>
      <Button
        variant="outlined"
        color={props.buttonColor}
        onClick={handleClickOpen}
      >
        {props.buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.dialogText}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={props.textFieldId}
            label={props.textFieldLabel}
            type={props.textFieldType}
            fullWidth
            onChange={(e) => {
              setData(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
