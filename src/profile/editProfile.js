import React, { Component } from 'react';
import fire, { storage, db } from "../config/fire";
import { Link } from "react-router-dom";

export default class EditProfileComponent extends Component {

    state = {
		image: null,
		url: "",
		user: "",
    }
    
    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
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
    }
    
    handleChange = e => {
		if (e.target.files[0]) {
			const image = e.target.files[0];
			this.setState(() => ({ image }));
		}
	};

	handleUpload = () => {
		const { image } = this.state;
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		uploadTask.on(
			"state_changed",
			snapshot => {},
			error => {
				console.log(error);
			},
			() => {
				storage
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then(url => {
						console.log(url);
						this.setState({ url });
						// storing in firebase
						fire
							.firestore()
							.collection("users")
							.doc(fire.auth().currentUser.email)
							.update({ avatar: url });
					});
			}
		);
	};

    render() {
        return (
            <div>
                <h1>Edit Page</h1>
                <form>
                    <div>
                        <input type="file" onChange={this.handleChange} />
                        <button onClick={this.handleUpload}>Set Profile Picture</button>
                        <br />
                        <img
                            src={this.state.url || "http://via.placeholder.com/400x300"}
                            alt="Uploaded"
                            width="85"
                            height="85"
                        />
                        <br/>
                        <label>
                            Name:
                        </label>
                        <input placeholder={this.state.user.name}/>
                    </div>
                    <div>
                        <label>
                            Email:
                        </label>
                        <input placeholder={this.state.user.email}/>
                    </div>
                    <div>
                        <input type="submit" value="Save"/>
                    </div>
                </form>
            </div>
        )
    }
}
