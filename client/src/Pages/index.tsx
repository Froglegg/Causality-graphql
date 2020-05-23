import React, { Fragment } from "react";
import { Router } from "@reach/router";

import Dashboard from "./Dashboard";
import ViewProfile from "./ViewProfile";
import Journals from "./Journals";
import { Footer, PageContainer } from "../Components";

export default function Pages() {
  return (
    <>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Dashboard path="/" />
          <ViewProfile path="/profile" />
          <Journals path="/journals" />
        </Router>
      </PageContainer>
      <Footer />
    </>
  );
}
