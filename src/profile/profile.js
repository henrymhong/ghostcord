import React, { Component } from "react";
import fire, { db } from "../config/fire";
import { Link } from "react-router-dom";
import { Avatar, Paper, Button } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import styles from './styles';
import withStyles from "@material-ui/core/styles/withStyles";

class ProfileComponent extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			image: null,
			url: "",
			user: ""

		};
	}

	render() {
		const { classes } = this.props;

		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<br/>
					<Avatar 
						src={this.state.user.avatar} 
						width="150"
						height="150" 
						alt="profile pic"
						className={classes.large}
					/>
					<h1>{this.state.user.name}</h1>
					<h2>{ this.state.user.email }</h2>
					<Button
						variant="contained" 
						color="primary"
						fullWidth 
						onClick={ () => this.props.history.push("/dashboard") }
						className={classes.submit}
					>
						Back
					</Button>
					<Button 
						onClick={ () => this.props.history.push("/profile/edit") }
						variant="contained" 
						color="primary"
						fullWidth
						className={classes.submit}
					>
						Edit
					</Button>
				</Paper>
			</main>
		);
	}
	
	componentDidMount() {
		var user = fire.auth().currentUser;
		if(user != null) {
			console.log("user found");
			fire.firestore()
				.collection('users')
				.where("email", "==", user.email)
				.get()
				.then(snapshot => {
					var user = "";
					snapshot.forEach(doc => {
						console.log(doc.id, "=>", doc.data());
						var data = doc.data();
						user = data;
					});
					this.setState({ user: user });
				})
				.catch(error => console.log(error));
		}
		else {
			console.log("user not found");
		}
	};

	componentDidUpdate() {
		var user = fire.auth().currentUser;
		if(user != null) {
			fire.firestore()
				.collection('users')
				.where("email", "==", user.email)
				.get()
				.then(snapshot => {
					var user = "";
					snapshot.forEach(doc => {
						var data = doc.data();
						user = data;
					});
					this.setState({ user: user });
				})
				.catch(error => console.log(error));
		}
		else {
			console.log("user not found");
		}
	};
}

export default withStyles(styles)(ProfileComponent);
