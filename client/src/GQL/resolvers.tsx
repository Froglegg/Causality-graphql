import { ApolloCache } from "apollo-cache";
import { Resolvers } from "apollo-client";
import * as userService from "./Services/userService";

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
