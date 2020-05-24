import gql from "graphql-tag";

const query = {
  getMyInfo: gql`
    query {
      findMe {
        userName
        email
        hobby
      }
    }
  `,
};

const mutation = {
  login: gql`
    mutation login($loginInput: UserInput!) {
      login(loginInput: $loginInput) {
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
  createUser: gql`
    mutation createUser($input: UserInput!) {
      createUser(userInput: $input) {
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
  updateUser: gql`
    mutation updateUser($email: String!, $updateUserInput: updateUserInput) {
      updateUser(email: $email, updateUserInput: $updateUserInput) {
        success
        message
        token
        user {
          userName
          email
          hobby
        }
      }
    }
  `,
  deleteUser: gql`
    mutation deleteUser($password: String!) {
      deleteUser(password: $password) {
        success
        message
      }
    }
  `,
};

export { query, mutation };
