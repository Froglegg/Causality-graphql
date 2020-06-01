import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EditProfile(props: any) {
  const classes = useStyles();

  const [userName, setUserName] = useState(
    props.userData.userName ? props.userData.userName : ""
  );
  const [hobby, setHobby] = useState(
    props.userData.hobby ? props.userData.hobby : ""
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit account
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e: any) => {
            e.preventDefault();

            props.updateUser({
              variables: {
                email: props.userData.email,
                input: {
                  userName: userName,
                  hobby: hobby,
                },
              },
            });
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="userName"
            defaultValue={props.userData.userName}
            autoFocus
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="hobby"
            label="Hobby"
            name="hobby"
            autoComplete="hobby"
            defaultValue={props.userData.hobby}
            autoFocus
            onChange={(e) => setHobby(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => {
              props.goBack();
            }}
          >
            Go Back
          </Button>
        </form>
        {props.updateLoading && <p>Loading...</p>}
        {props.updateError && <p>Error :( Please try again</p>}
        {props.updateSuccess && <p>Success!</p>}
      </div>
    </Container>
  );
}
