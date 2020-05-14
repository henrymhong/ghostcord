import React, { useState } from "react";
import {
  Paper,
  FormControl,
  Button,
  Typography,
  Input,
  InputLabel,
  CircularProgress,
  Container
} from "@material-ui/core";
import { auth, firestore } from "../config/fire";

const submitRegister = (
  email,
  name,
  password,
  passwordConfirmation,
  setRegisterError,
  setIsLoading
) => {
  setIsLoading(true);
  if (password !== passwordConfirmation) {
    setRegisterError("Passwords do not match.");
    setIsLoading(false);
    return;
  }

  auth.createUserWithEmailAndPassword(email, password).then(
    res => {
      const userObj = {
        email: email,
        name: name,
        avatar: ""
      };
      firestore
        .collection("users")
        .doc(email)
        .set(userObj)
        .catch(err => {
          console.log("[Register/Firestore] ", err);
          setRegisterError(err.message);
          setIsLoading(false);
        });
      res.user.updateProfile({ displayName: name });
    },
    err => {
      console.log("[Register/Auth] ", err);
      setRegisterError(err.message);
      setIsLoading(false);
    }
  );
};

const RegisterComponent = ({ history }) => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [registerError, setRegisterError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container maxWidth="xs">
      <Paper>
        <Typography component="h1" variants="h5">
          Register
        </Typography>
        <form
          onSubmit={e => {
            e.preventDefault();
            submitRegister(
              email,
              name,
              password,
              passwordConfirmation,
              setRegisterError,
              setIsLoading
            );
          }}
        >
          <FormControl required fullWidth margin="normal">
            <InputLabel>Enter Email</InputLabel>
            <Input
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            ></Input>
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel>Enter Name</InputLabel>
            <Input
              autoComplete="name"
              onChange={e => setName(e.target.value)}
            ></Input>
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel>Enter Password</InputLabel>
            <Input
              type="password"
              onChange={e => setPassword(e.target.value)}
            ></Input>
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel>Confirm Password</InputLabel>
            <Input
              type="password"
              onChange={e => setPasswordConfirmation(e.target.value)}
            ></Input>
          </FormControl>
          <Button type="submit" fullWidth variant="outlined" color="primary">
            {isLoading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </form>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          color="primary"
          onClick={() => history.push("/login")}
        >
          Already have an account?
        </Button>
        {registerError ? (
          <Typography component="h5" variant="h6">
            {registerError}
          </Typography>
        ) : null}
      </Paper>
    </Container>
  );
};

export default RegisterComponent;
