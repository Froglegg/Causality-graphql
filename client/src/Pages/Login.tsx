import React, { useState } from "react";
import SignIn from "../Components/signin";
import SignUp from "../Components/signUp";

import * as userService from "../Services/userService";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";

function Login() {
  const client: ApolloClient<any> = useApolloClient();

  const [newAccount, setNewAccount] = useState(false);

  const [login, { loading: loginLoading, error: loginError }] = useMutation<
    any
  >(userService.mutation.login, {
    onCompleted({ login }) {
      localStorage.setItem("token", login.token as string);
      client.writeData({ data: { isLoggedIn: true } });
    },
  });

  const [
    createUser,
    { loading: newUserLoading, error: newUserError },
  ] = useMutation<any>(userService.mutation.createUser, {
    onCompleted({ createUser }) {
      localStorage.setItem("token", createUser.user.token as string);
      client.writeData({ data: { isLoggedIn: true } });
    },
  });

  return (
    <div>
      {newAccount ? (
        <SignUp
          signUp={createUser}
          loading={newUserLoading}
          error={newUserError}
          newAccount={newAccount}
          setNewAccount={setNewAccount}
        />
      ) : (
        <SignIn
          login={login}
          loading={loginLoading}
          error={loginError}
          newAccount={newAccount}
          setNewAccount={setNewAccount}
        />
      )}
    </div>
  );
}

export default Login;
