import React from "react";
import LoginComponent from "./login/login";
import SignupComponent from "./Signup/signup";
import DashboardComponent from "./Dashboard/dashboard";
import fire from "../config/fire";
require("firebase/firestore");

class AppContainer extends React.Component {
	componentWillMount() {
		this.checkForSavedAuth();
	}

	render() {
		if (this.state.user)
			return (
				<DashboardComponent user={this.state.user}></DashboardComponent>
			);
		else return <SignupComponent loginFn={this.loggedIn}></SignupComponent>;
	}

	checkForSavedAuth = () => {
		console.log(fire.auth().currentUser);
	};

	loggedIn = user => this.setState({ user: user });
}

export default AppContainer;
