import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import TextField from "@material-ui/core/TextField";

import { useApolloClient, useMutation } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";

import { CREATE_JOURNAL } from "../../../GQL/mutations/journals";
import Snackbar from "../../../Components/Snackbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

function CreateJournal(props: any) {
  const classes = useStyles();

  const [snackBar, setSnackBar] = React.useState({
    open: false,
    message: "",
  });
  const [publicOrPrivate, checkPublic] = React.useState(false);
  const [payload, setPayload] = React.useState({
    journalName: "",
    condition: "",
    notes: "",
  });
  const handleInput = (e: any) => {
    setPayload({
      ...payload,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    createJournal({
      variables: {
        input: {
          ...payload,
          public: publicOrPrivate,
        },
      },
    });
  };

  const [
    createJournal,
    { loading: newJournalLoading, error: newJournalError },
  ] = useMutation<any>(CREATE_JOURNAL, {
    onCompleted({ createJournal }) {
      if (!createJournal.success) {
        setSnackBar({
          open: true,
          message: createJournal.message,
        });
      } else {
        setSnackBar({
          open: true,
          message: createJournal.message,
        });
      }
    },
  });

  return (
    <Grid>
      <Snackbar
        open={snackBar.open}
        message={snackBar.message}
        handleClose={() => {
          setSnackBar({
            ...snackBar,
            open: false,
          });
        }}
        position={{ vertical: "top", horizontal: "center" }}
      />
      <Grid item xs={12}>
        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField
            id="journalName"
            name="journalName"
            label={"Journal Name"}
            onChange={handleInput}
          />
          <TextField
            id="condition"
            name="condition"
            label={"Condition"}
            onChange={handleInput}
          />
          <TextField
            id="notes"
            name="notes"
            label={"Notes"}
            multiline
            rows={2}
            rowsMax={4}
            fullWidth
            onChange={handleInput}
          />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={publicOrPrivate}
                onChange={() => checkPublic(!publicOrPrivate)}
                name="publicOrPrivate"
                color="primary"
              />
            }
            label="Public"
          />{" "}
          <Button type="submit">Submit</Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default CreateJournal;
