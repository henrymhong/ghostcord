import React, { Component } from "react";
import "./about.css";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import NavBarComponent from "../navBar/navBar";

class AboutComponent extends Component {
	render() {
		const { classes } = this.props;
		return(
			<div className="">
				<NavBarComponent />
				<div className="our_story">
					<h1>Our Story</h1>
					<p>
						Here at Ghostcord we strive to create a community through a platform where people can connect on another level, from anywhere in the world. We enable user to technologically interact with each other’s worlds through modern technology while delivering a satisfying experience. Ghostcord will move technological communication to a whole other dimension. With just a few months since deployment, Ghostcord has become one of the industry leading companies placing us with Snapchat, Instagram, and Discord.
					</p>
				</div>
				<div className="founders">
					<h2>The Founders</h2>
					<div className="col">
						<h4>Steven Chung</h4>
						<h4>Henry Hong</h4>
					</div>
					<div className="col">
						<h4>Dung Nguyen</h4>
						<h4>Mattew Szeto</h4>
					</div>
				</div>
				<div className="contact">
					<h2>Contact Us</h2>
					<div className="col">
						<p><span>Email:</span>
							<a href=""> ghostcord@gmail.com</a>
						</p>
						<p><span>Phone:</span> 453-528-2188</p>
					</div>
				</div>
				<div>
					{/* <Grid container spacing={2}>
						
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
					</Grid> */}
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(AboutComponent);
