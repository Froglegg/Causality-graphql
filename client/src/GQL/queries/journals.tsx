import gql from "graphql-tag";

const READ_JOURNAL = gql`
  query($id: String) {
    readJournal(id: $id) {
      id
      user
      journalName
      condition
      causality
      notes
      public
      data {
        events
        condition
      }
    }
  }
`;

const READ_ALL_JOURNALS = gql`
  query {
    readAllJournals {
      id
      user
      journalName
      condition
      causality
      notes
      public
      data {
        events
        condition
      }
    }
  }
`;

const READ_MY_JOURNALS = gql`
  query {
    readMyJournals {
      id
      user
      journalName
      condition
      causality
      notes
      public
      data {
        events
        condition
      }
    }
  }
`;

export { READ_JOURNAL, READ_ALL_JOURNALS, READ_MY_JOURNALS };
