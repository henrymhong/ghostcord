import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import HomePageComponent from "./homepage/homepage";
import SignUpComponent from "./signup/SignUpForm"
import DashboardComponent from "./dashboard/dashboard";
import ProfileComponent from "./profile/profile";
import EditProfileComponent from "./profile/editProfile";
import FriendsComponent from "./friends/friends";
import AboutComponent from "./about/about";
import WhiteBoardComponent from "./whiteboard/whiteboard";
import VideoChatComponent from "./video/videochat";

const routing = (
	<Router>
		<div id="routing-container">
			<Redirect exact from="/" to="/login" /> 
			<Route exact path="/" component={HomePageComponent}></Route>
			{/* <Redirect exact from="/" to="/" />
			<Route path="/" component={AboutComponent}></Route> */}
			<Route path="/login" component={HomePageComponent}></Route>
			<Route path="/signup" component={HomePageComponent}></Route>
			<Route path="/dashboard" component={DashboardComponent}></Route>
			<Route path="/friends" component={FriendsComponent}></Route>
			<Route exact path="/profile" component={ProfileComponent}></Route>
			<Route path ="/profile/edit" component={EditProfileComponent}></Route>
			<Route path="/whiteboard" component={WhiteBoardComponent}></Route>
			<Route path="/about" component={AboutComponent}></Route>
			<Route path="/video" component={VideoChatComponent}></Route>
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
