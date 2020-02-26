import React, { Component } from "react";
import fire, { storage, db } from "../config/fire";
import { Link } from "react-router-dom";

// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Avatar from "@material-ui/core/Avatar";

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		display: "flex",
// 		flexWrap: "wrap",
// 		"& > *": {
// 			margin: theme.spacing(5, 15),
// 			width: theme.spacing(100),
// 			height: theme.spacing(100)
// 		},
// 		paper: {
// 			display: "flex",
// 			margin: theme.spacing(5, 5)
// 		}
// 	}
// }));

// export default function SimplePaper() {
// 	const classes = useStyles();
//   return (
//     <div className={classes.root}>
//     	<Paper elevation={5}>
// 				<Avatar className={classes.paper}/>
// 		</Paper>
//     </div>
//   );
// }

export default class ProfileComponent extends Component {
	
	state = {
		image: null,
		url: "",
		user: "",
	}
	
	constructor(props) {
		super(props);
		// this.state = {
		// 	image: null,
		// 	url: "",
		// 	user: ""
		// };
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
	}

	render() {
		return (
			<div>
				<img 
					src={this.state.user.avatar} 
					width="85"
					height="85" 
					alt="profile pic"
				/>
				<h1>{this.state.user.name}</h1>
				<h2>{ this.state.user.email }</h2>
				<Link
						onClick={() => this.props.history.push("/profile/edit")}
						// className={classes.profileBtn}
					>
						Edit
					</Link>
			</div>
		);
	}
}
