import React from "react";
import { useMutation } from "@apollo/react-hooks";

import {
  createStyles,
  Theme,
  makeStyles,
  Button,
  ListItemText,
  ListItemIcon,
  Collapse,
  ListItem,
  List,
} from "@material-ui/core";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import LocalLibraryRoundedIcon from "@material-ui/icons/LocalLibraryRounded";

import JournalDetail from "./JournalDetail/JournalDetail";

import { DELETE_JOURNAL } from "../../../GQL/mutations/journals";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 600,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export default function JournalList(props: any) {
  interface journalProvider {
    id: string;
    journalName: string;
    data: [
      {
        events: [string];
        condition: boolean;
      }
    ];
    condition: string;
    causality: string;
    notes: string;
    created_at: string;
  }

  const [open, setOpen] = React.useState(() => {
    let obj: any = {};
    props.items.forEach((item: journalProvider) => {
      return (obj[item.id] = false);
    });
    return obj;
  });

  interface DetailProvider {
    [id: string]: {
      open: boolean;
    };
  }

  const [detail, setDetail] = React.useState<DetailProvider>({});

  const handleClick = (id: string) => {
    setOpen({
      ...open,
      [id]: !open[id],
    });
  };

  const handleDetail = (id: string) => {
    let bool = detail[id] && detail[id].open ? false : true;
    setDetail({
      ...detail,
      [id]: {
        open: bool,
      },
    });
  };

  const [deleteJournal] = useMutation<any>(DELETE_JOURNAL, {
    onCompleted({ deleteJournal }) {
      props.refetch();
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {props.items && props.items.length
          ? props.items.map((item: journalProvider, idx: number) => (
              <React.Fragment key={`${idx} - ${item.id}`}>
                <ListItem
                  button
                  key={item.id}
                  onClick={() => {
                    handleClick(item.id);
                  }}
                >
                  <ListItemIcon>
                    <LibraryBooksIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.journalName} />
                  {open[item.id] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem
                      button
                      className={classes.nested}
                      onClick={() => {
                        handleDetail(item.id);
                      }}
                    >
                      <ListItemIcon>
                        <LocalLibraryRoundedIcon style={{ color: "#4051B5" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={"Condition: " + item.condition}
                        secondary={
                          item.data && item.data.length === 1
                            ? `1 entry`
                            : item.data && item.data.length > 1
                            ? `${item.data.length} entries`
                            : `no entries`
                        }
                      />
                    </ListItem>
                    <Collapse
                      in={
                        detail[item.id] && detail[item.id].open
                          ? detail[item.id].open
                          : false
                      }
                      timeout="auto"
                      unmountOnExit
                    >
                      <hr />
                      <h4>Notes</h4>
                      <p style={{ whiteSpace: "pre-wrap" }}>{item.notes}</p>
                      <h4 style={{ marginTop: 10 }}>Causality</h4>
                      <p style={{ whiteSpace: "pre-wrap" }}>
                        {item.causality || ""}
                      </p>
                      <br />
                      <Button
                        style={{ float: "right" }}
                        color={"secondary"}
                        onClick={() => {
                          deleteJournal({
                            variables: { input: item.id },
                          });
                        }}
                      >
                        Delete Journal
                      </Button>
                      <br />
                      <JournalDetail journal={item} />
                    </Collapse>
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          : null}
      </List>
    </div>
  );
}
