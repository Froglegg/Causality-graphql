import gql from "graphql-tag";

const READ_EVENT = gql`
  query($id: String) {
    readEvent(id: $id) {
      id
      user
      journal
      event
      positives
      negatives
      notes
    }
  }
`;

const READ_ALL_EVENTS = gql`
  query($journalId: String) {
    readAllEvents(journalId: $journalId) {
      id
      user
      journal
      event
      positives
      negatives
      notes
    }
  }
`;

export { READ_EVENT, READ_ALL_EVENTS };
