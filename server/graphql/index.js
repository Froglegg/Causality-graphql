require("dotenv").config();

const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const store = require("../db/config");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const UserAPI = require("./datasources/user");
const engine = require("./engine");

const SERVER = new ApolloServer({
  context: async ({ req }) => {
    const token = (req.headers && req.headers.authorization) || "";

    const auth = token ? jwt.verify(token, process.env.JWT_KEY) : "";

    const users = auth ? await store("users").where({ id: auth.id }) : "";

    const user = (users && users[0]) || null;

    return { user, req };
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    userAPI: new UserAPI(store),
  }),

  engine: {
    apiKey: process.env.APOLLO_KEY,
    ...engine,
  },
});

module.exports = SERVER;
