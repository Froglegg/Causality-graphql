import gql from "graphql-tag";

const LOGIN = gql`
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
`;
const CREATE_USER = gql`
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
`;
const UPDATE_USER = gql`
  mutation updateUser($email: String!, $input: UpdateUserInput) {
    updateUser(email: $email, updateUserInput: $input) {
      success
      message
      token
      user {
        userName
        id
        email
        hobby
      }
    }
  }
`;
const DELETE_USER = gql`
  mutation deleteUser($password: String!) {
    deleteUser(password: $password) {
      success
      message
    }
  }
`;

export { LOGIN, CREATE_USER, UPDATE_USER, DELETE_USER };
