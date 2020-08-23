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
    condition: String
    causality: String
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

  type JournalAPIResponse {
    success: Boolean!
    message: String
    journal: Journal
    journals: [Journal]
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
  input JournalInput {
    journalName: String!
    condition: String!
    notes: String
    public: Boolean!
  }

  input UpdateJournalInput {
    id: String
    journal: JournalInput
  }

  type Query {
    allUsers: [User]
    findUser: User
    findUserById(id: String): User
    isLoggedIn: Boolean
    findMe: User
    readJournal(id: String): Journal
    readAllJournals: [Journal]
    readMyJournals: [Journal]
  }

  type Mutation {
    createUser(userInput: UserInput!): UserAPIResponse!
    login(loginInput: UserInput!): UserAPIResponse!
    logout(token: String): UserAPIResponse!
    updateUser(
      email: String!
      updateUserInput: UpdateUserInput
    ): UserAPIResponse!
    deleteUser(password: String!): UserAPIResponse
    createJournal(journalInput: JournalInput): JournalAPIResponse
    updateJournal(updateJournalInput: UpdateJournalInput): JournalAPIResponse
    updateJournalData(updateJournalData: UpdateJournalData): JournalAPIResponse
    deleteJournal(id: String): JournalAPIResponse
  }
`;

module.exports = TYPEDEFS;
