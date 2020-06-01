import gql from "graphql-tag";

const GET_MY_INFO = gql`
  query GetMyInfo {
    findMe {
      userName
      email
      hobby
    }
  }
`;

export { GET_MY_INFO };
