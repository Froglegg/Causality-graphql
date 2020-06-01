import React, { useState } from "react";
import SignIn from "./signin";
import SignUp from "./signUp";

import Snackbar from "../../Components/Snackbar";

import { LOGIN, CREATE_USER } from "../../GQL/mutations/users";

import { useApolloClient, useMutation } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";

function Login() {
  const client: ApolloClient<any> = useApolloClient();

  const [newAccount, setNewAccount] = useState(false);

  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
  });

  const [login, { loading: loginLoading, error: loginError }] = useMutation<
    any
  >(LOGIN, {
    onCompleted({ login }) {
      if (!login.success) {
        setSnackBar({ open: true, message: login.message });
      } else {
        localStorage.setItem("token", login.token as string);
        client.writeData({ data: { isLoggedIn: true } });
      }
    },
  });

  const [
    createUser,
    { loading: newUserLoading, error: newUserError },
  ] = useMutation<any>(CREATE_USER, {
    onCompleted({ createUser }) {
      if (!createUser.success) {
        setSnackBar({
          open: true,
          message: createUser.message,
        });
      } else {
        localStorage.setItem("token", createUser.user.token as string);
        client.writeData({ data: { isLoggedIn: true } });
      }
    },
  });

  return (
    <>
      <Snackbar
        open={snackBar.open}
        message={snackBar.message}
        handleClose={() => {
          setSnackBar({
            ...snackBar,
            open: false,
          });
        }}
        position={{ vertical: "top", horizontal: "center" }}
      />
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
    </>
  );
}

export default Login;
