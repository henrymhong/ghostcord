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

class SignupComponent extends Component {
	constructor() {
		super();
		this.state = {
			email: null,
			name: null,
			password: null,
			passwordConfirmation: null,
			signupError: ""
		};
	}

	render() {
		const { classes } = this.props;

		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Typography component="h1" variants="h5">
						Register
					</Typography>
					<form
						onSubmit={e => this.submitSignup(e)}
						className={classes.form}
					>
						<FormControl required fullWidth margin="normal">
							<InputLabel htmlFor="signup-email-input">
								Enter Email
							</InputLabel>
							<Input
								autoComplete="email"
								autoFocus
								id="signup-email-input"
								onChange={e => {
									this.userTyping("email", e);
								}}
							></Input>
						</FormControl>
						<FormControl required fullWidth margin="normal">
							<InputLabel htmlFor="signup-name-input">
								Enter Name
							</InputLabel>
							<Input
								autoComplete="name"
								id="signup-name-input"
								onChange={e => {
									this.userTyping("name", e);
								}}
							></Input>
						</FormControl>
						<FormControl required fullWidth margin="normal">
							<InputLabel htmlFor="signup-password-input">
								Enter Password
							</InputLabel>
							<Input
								type="password"
								id="signup-password-input"
								onChange={e => {
									this.userTyping("password", e);
								}}
							></Input>
						</FormControl>
						<FormControl required fullWidth margin="normal">
							<InputLabel htmlFor="signup-password-confirmation-input">
								Confirm Password
							</InputLabel>
							<Input
								type="password"
								id="signup-password-confirmation-input"
								onChange={e => {
									this.userTyping("passwordConfirmation", e);
								}}
							></Input>
						</FormControl>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Submit
						</Button>
					</form>
					{this.state.signupError ? (
						<Typography
							className={classes.errorText}
							component="h5"
							variant="h6"
						>
							{this.state.signupError}
						</Typography>
					) : null}
					<Typography
						component="h5"
						variant="h6"
						className={classes.hasAccountHeader}
					>
						Already registered?
					</Typography>
					<Link className={classes.logInLink} to="/login">
						Log in!
					</Link>
				</Paper>
			</main>
		);
	}

	passwordsMatch = () =>
		this.state.password === this.state.passwordConfirmation;

	userTyping = (type, e) => {
		switch (type) {
			case "email":
				this.setState({ email: e.target.value });
				break;
			case "name":
				this.setState({ name: e.target.value });
				break;
			case "password":
				this.setState({ password: e.target.value });
				break;
			case "passwordConfirmation":
				this.setState({ passwordConfirmation: e.target.value });
				break;
			default:
				break;
		}
	};

	submitSignup = e => {
		e.preventDefault();
		if (!this.passwordsMatch()) {
			this.setState({ signupError: "Passwords do not match!" });
			return;
		}

		fire.auth()
			.createUserWithEmailAndPassword(
				this.state.email,
				this.state.password
			)
			.then(
				res => {
					const userObj = {
						email: res.user.email,
						name: this.state.name
					};
					fire.firestore()
						.collection("users")
						.doc(this.state.email)
						.set(userObj)
						.then(
							() => {
								this.props.history.push("/dashboard");
							},
							dbError => {
								console.log(dbError);
								this.setState({
									signupError: "Failed to add user"
								});
							}
						);
				},
				authError => {
					console.log(authError);
					this.setState({ signupError: "Failed to add user" });
				}
			);
	};
}

export default withStyles(styles)(SignupComponent);
