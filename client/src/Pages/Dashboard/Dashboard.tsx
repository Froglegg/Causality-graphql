import React from "react";
import { GET_USER_INFO } from "../../GQL/queries/users";

import { useApolloClient, useQuery } from "@apollo/react-hooks";

import Button from "@material-ui/core/Button";
import gql from "graphql-tag";

function Dashboard(props: any) {
  // you can read directly from the cache with an @client directive, or by using cache.readQuery and passing in a regular GQL query
  // const MY_CACHED_INFO = gql`
  //   query {
  //     myInfo @client {
  //       userName
  //       email
  //       hobby
  //     }
  //   }
  // `;

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
