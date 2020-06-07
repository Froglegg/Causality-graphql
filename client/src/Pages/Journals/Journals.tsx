import React from "react";
import Grid from "@material-ui/core/Grid";
import PublicJournals from "./PublicJournals";
import MyJournals from "./MyJournals";
import CreateJournal from "./CreateJournal";
import SimpleTabs from "../../Components/Tabs/Tabs";
import AddIcon from "@material-ui/icons/Add";
function Journals(props: any) {
  return (
    <>
      <h1>Journals</h1>
      <br />
      <Grid container spacing={3}>
        <SimpleTabs>
          <MyJournals label="My Journals" />
          <PublicJournals label="All Journals" />
          <CreateJournal icon={<AddIcon />} />
        </SimpleTabs>
      </Grid>
    </>
  );
}

export default Journals;
