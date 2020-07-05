import gql from "graphql-tag";

const CREATE_JOURNAL = gql`
  mutation($input: JournalInput) {
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
        }
      }
    }
  }
`;

const UPDATE_JOURNAL = gql`
  mutation($input: UpdateJournalInput) {
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
        }
      }
    }
  }
`;

const UPDATE_JOURNAL_DATA = gql`
  mutation($input: UpdateJournalData) {
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
        }
      }
    }
  }
`;

const DELETE_JOURNAL = gql`
  mutation($input: String) {
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
        }
      }
    }
  }
`;

const UPDATE_CAUSALITY = gql`
  mutation($input: UpdateCausality) {
    updateCausality(updateCausality: $input) {
      success
      message
      causality
    }
  }
`;

export { CREATE_JOURNAL };
