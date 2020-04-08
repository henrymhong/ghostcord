import React, { Component } from "react";
import { Link } from "react-router-dom";
// import styles from "./styles";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import Input from "@material-ui/core/Input";
// import Paper from "@material-ui/core/Paper";
// import withStyles from "@material-ui/core/styles/withStyles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import "./homepage.css";
import firebase from "firebase/app";


import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SignUpForm from '../signup/SignUpForm';
import LoginForm from '../login/login';


class HomePageComponent extends Component {
	// constructor() {
	// 	super();
	// 	this.provider = new firebase.auth.GoogleAuthProvider();
	// 	this.provider2 = new firebase.auth.FacebookAuthProvider();
	// 	this.state = {
	// 		email: null,
	// 		password: null,
	// 		serverError: false
	// 	};
	// }
	
	
	render() {
		const { classes } = this.props;
		return (
				<main>
				{/* <CssBaseline />
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h5">
						Ghostcord
					</Typography>
					<form className={classes.form} onSubmit={e => this.submitLogin(e)}>
						<FormControl required fullWidth margin="normal">
							<InputLabel htmlFor="login-email-input">
								Email
							</InputLabel>
							<Input
								autoComplete="email"
								autoFocus
								onChange={e => this.userTyping("email", e)}
								id="login-email-input"
							></Input>
						</FormControl>
						<FormControl required fullWidth margin="normal">
							<InputLabel htmlFor="login-password-input">
								Password
							</InputLabel>
							<Input
								autoComplete="current-password"
								type="password"
								onChange={e => this.userTyping("password", e)}
								id="login-password-input"
							></Input>
						</FormControl>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Log In
						</Button>
					</form>
					{this.state.serverError ? (
						<Typography
							className={classes.errorText}
							component="h5"
							variant="h6"
						>
							Incorrect Login Information
						</Typography>
					) : null}
					<h5 className={classes.noAccountHeader}>Don't Have An Account?</h5>
					<Link className={classes.signUpLink} to="/signup">
						Sign Up!
					</Link>
					<Link className={classes.signUpLink} to="/videoroom">
						Video
					</Link>
				</Paper> */}


					<div className="App">
						<div className="App__Aside">
							<img src={require('../logo/logo.png')} className="homepage_logo"/>
						</div>
						<div className="App__Form">
							<div className = "PageSwitcher">
							</div>

							<div className="FormTitle">
								<NavLink to="/login" 
									activeClassName="FormTitle__Link--Active" 
									className="FormTitle__Link">Sign In</NavLink>
								<NavLink to="/signup" 
									activeClassName="FormTitle__Link--Active" 
									className="FormTitle__Link">Sign Up</NavLink>
							</div>

							<Route path="/signup" component={SignUpForm}>
							</Route>

							<Route path="/login" component={LoginForm}>
							</Route>

						</div>

					</div>
					
			</main>
			
		);
	}

}

export default HomePageComponent;
