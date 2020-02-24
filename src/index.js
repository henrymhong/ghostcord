import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import LoginComponent from "./login/login";
import SignupComponent from "./signup/signup";
import DashboardComponent from "./dashboard/dashboard";
import ProfileComponent from "./profile/profile";
import FriendsComponent from "./friends/friends";
import AboutComponent from "./about/about";
import VideoRoomComponent from "./videoroom/videoroom";

const routing = (
	<Router>
		<div id="routing-container">
			<Redirect exact from="/" to="/dashboard" />
			<Route path="/login" component={LoginComponent}></Route>
			<Route path="/signup" component={SignupComponent}></Route>
			<Route path="/dashboard" component={DashboardComponent}></Route>
			<Route path="/friends" component={FriendsComponent}></Route>
			<Route path="/profile" component={ProfileComponent}></Route>
			<Route path="/about" component={AboutComponent}></Route>
			<Route path="/videoroom" component={VideoRoomComponent}></Route>
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
