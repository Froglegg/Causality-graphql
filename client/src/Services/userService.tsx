import gql from "graphql-tag";

const query = {
  getMyInfo: gql`
    query {
      findMe {
        userName
        email
      }
    }
  `,
};

const mutation = {
  login: gql`
    mutation login($input: UserInput!) {
      login(loginInput: $input) {
        success
        message
        token
        user {
          id
          userName
          email
          password
          token
        }
      }
    }
  `,
};

export { query, mutation };
