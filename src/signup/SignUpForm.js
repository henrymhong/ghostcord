import React, { Component } from 'react';

class SignUpForm extends Component {

    render() {
        return (
                                <div className="FormCenter">
			                        <form className="FormFields" onSubmit={e => this.submitLogin(e)}>

										<div className="FormField">
											<label className="FormField__Label" htmlFor="signup-email-input">Email</label>
											<input 
											autoComplete="email"
											id="signup-email-input"
											className="FormField__Input"
											onChange={e => {
												this.userTyping("email", e);
											}}/>
										</div>

										<div className="FormField">
											<label className="FormField__Label" htmlFor="signup-name-input">Name</label>
											<input 
											autoComplete="name"
											id="signup-name-input"
											className="FormField__Input"
											onChange={e => {
												this.userTyping("name", e);
											}}/>
										</div>

										<div className="FormField">
											<label className="FormField__Label" htmlFor="signup-password-input">Password</label>
											<input 
											autoComplete="password"
											id="signup-password-input"
											className="FormField__Input"
											onChange={e => {
												this.userTyping("password", e);
											}}/>
										</div>

										<div className="FormField">
											<label className="FormField__CheckboxLabel">
												<input className="FormField__Checkbox" type="checkbox" name="hasAgreed" /> I agree to all statments in <a href="" className="FormField__TermsLink">terms of service</a>.
											</label>
										</div>

										<div className="FormField">
											<button className="FormField__Button">Sign Up</button>
										</div>


									</form>
								</div>
        )
    }

}

export default SignUpForm;