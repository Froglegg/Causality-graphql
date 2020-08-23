import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import {
  makeStyles,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Paper,
} from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";

import { UPDATE_JOURNAL_DATA } from "../../../../GQL/mutations/journals";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    minHeight: "40vh",
    maxHeight: "40vh",
    width: "100%",
    overflow: "auto",
  },
}));

function JournalAddEntry(props: any) {
  const classes = useStyles();

  const [
    updateJournalData,
    { loading: addEntryLoading, error: addEntryError },
  ] = useMutation<any>(UPDATE_JOURNAL_DATA, {
    onCompleted({ updateJournalData }) {
      if (!updateJournalData.success) {
        props.setSnackBar({
          open: true,
          message: updateJournalData.message,
        });
      } else {
        props.setSnackBar({
          open: true,
          message: updateJournalData.message,
        });
        setEntry({ events: "", condition: false, notes: "" });
        props.setView("table");
      }
    },
  });

  const [entry, setEntry] = React.useState({
    events: "",
    condition: false,
    notes: "",
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
      <p>Enter events that you want to record, separated by commas.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = [
            {
              events: [
                ...new Set(
                  entry.events.split(",").map((el) => el.trim().toLowerCase())
                ),
              ],
              condition: entry.condition,
              notes: entry.notes,
              timeStamp: moment().format("DD-MM-YYYY HH:mm"),
            },
          ]
            .concat(props.journal.data ? props.journal.data : [])
            .map((el) => {
              return {
                events: el.events,
                condition: el.condition,
                notes: el.notes || "",
                timeStamp: el.timeStamp || "",
              };
            });
          console.log(data);
          updateJournalData({
            variables: {
              input: {
                id: props.journal.id,
                data: data,
                condition: props.journal.condition,
              },
            },
          });
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
        <TextField
          size={"small"}
          variant={"outlined"}
          margin="normal"
          fullWidth
          id={"notes"}
          label={"Notes"}
          name={"notes"}
          onChange={(e) => {
            setEntry({
              ...entry,
              notes: e.target.value,
            });
          }}
          value={entry.notes}
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
          label={`${props.journal.condition || "Condition"}`}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Paper>
  );
}

export default JournalAddEntry;
