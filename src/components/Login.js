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
import { auth } from "../config/fire";

const LoginComponent = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitLogin = async e => {
    setIsLoading(true); // set loading indicator on button to true
    e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit
    await auth.signInWithEmailAndPassword(email, password).catch(err => {
      // set the login error and cancel the loading animation if login fails
      console.log("[Login/Auth] ", err);
      setLoginError(err);
      setIsLoading(false);
    });
  };

  return (
    <Container maxWidth="xs">
      <Paper>
        <Typography component="h1" variants="h5">
          Login
        </Typography>
        <form onSubmit={e => submitLogin(e)}>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="login-email-input">
              Enter Your Email
            </InputLabel>
            <Input
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            ></Input>
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="login-password-input">
              Enter Your Password
            </InputLabel>
            <Input
              autoComplete="current-password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            ></Input>
          </FormControl>
          <Button type="submit" fullWidth variant="outlined" color="primary">
            {isLoading ? <CircularProgress size={24} /> : "Log In"}
          </Button>
        </form>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          color="primary"
          onClick={() => history.push("/register")}
        >
          Register
        </Button>
        {loginError ? (
          <Typography component="h5" variant="h6">
            {{
              "auth/user-not-found": (
                <div>There is no email associated with this account</div>
              ),
              "auth/invalid-email": (
                <div>That is not a valid email address</div>
              ),
              "auth/user-disabled": <div>This account has been disabled</div>,
              "auth/wrong-password": <div>Incorrect password</div>
            }[loginError.code] || <div>Login Error</div>}
          </Typography>
        ) : null}
      </Paper>
    </Container>
  );
};

export default LoginComponent;
