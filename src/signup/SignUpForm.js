import React, { Component } from "react";
import fire from "../config/fire";

class SignUpForm extends Component {
    constructor() {
        super();
        this.state = {
            email: null,
            name: null,
            password: null,
            passwordConfirmation: null,
            signupError: "",
        };
    }

    render() {
        return (
            <div className="FormCenter">
                <form
                    className="FormFields"
                    onSubmit={(e) => this.submitSignup(e)}
                >
                    <div className="FormField">
                        <label
                            className="FormField__Label"
                            htmlFor="signup-email-input"
                        >
                            Email
                        </label>
                        <input
                            autoComplete="email"
                            id="signup-email-input"
                            className="FormField__Input"
                            onChange={(e) => {
                                this.userTyping("email", e);
                            }}
                        />
                    </div>

                    <div className="FormField">
                        <label
                            className="FormField__Label"
                            htmlFor="signup-name-input"
                        >
                            Name
                        </label>
                        <input
                            autoComplete="name"
                            id="signup-name-input"
                            className="FormField__Input"
                            onChange={(e) => {
                                this.userTyping("name", e);
                            }}
                        />
                    </div>

                    <div className="FormField">
                        <label
                            className="FormField__Label"
                            htmlFor="signup-password-input"
                        >
                            Password
                        </label>
                        <input
                            autoComplete="password"
                            type="password"
                            id="signup-password-input"
                            className="FormField__Input"
                            onChange={(e) => {
                                this.userTyping("password", e);
                            }}
                        />
                    </div>

                    <div className="FormField">
                        <label
                            className="FormField__Label"
                            htmlFor="signup-password-confirmation-input"
                        >
                            Confirm Password
                        </label>
                        <input
                            autoComplete="password"
                            type="password"
                            id="signup-password-confirmation-input"
                            className="FormField__Input"
                            onChange={(e) => {
                                this.userTyping("passwordConfirmation", e);
                            }}
                        />
                    </div>

                    <div className="FormField">
                        <label className="FormField__CheckboxLabel">
                            <input
                                className="FormField__Checkbox"
                                type="checkbox"
                                name="hasAgreed"
                            />{" "}
                            I agree to all statments in{" "}
                            <a href="" className="FormField__TermsLink">
                                terms of service
                            </a>
                            .
                        </label>
                    </div>

                    <div className="FormField">
                        <button type="submit" className="FormField__Button">
                            Submit
                        </button>
                    </div>
                </form>
                {this.state.signupError ? (
                    <h5 className="txt_error">{this.state.signupError}</h5>
                ) : null}
            </div>
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

    submitSignup = (e) => {

        this.setState({signupError: ""})
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
                (res) => {
                    const userObj = {
                        email: res.user.email,
                        name: this.state.name,
                    };
                    fire.firestore()
                        .collection("users")
                        .doc(this.state.email)
                        .set(userObj)
                        .then(
                            () => {
                                this.props.history.push("/dashboard");
                            },
                            (dbError) => {
                                console.log(dbError);
                                this.setState({
                                    signupError: "Incorrect Information or Email already in use",
                                });
                            }
                        );
                    res.user.updateProfile({ displayName: this.state.name });
                },
                (authError) => {
                    console.log(authError);
                    this.setState({ signupError: authError.message });
                }
            );
    };
}

export default SignUpForm;
