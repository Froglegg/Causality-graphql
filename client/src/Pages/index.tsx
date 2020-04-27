import React, { Fragment } from "react";
import { Router } from "@reach/router";

import Dashboard from "./Dashboard";
import { Footer, PageContainer } from "../Components";

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Dashboard path="/" />
        </Router>
      </PageContainer>
      <Footer />
    </Fragment>
  );
}
