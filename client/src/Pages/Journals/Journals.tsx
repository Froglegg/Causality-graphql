import React from "react";
import Grid from "@material-ui/core/Grid";
import PublicJournals from "./Tabs/PublicJournals";
import MyJournals from "./Tabs/MyJournals";
import CreateJournal from "./Tabs/CreateJournal";
import SimpleTabs from "../../Components/Tabs/Tabs";
import AddIcon from "@material-ui/icons/Add";

function Journals(props: any) {
  const [createJournal, handleCreateJournal] = React.useState(false);

  return (
    <>
      <h1>Journals</h1>
      <br />
      <Grid container spacing={3}>
        <SimpleTabs>
          <CreateJournal label="Create Journal" />
          <MyJournals label="My Journals" />
          <PublicJournals label="All Journals" />
        </SimpleTabs>
      </Grid>
    </>
  );
}

export default Journals;
