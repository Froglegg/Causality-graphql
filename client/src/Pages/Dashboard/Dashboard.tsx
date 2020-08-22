import React from "react";
import { GET_USER_INFO } from "../../GQL/queries/users";

import { useQuery } from "@apollo/react-hooks";

function Dashboard(props: any) {
  const { data, loading, error } = useQuery(GET_USER_INFO);

  return (
    <>
      <h1>Dashboard</h1>
      <br />
      <h2>{!loading && !error ? data.findMe.userName : ""}</h2>
    </>
  );
}

export default Dashboard;
