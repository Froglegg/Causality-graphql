import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { useQuery } from "@apollo/react-hooks";
import { READ_JOURNAL } from "../../../../GQL/queries/journals";

const useStyles = makeStyles((theme) => ({
  table: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    minHeight: "40vh",
    maxHeight: "40vh",
    width: "100%",
    overflow: "auto",
  },
}));

export default function JournalTable(props: any) {
  const classes = useStyles();
  const { journal = {} } = props;
  const { data, loading, error, refetch } = useQuery(READ_JOURNAL, {
    variables: {
      id: journal.id,
    },
  });

  React.useEffect(() => {
    refetch();
  }, []);

  return (
    <TableContainer className={classes.table} component={Paper}>
      <h4>
        Entries{" "}
        <IconButton
          style={{ padding: "0px" }}
          onClick={() => {
            props.setView("addEvent");
          }}
        >
          <AddIcon style={{ color: "#0693c8" }} />
        </IconButton>
      </h4>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Events</TableCell>
            <TableCell>Condition</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.readJournal && data.readJournal.data
            ? data.readJournal.data.map((row: any, idx: number) => (
                <TableRow key={`${idx} - ${row.event}`}>
                  <TableCell component="th" scope="row">
                    {row.events.join(", ")}
                  </TableCell>
                  <TableCell>{row.condition ? "True" : "False"}</TableCell>
                  <TableCell>{row.notes}</TableCell>
                  <TableCell>{row.timeStamp}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
