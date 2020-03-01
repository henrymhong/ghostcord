import React, { useState, useEffect } from "react";
import { auth } from "../config/fire";
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";
import LoginComponent from "./Login";
import RegisterComponent from "./Register";
import HomeComponent from "./Home";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const authRouting = (
  <Router>
    <Redirect from="" to="/login" />
    <Switch>
      <Route path="/login" exact component={LoginComponent} />
      <Route path="/register" exact component={RegisterComponent} />
    </Switch>
  </Router>
);

const homeRouting = (
  <Router>
    <Redirect exact from="/" to="/home" />
    <Switch>
      <Route path="/home" component={HomeComponent} />
    </Switch>
  </Router>
);

const RoutingComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(res => {
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {user ? homeRouting : authRouting}
    </ThemeProvider>
  );
};

export default RoutingComponent;
