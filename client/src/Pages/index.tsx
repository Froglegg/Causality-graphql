import React, { Fragment } from "react";
import { Router } from "@reach/router";
import { useApolloClient, useQuery } from "@apollo/react-hooks";

import Dashboard from "./Dashboard/Dashboard";
import MyProfile from "./MyProfile/MyProfile";
import Journals from "./Journals/Journals";
import { Footer, PageContainer } from "../Components/Layout";

// import { GET_USER_INFO } from "../GQL/queries/users";

export default function Pages() {
  // const client = useApolloClient();

  // const { data, loading, error } = useQuery(GET_USER_INFO);

  // write user data directly to cache
  // if (!loading && !error) {
  //   client.writeData({ data: { myInfo: data.findMe } });
  // }

  return (
    <>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Dashboard path="/" />
          <MyProfile path="/profile" />
          <Journals path="/journals" />
        </Router>
      </PageContainer>
      <Footer />
    </>
  );
}
