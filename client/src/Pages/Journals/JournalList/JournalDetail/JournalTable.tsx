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
import CloseIcon from "@material-ui/icons/Close";

import { useQuery } from "@apollo/react-hooks";
import { READ_ALL_EVENTS } from "../../../../GQL/queries/events";

interface Event {
  event: string;
  condition: boolean;
}

const useStyles = makeStyles((theme) => ({
  table: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    minHeight: "30vh",
    maxHeight: "30vh",
    overflow: "auto",
  },
}));

function createData(
  event: string,
  positive: number,
  negative: number,
  causality: string
) {
  return { event, positive, negative, causality };
}

export default function JournalTable(props: any) {
  const classes = useStyles();
  const { journal = {} } = props;
  const { data, loading, error } = useQuery(READ_ALL_EVENTS, {
    variables: {
      journalId: journal.id,
    },
  });
  if (!loading && !error) {
    console.log(data);
  }
  // const [events, setEvents] = React.useState<[Event]>(() => {
  //   return data
  //     .map((e: any) => {
  //       const objArr = e.events.map((str: any) => {
  //         return {
  //           event: str,
  //           condition: e.condition,
  //         };
  //       });
  //       return objArr;
  //     })
  //     .flat();
  // });

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
            <TableCell>Event</TableCell>
            <TableCell>Positives</TableCell>
            <TableCell>Negatives</TableCell>
            <TableCell>Causality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.readAllEvents && data.readAllEvents.length
            ? data.readAllEvents.map((row: any, idx: number) => (
                <TableRow key={`${idx} - ${row.event}`}>
                  <TableCell component="th" scope="row">
                    {row.event}
                  </TableCell>
                  <TableCell>{row.positives}</TableCell>
                  <TableCell>{row.negatives}</TableCell>
                  <TableCell>{row.causality}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
