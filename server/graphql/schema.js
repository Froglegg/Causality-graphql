const { gql } = require(`apollo-server-express`);

const TYPEDEFS = gql`
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

  input updateUserInput {
    userName: String
    hobby: String
  }
  type Query {
    allUsers: [User]
    findUser: User
    findMe: User
  }
  type Mutation {
    createUser(userInput: UserInput!): UserAPIResponse!
    login(loginInput: UserInput!): UserAPIResponse!
    logout(token: String): UserAPIResponse!
    updateUser(
      email: String!
      updateUserInput: updateUserInput
    ): UserAPIResponse!
  }
  type UserAPIResponse {
    success: Boolean!
    message: String
    user: User
    users: [User]
    token: String
  }
`;

module.exports = TYPEDEFS;
