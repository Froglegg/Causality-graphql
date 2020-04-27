import React, { useState } from "react";
import * as userService from "../Services/userService";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";

function Dashboard(props: any) {
  const [info, setInfo] = useState("");

  const { data, loading, error } = useQuery(userService.query.getMyInfo);
  if (!loading && !error) {
    console.log(data.findMe.userName);
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={() => localStorage.clear()}>LOGOUT (hit refresh)</button>
      <br />
      <div>See My Info (from local storage, very simple)</div>
      {!loading && !error ? (
        <>
          <button onClick={() => setInfo(data.findMe.userName)}>DO IT</button>
          <h2>{info}</h2>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Dashboard;
