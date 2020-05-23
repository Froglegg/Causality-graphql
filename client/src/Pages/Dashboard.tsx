import React, { useState } from "react";
import * as userService from "../Services/userService";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";

function Dashboard(props: any) {
  const [info, setInfo] = useState("");

  // currently, this is using the previous user's token in the http header, so it is returning the previous users information. if you hit refresh, it works.
  const { data, loading, error } = useQuery(userService.query.getMyInfo);

  if (error) {
    console.log(error);
  }
  if (!loading && !error) {
    console.log(data);
    console.log(data.findMe.userName);
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <br />
      {data ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setInfo(data.findMe.userName)}
        >
          What's my name?
        </Button>
      ) : null}

      {!loading && !error ? (
        <>
          <h2>{info}</h2>
        </>
      ) : loading ? (
        "Loading"
      ) : error ? (
        "Error"
      ) : (
        ""
      )}
    </div>
  );
}

export default Dashboard;
