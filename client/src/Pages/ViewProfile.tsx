import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";

import * as userService from "../Services/userService";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";

import EditProfile from "../Components/editProfile";

function ViewProfile(props: any) {
  const client: ApolloClient<any> = useApolloClient();

  const [
    updateUser,
    { loading: updateLoading, error: updateError },
  ] = useMutation<any>(userService.mutation.updateUser, {
    onCompleted({ updateUser }) {
      console.log(updateUser);
    },
  });
  if (updateError) {
    console.log(updateError);
  }
  const { data: userData, loading: getLoading, error: getError } = useQuery(
    userService.query.getMyInfo
  );
  if (getError) {
    console.log(getError);
  }
  if (!getLoading && !getError) {
    console.log(userData);
    console.log(userData.findMe.userName);
  }
  const [showEdit, setShowEdit] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <h1>My Profile</h1>
      <br />
      <br />

      {showEdit ? (
        <EditProfile
          goBack={() => setShowEdit(false)}
          updateUser={updateUser}
          updateLoading={updateLoading}
          updateError={updateError}
          userData={!getLoading && !getError ? userData.findMe : null}
        />
      ) : (
        <Grid container spacing={3}>
          {!getLoading && !getError ? (
            <>
              <Grid item xs={4}>
                <h5>User Name</h5>
                {userData.findMe.userName}
              </Grid>
              <Grid item xs={4}>
                <h5>Email</h5>
                {userData.findMe.email}
              </Grid>
              <Grid item xs={4}>
                <h5>Hobby</h5>
                {userData.findMe.hobby}
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
    </Container>
  );
}

export default ViewProfile;
