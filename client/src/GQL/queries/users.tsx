import gql from "graphql-tag";

const GET_USER_INFO = gql`
  query findMe {
    findMe {
      id
      userName
      email
      hobby
    }
  }
`;

const FIND_USER = gql`
  query($id: String) {
    findUserById(id: $id) {
      id
      userName
      hobby
    }
  }
`;
export { GET_USER_INFO };
