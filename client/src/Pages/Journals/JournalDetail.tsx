import React from "react";

import { READ_JOURNAL } from "../../GQL/queries/journals";

import { useQuery } from "@apollo/react-hooks";

const { data, loading, error } = useQuery(READ_JOURNAL, {
  variables: {
    id: "3",
  },
});

if (!loading && !error) {
  console.log(data);
}

function JournalDetail(props: any) {
  return <div></div>;
}

export default JournalDetail;
