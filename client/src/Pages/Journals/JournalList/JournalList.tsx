import React, { useState } from "react";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LocalLibraryRoundedIcon from "@material-ui/icons/LocalLibraryRounded";

import JournalDetail from "./JournalDetail";
import JournalTable from "../Table/JournalTable";

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

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

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

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {props.items && props.items.length
          ? props.items.map((item: journalProvider, idx: number) => (
              <React.Fragment key={item.id}>
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
                            ? `1 entry, causality score: ${item.causality}`
                            : item.data && item.data.length > 1
                            ? `${item.data.length} entries, causality score: ${item.causality}`
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
                      <h4>Notes</h4>
                      {item.notes}
                      <br /> <br />
                      <JournalTable />
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
