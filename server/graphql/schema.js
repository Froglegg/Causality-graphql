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
    findUserById(id: String): User
    isLoggedIn: Boolean
    findMe: User
    readJournal(id: String): Journal
    readAllJournals: [Journal]
    readMyJournals: [Journal]
    readEvent(id: String): Event
    readAllEvents(journalId: String): [Event]
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
    updateJournalEvents(
      id: String
      eventDataInput: EventDataInput
    ): JournalAPIResponse
    createEvent(eventInput: EventInput): EventsAPIResponse
    updateEvent(updateEventInput: UpdateEventInput): EventsAPIResponse
    deleteEvent(id: String): EventsAPIResponse
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
    events: [Event]
    causality: Float
    created_at: String
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

  type JournalData {
    events: [String]
    condition: Boolean
  }

  input UpdateJournalData {
    id: String
    data: [JournalDataInput]
  }

  input JournalDataInput {
    events: [String]
    condition: Boolean
  }

  input UpdateJournalEvents {
    id: String
    data: [EventDataInput]
  }

  input UpdateCausality {
    id: String
    causality: Float
  }

  input EventDataInput {
    journal: ID
    user: ID
    event: String
    positives: Int
    negatives: Int
    notes: String
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

  type Event {
    id: ID
    journal: ID
    user: ID
    event: String
    positives: Int
    negatives: Int
    causality: Float
    notes: String
  }

  type EventsAPIResponse {
    success: Boolean!
    message: String
    event: Event
    events: [Event]
  }

  input EventInput {
    user: ID
    journal: ID
    event: String
    positives: Int
    negatives: Int
    notes: String
  }

  input UpdateEventInput {
    id: ID
    user: ID
    journal: ID
    positives: Int
    negatives: Int
    causality: Float
    notes: String
  }
`;

module.exports = TYPEDEFS;
