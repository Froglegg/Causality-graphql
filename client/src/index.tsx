import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink, createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { resolvers } from "./GQL/@client_resolvers";
import { typeDefs } from "./GQL/typeDefs";
import injectStyles from "./styles";

import Login from "./Pages/LoginAndSignup/Login";
import Pages from "./Pages";

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  typeDefs,
  resolvers,
});

// write initial data to the cache / initialize @client cache store. For the parent component, all we need to know is whether the user is logged in or not.
cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
});

// when a user logs out, a function is fired to reset the store. This is the callback function that will reinitialize the store with the isLoggedIn data.
client.onResetStore(() => {
  cache.writeData({
    data: {
      isLoggedIn: !!localStorage.getItem("token"),
    },
  });
  return Promise.resolve();
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

injectStyles();

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById("root")
);
