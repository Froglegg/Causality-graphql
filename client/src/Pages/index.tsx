import React, { Fragment } from "react";
import { Router } from "@reach/router";

import Dashboard from "./Dashboard/Dashboard";
import MyProfile from "./MyProfile/MyProfile";
import Journals from "./Journals/Journals";
import { Footer, PageContainer } from "../Components/Layout";

export default function Pages() {
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
