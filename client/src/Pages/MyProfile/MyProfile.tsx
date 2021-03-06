import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import Snackbar from "../../Components/Snackbar";

import FormDialog from "./formDialog";
import EditProfile from "./editProfile";

import { UPDATE_USER, DELETE_USER } from "../../GQL/mutations/users";
import { GET_USER_INFO } from "../../GQL/queries/users";

import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";

function MyProfile(props: any) {
  const client = useApolloClient();
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    hobby: "",
  });
  const [showEdit, setShowEdit] = useState(false);

  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
  });

  const [
    updateUser,
    { loading: updateLoading, error: updateError },
  ] = useMutation<any>(UPDATE_USER, {
    onCompleted({ updateUser }) {
      if (!updateUser.success) {
        setSnackBar({
          open: true,
          message: updateUser.message,
        });
      } else {
        const { userName, email, hobby, id } = updateUser.user;

        setUserDetails({
          userName: userName,
          email: email,
          hobby: hobby,
        });

        client.writeData({
          data: {
            findMe: {
              __typename: "User",
              id: id,
              userName: userName,
              email: email,
              hobby: hobby,
            },
          },
        });

        setShowEdit(false);
      }
    },
  });

  const { data: userData, loading: getLoading, error: getError } = useQuery(
    GET_USER_INFO
  );

  useEffect(() => {
    if (userData && userData.findMe) {
      setUserDetails({
        userName: userData.findMe.userName,
        email: userData.findMe.email,
        hobby: userData.findMe.hobby,
      });
    }
  }, [userData]);

  const [deleteUser] = useMutation<any>(DELETE_USER, {
    onCompleted({ deleteUser }) {
      localStorage.clear();
      client.writeData({ data: { isLoggedIn: false } });
      client.resetStore();
      window.location.reload(false);
    },
  });

  return (
    <>
      <h1>My Profile</h1>
      <br />

      {showEdit ? (
        <EditProfile
          goBack={() => setShowEdit(false)}
          updateUser={updateUser}
          updateLoading={updateLoading}
          updateError={updateError}
          userData={userDetails}
        />
      ) : (
        <Grid container spacing={3}>
          {!getLoading && !getError ? (
            <>
              <Grid item xs={12}>
                <h5>User Name</h5>
                {userDetails.userName}
              </Grid>
              <Grid item xs={12}>
                <h5>Email</h5>
                {userDetails.email}
              </Grid>
              <Grid item xs={12}>
                <h5>Hobby</h5>
                {userDetails.hobby}
              </Grid>
            </>
          ) : !getLoading && getError ? (
            <p>ERROR! {getError}</p>
          ) : (
            <CircularProgress />
          )}
        </Grid>
      )}
      <br />
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setShowEdit(!showEdit);
          }}
          style={showEdit ? { display: "none" } : {}}
        >
          EDIT PROFILE
        </Button>
      </div>
      <br />
      <div>
        <FormDialog
          buttonColor="secondary"
          buttonText="DELETE ACCOUNT"
          dialogTitle="DELETE ACCOUNT"
          dialogText="Please enter your password to delete your account"
          textFieldLabel="Password"
          textFieldId="password"
          textFieldType="password"
          handleSubmit={deleteUser}
          deleteUser={true}
          hide={showEdit ? true : false}
        />
      </div>
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
    </>
  );
}

export default MyProfile;
