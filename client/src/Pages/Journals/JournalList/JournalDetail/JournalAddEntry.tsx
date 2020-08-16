import React from "react";
import Paper from "@material-ui/core/Paper";

import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    minHeight: "30vh",
    maxHeight: "30vh",
    overflow: "auto",
  },
}));

function JournalAddEntry(props: any) {
  const classes = useStyles();
  const [entry, setEntry] = React.useState({
    events: "",
    condition: false,
  });
  return (
    <Paper className={classes.paper}>
      {" "}
      <h4>
        Add Entry{" "}
        <IconButton
          style={{ padding: "0px" }}
          onClick={() => {
            props.setView("table");
          }}
        >
          <CloseIcon style={{ color: "#b71d1a" }} />
        </IconButton>
      </h4>
      <p>Enter events, separated by commas.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const data = {
            events: entry.events.split(",").map((el) => el.trim()),
            condition: entry.condition,
          };
          console.log(data);
        }}
      >
        <TextField
          required
          size={"small"}
          variant={"outlined"}
          margin="normal"
          fullWidth
          id={"events"}
          label={"Events"}
          name={"events"}
          autoFocus
          onChange={(e) => {
            setEntry({
              ...entry,
              events: e.target.value,
            });
          }}
          value={entry.events}
        />{" "}
        <FormControlLabel
          control={
            <Checkbox
              checked={entry.condition}
              onChange={(e) => {
                setEntry({
                  ...entry,
                  condition: !entry.condition,
                });
              }}
              name={"condition"}
              color={"primary"}
            />
          }
          label={"Condition"}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Paper>
  );
}

export default JournalAddEntry;
