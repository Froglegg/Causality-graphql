import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { READ_MY_JOURNALS } from "../../../GQL/queries/journals";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import JournalList from "../JournalList/JournalList";

function MyJournals(props: any) {
  const { data, loading, error, refetch } = useQuery(READ_MY_JOURNALS);

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Grid>
      <Grid item xs={12}>
        {error ? (
          <p>Error!</p>
        ) : loading ? (
          <CircularProgress />
        ) : data ? (
          <JournalList items={data.readMyJournals} refetch={() => refetch()} />
        ) : null}
      </Grid>
    </Grid>
  );
}
export default MyJournals;
