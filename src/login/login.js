import React, { Component } from 'react';
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { InstagramLoginButton } from "react-social-login-buttons";
import fire from "../config/fire";
import firebase from "firebase/app";
class LoginForm extends Component{

    constructor() {
		super();
		this.provider = new firebase.auth.GoogleAuthProvider();
		this.provider2 = new firebase.auth.FacebookAuthProvider();
		this.state = {
			email: null,
			password: null,
			serverError: false
		};
    }
    
    render () {
        return(
            <div className="FormCenter">
                <form className="FormFields" onSubmit={e => this.submitLogin(e)}>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="signup-email-input">Email</label>
                        <input 
                        autoComplete="email"
                        id="login-email-input"
                        className="FormField__Input"
                        onChange={e => {
                            this.userTyping("email", e);
                        }}/>
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="signup-password-input">Password</label>
                        <input
                        type="password" 
                        autoComplete="password"
                        id="login-password-input"
                        className="FormField__Input"
                        onChange={e => {
                            this.userTyping("password", e);
                        }}/>
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button">Login</button>
                    </div>

                </form>
                {this.state.serverError ? (
						<h5
                        className="txt_error"
                        >Incorrect Information</h5>
					) : null}

                <div className="social_button">
								<GoogleLoginButton
									onClick={() => this.googleLogin()}
									
								><span></span></GoogleLoginButton>
								<FacebookLoginButton 
									onClick={() => this.fbLogin()}
									
								><span></span>
								</FacebookLoginButton>
								<InstagramLoginButton 
									onClick={() => this.googleLogin()}
		
								><span></span>
								</InstagramLoginButton>
				</div>
            </div>
        )
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
	fbLogin = () =>{
		fire
			.auth()
			.signInWithPopup(this.provider2)
			.then(res => {
				const userObj = {
					email: res.user.email,
					name: res.user.displayName
				};
				fire
					.firestore()
					.collection("users")
					.doc(res.user.email)
					.set(userObj)
					.then(
						() => {
							this.props.history.push("/dashboard");
						},
						dbError => {
							console.log(dbError);
						}
					);
				this.props.history.push("/dashboard");
			});
	}
	googleLogin = () => {
		fire
			.auth()
			.signInWithPopup(this.provider)
			.then(res => {
				const userObj = {
					email: res.user.email,
					name: res.user.displayName
				};
				fire
					.firestore()
					.collection("users")
					.doc(res.user.email)
					.set(userObj)
					.then(
						() => {
							this.props.history.push("/dashboard");
						},
						dbError => {
							console.log(dbError);
						}
					);
				this.props.history.push("/dashboard");
			});
	};

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




export default LoginForm;