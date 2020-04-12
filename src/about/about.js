import React, { Component } from "react";
import "./about.css";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import { withStyles } from "@material-ui/core";
import styles from "./styles";

class AboutComponent extends Component {
	render() {
		const { classes } = this.props;
		return(
			<div className={classes.root}>
				<div className="logo">
					<h1>About Ghostcord</h1>
					<img src={require('../logo/logo.png')}/>
				</div>
				<div>

					<Grid container spacing={2}>
						
						<Grid item xs={12}>
							<Card className={classes.title} >The Founders</Card>
						</Grid>
						<Grid item xs={3}>
							<Card className={classes.card}>Steven Chung</Card>
						</Grid>
						<Grid item xs={3}>
							<Card className={classes.card}>Henry Hong</Card>
						</Grid>
						<Grid item xs={3}>
							<Card className={classes.card}>Dung Nguyen</Card>
						</Grid>
						<Grid item xs={3}>
							<Card className={classes.card}>Matthew Szeto</Card>
						</Grid>

						<Grid item xs={12}>
							<Card className={classes.title}>Our Mission</Card>
						</Grid>
						<Grid item xs={12}>
							<Card className={classes.card}>
								Here at Ghostcord we strive to create a community through a platform where people can connect on another level, from anywhere in the world. We enable user to technologically interact with each other’s worlds through modern technology while delivering a satisfying experience. Ghostcord will move technological communication to a whole other dimension. With just a few months since deployment, Ghostcord has become one of the industry leading companies placing us with Snapchat, Instagram, and Discord.
							</Card>
						</Grid>

						<Grid item xs={12}>
							<Card className={classes.title}>Contact Us</Card>
						</Grid>
						<Grid item xs={12}>
							<Card className={classes.card}>
								<p>Email:
									<a className={classes.a} href=""> ghostcord@gmail.com</a>
								</p>
								<p>Phone: 453-528-2188</p>
							</Card>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(AboutComponent);
