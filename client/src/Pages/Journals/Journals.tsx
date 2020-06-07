import React from "react";
import Grid from "@material-ui/core/Grid";
import PublicJournals from "./PublicJournals";
import MyJournals from "./MyJournals";
import SimpleTabs from "../../Components/Tabs/Tabs";

function Journals(props: any) {
  return (
    <>
      <h1>Journals</h1>
      <br />
      <Grid container spacing={3}>
        <SimpleTabs>
          <MyJournals label="My Journals" />
          <PublicJournals label="All Journals" />
        </SimpleTabs>
      </Grid>
    </>
  );
}

export default Journals;
