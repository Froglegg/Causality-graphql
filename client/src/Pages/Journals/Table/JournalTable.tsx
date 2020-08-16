import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

interface Data {
  events: [string];
  condition: boolean;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(
  event: string,
  positive: number,
  negative: number,
  causality: string
) {
  return { event, positive, negative, causality };
}

const rows = [
  createData("E1", 0, 1, "caus"),
  createData("E1", 1, 0, "caus"),
  createData("E2", 0, 1, "caus"),
  createData("E2", 1, 0, "caus"),
  createData("E3", 0, 1, "caus"),
];

export default function JournalTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <h4>TABLE TITLE</h4>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell>Positives</TableCell>
            <TableCell>Negatives</TableCell>
            <TableCell>Causality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={`${idx} - ${row.event}`}>
              <TableCell component="th" scope="row">
                {row.event}
              </TableCell>
              <TableCell>{row.positive}</TableCell>
              <TableCell>{row.negative}</TableCell>
              <TableCell>{row.causality}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
