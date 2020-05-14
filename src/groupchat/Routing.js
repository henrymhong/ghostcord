import React, { useEffect, useContext } from "react";
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
import { GlobalContext } from "../state/State";

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
  const { state, dispatch } = useContext(GlobalContext);

  // Set global state user if logged in
  useEffect(() => {
    auth.onAuthStateChanged(res => {
      if (res) {
        dispatch({ type: "SET_USER", payload: res });
      } else {
        dispatch({ type: "NO_USER" });
      }
    });
  }, [dispatch]);

  // Display home if logged in, otherwise display log in
  return state.user.auth ? homeRouting : authRouting;
};

export default RoutingComponent;
