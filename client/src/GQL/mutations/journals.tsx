import gql from "graphql-tag";

const CREATE_JOURNAL = gql`
  mutation createJournal($input: JournalInput) {
    createJournal(journalInput: $input) {
      success
      message
      journal {
        user
        journalName
        condition
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
  }
`;

const UPDATE_JOURNAL = gql`
  mutation updateJournal($input: UpdateJournalInput) {
    updateJournal(updateJournalInput: $input) {
      success
      message
      journal {
        user
        journalName
        condition
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
  }
`;

const UPDATE_JOURNAL_DATA = gql`
  mutation updateJournalData($input: UpdateJournalData) {
    updateJournalData(updateJournalData: $input) {
      success
      message
      journal {
        user
        journalName
        condition
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
  }
`;

const DELETE_JOURNAL = gql`
  mutation deleteJournal($input: String) {
    deleteJournal(id: $input) {
      success
      message
      journal {
        user
        journalName
        condition
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
  }
`;

export { CREATE_JOURNAL, UPDATE_JOURNAL_DATA, DELETE_JOURNAL };
