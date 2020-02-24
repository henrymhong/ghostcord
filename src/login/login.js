import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import fire from "../config/fire";
import GoogleButton from 'react-google-button'
import './login.css'
import firebase from 'firebase'

class LoginComponent extends Component {
	constructor() {
		super();
		this.provider = new firebase.auth.GoogleAuthProvider()
		this.state = {
			email: null,
			password: null,
			serverError: false
		};
	}

	render() {
		const { classes } = this.props;

		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h5">
						Welcome
					</Typography>
					<form
						className={classes.form}
						onSubmit={e => this.submitLogin(e)}
					>
						<FormControl required fullWidth margin="normal">
							<InputLabel htmlFor="login-email-input">
								Enter Your Email
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
								Enter Your Password
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
					<h5 className={classes.noAccountHeader}>
						Don't Have An Account?
					</h5>
					<Link className={classes.signUpLink} to="/signup">
						Sign Up!
					</Link>
				</Paper>
				<GoogleButton className ="btnLogin" type="light"
  					onClick={this.googleLogin}
				/>
			</main>
			
		);
	}

	userTyping = (type, event) => {
		switch (type) {
			case "email":
				this.setState({ email: event.target.value });
				break;
			case "password":
				this.setState({ password: event.target.value });
				break;
			default:
				break;
		}
	};
	googleLogin = () =>{
		fire
			.auth()
			.signInWithPopup(this.provider)
			.then(
				() => {
					this.props.history.push("/dashboard");
				}
			);
	}
	submitLogin = async e => {
		e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.

		await fire
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(
				() => {
					this.props.history.push("/dashboard");
				},
				err => {
					this.setState({ serverError: true });
					console.log("Error logging in: ", err);
				}
			);
	};
}

export default withStyles(styles)(LoginComponent);
