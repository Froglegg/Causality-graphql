import gql from "graphql-tag";
import { ApolloCache } from "apollo-cache";
import { Resolvers } from "apollo-client";
import * as userService from "./Services/userService";
export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    getMyInfo: User
    journalItems: [JournalItem]
  }
  extend type Mutation {
    createUser(userInput: UserInput!): UserAPIResponse!
    login(loginInput: UserInput!): UserAPIResponse!
    logout(token: String): UserAPIResponse!
  }
  type User {
    id: ID
    email: String
    userName: String
    password: String
    location: String
    hobby: String
    token: String
    created_at: String
  }

  input UserInput {
    email: String!
    userName: String
    password: String!
    location: String
    hobby: String
  }

  type UserAPIResponse {
    success: Boolean!
    message: String
    user: User
    users: [User]
    token: String
  }

  type Journal {
    id: ID
    userID: ID
    name: String
    userName: String
    condition: String
    data: [JournalEntry]
    causality: String
    created_at: String
  }
  type JournalEntry {
    condition: Boolean!
    events: [Event]
  }
  type Event {
    event: String
  }
`;

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  Mutation: ResolverMap;
  Query: ResolverMap;
}

export const resolvers: AppResolvers = {
  Query: {
    getMyInfo: (parents, args, { cache }) => {
      console.log("running resolver, get my info");
      const queryResult = cache.readQuery({
        query: userService.query.getMyInfo,
      });
      if (queryResult) {
        console.log(queryResult);
        return queryResult;
      }
      return false;
    },
  },
  Mutation: {
    login: (parent, args, { cache }) => {
      console.log("runnin resolver, login");
      const queryResult = cache.readQuery({
        query: userService.mutation.login,
      });
      if (queryResult) {
        console.log(queryResult);
        return queryResult;
      }
      return false;
    },
  },
};
