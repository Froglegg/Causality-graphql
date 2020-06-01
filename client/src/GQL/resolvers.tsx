import { ApolloCache } from "apollo-cache";
import { Resolvers } from "apollo-client";
import gql from "graphql-tag";
import { GET_MY_INFO } from "./queries/users";
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
        query: GET_MY_INFO,
      });
      if (queryResult) {
        return queryResult;
      }
      return false;
    },
  },
  Mutation: {},
};
