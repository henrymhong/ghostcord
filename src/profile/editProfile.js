import React, { Component } from 'react';
import fire, { db } from "../config/fire";
import { Link } from "react-router-dom";

export default class EditProfileComponent extends Component {

	
	constructor(props) {
		super(props);

		this.state = {
			image: "",
			url: "",
			user: "",
			name: "",
			avatar: ""
		};

		this.userTyping = this.userTyping.bind(this);
		this.update = this.update.bind(this);
    }

    componentDidMount() {
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
	
	userTyping = (type, e) => {
		switch (type) {
			case "name":
				this.setState({ name: e.target.value });
				break;
			case "avatar":
				// this.setState({ avatar: e.target.value });
				if (e.target.files[0]) {
					const image = e.target.files[0];
					this.setState(() => ({ image }));
				}
				break;
			default:
				break;
		}
	};

	update = (e) => {
		e.preventDefault();

		// updating the user's name
		fire.firestore().collection('users').doc(fire.auth().currentUser.email).update({
			name: this.state.name
		});

		// updating the user's avatar
		const { image } = this.state;
		const uploadTask = db.ref(`images/${image.name}`).put(image);
		console.log("updating picture");
		uploadTask.on(
			"state_changed",
			snapshot => {},
			error => {
				console.log(error);
			},
			() => {
				db
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then(url => {
						this.setState({ url });
						// storing in firebase
						console.log("storing file in the firebase")
						fire
							.firestore()
							.collection("users")
							.doc(fire.auth().currentUser.email)
							.update({ avatar: url });
					});
			}
		);

		alert("Profile saved successfully!");
		this.props.history.push("/profile")
	};

    render() {
        return (
            <div>
                <h1>Edit Page</h1>
                <form>
					<div>
						<label>Name:</label>
						<input 
							placeholder={this.state.user.name}
							onChange={ e => {
								this.userTyping("name", e);
							}}
						/>
					</div>
					<br/>
                    <div>
						<label>Avatar:</label>
                        <input type="file" onChange={ e => {this.userTyping("avatar", e)}}/>
                        {/* <button onClick={this.handleUpload}>Set Profile Picture</button> */}
                        <br />
                        <img
                            src={this.state.url || this.state.avatar}
                            alt="Uploaded"
                            width="85"
                            height="85"
                        />
                    </div>
					<br/>
					<input type="submit" value="Save" onClick={this.update}/>		
                </form>
						<Link onClick={() => this.props.history.push("/profile")}>Cancel</Link>
            </div>
        )
    }
}
