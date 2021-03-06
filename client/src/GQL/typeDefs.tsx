import gql from "graphql-tag";

export const typeDefs = gql`
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

  input UpdateUserInput {
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
    user: ID
    journalName: String
    causality: String
    condition: String
    notes: String
    public: Boolean
    data: [JournalData]
    created_at: String
  }

  type JournalData {
    events: [String]
    condition: Boolean
    notes: String
    timeStamp: String
  }

  input JournalInput {
    journalName: String
    condition: String
    notes: String
    public: Boolean
  }

  input UpdateJournalInput {
    id: String
    journal: JournalInput
  }

  input UpdateJournalData {
    id: String
    data: [JournalDataInput]
    condition: String
  }

  input JournalDataInput {
    events: [String]
    condition: Boolean
    notes: String
    timeStamp: String
  }

  type JournalAPIResponse {
    success: Boolean!
    message: String
    journal: Journal
    journals: [Journal]
  }

  extend type Query {
    isLoggedIn: Boolean!
    findMe: User
    findUserById(id: String): User
    readJournal(id: String): Journal
    readAllJournals: [Journal]
    readMyJournals: [Journal]
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
    createJournal(journalInput: JournalInput): JournalAPIResponse
    updateJournal(updateJournalInput: UpdateJournalInput): JournalAPIResponse
    updateJournalData(updateJournalData: UpdateJournalData): JournalAPIResponse
    deleteJournal(id: String): JournalAPIResponse
  }
`;
