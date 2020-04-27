import gql from "graphql-tag";

const query = {
  isLoggedIn: gql`
    {
      isLoggedIn @client {
        boolean
      }
    }
  `,
  getMyInfo: gql`
    query {
      findMe {
        userName
        email
      }
    }
  `,
};

const mutation = {};

export { query, mutation };
