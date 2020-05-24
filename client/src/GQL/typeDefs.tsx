import gql from "graphql-tag";

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
    updateUser(
      email: String!
      updateUserInput: updateUserInput
    ): UserAPIResponse
    deleteUser(password: String!): UserAPIResponse
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

  input updateUserInput {
    userName: String
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
