import gql from "graphql-tag";

const READ_JOURNAL = gql`
  query readJournal($id: String) {
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
        notes
        timeStamp
      }
    }
  }
`;

const READ_ALL_JOURNALS = gql`
  query readAllJournals {
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
        notes
        timeStamp
      }
    }
  }
`;

const READ_MY_JOURNALS = gql`
  query readMyJournals {
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
        notes
        timeStamp
      }
    }
  }
`;

export { READ_JOURNAL, READ_ALL_JOURNALS, READ_MY_JOURNALS };
