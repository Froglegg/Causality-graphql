import React, { useState, useEffect } from "react";
import { GET_MY_INFO } from "../../GQL/queries/users";

import { useApolloClient, useQuery } from "@apollo/react-hooks";

import Button from "@material-ui/core/Button";
import gql from "graphql-tag";

function Dashboard(props: any) {
  const [info, setInfo] = useState("");

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

  const { data, loading, error } = useQuery(GET_MY_INFO);

  useEffect(() => {
    if (!loading && !error) {
      setInfo(data.findMe.userName);
    }
  }, [data]);

  return (
    <>
      <h1>Dashboard</h1>
      <br />
      <h2>{info}</h2>
    </>
  );
}

export default Dashboard;
