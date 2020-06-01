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

  type Query {
    allUsers: [User]
    findUser: User
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
    updateCausality(updateCausality: UpdateCausality): CausalityResponse
    deleteJournal(id: String): JournalAPIResponse
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
    notes: String
    public: Boolean
    data: [JournalData]
    causality: String
    created_at: String
  }

  type JournalData {
    events: [String]
    condition: Boolean
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
  }

  input JournalDataInput {
    events: [String]
    condition: Boolean
  }

  input UpdateCausality {
    id: String
    causality: Float
  }

  type JournalAPIResponse {
    success: Boolean!
    message: String
    journal: Journal
    journals: [Journal]
  }

  type CausalityResponse {
    success: Boolean!
    message: String
    causality: Float
  }
`;

module.exports = TYPEDEFS;
