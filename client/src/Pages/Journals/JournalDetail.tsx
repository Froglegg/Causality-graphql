import React from "react";

import { READ_JOURNAL } from "../../GQL/queries/journals";

import { useQuery } from "@apollo/react-hooks";

function JournalDetail(props: any) {
  const { data, loading, error } = useQuery(READ_JOURNAL, {
    variables: {
      id: props.id,
    },
  });

  if (!loading && !error) {
    console.log(data);
  }
  return <div></div>;
}

export default JournalDetail;
