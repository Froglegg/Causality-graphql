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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
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
  const [open, setOpen] = React.useState(() => {
    let obj: any = {};
    props.items.forEach((item: any) => {
      return (obj[item.id] = false);
    });
    return obj;
  });

  const handleClick = (id: string) => {
    setOpen({
      ...open,
      [id]: !open[id],
    });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {props.items && props.items.length
          ? props.items.map((item: any, idx: number) => (
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
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <LocalLibraryRoundedIcon style={{ color: "#4051B5" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.condition}
                        secondary={
                          item.data && item.data.length === 1
                            ? `1 entry, causality score: ${item.causality}`
                            : item.data && item.data.length > 1
                            ? `${item.data.length} entries, causality score: ${item.causality}`
                            : `no entries`
                        }
                      />
                    </ListItem>
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          : null}
      </List>
    </div>
  );
}
