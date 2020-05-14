import React, { Component } from "react";
import NavBarComponent from "../navBar/navBar";

export default class FriendsComponent extends Component {
    render() {
        return (
            <div>
                <NavBarComponent history={this.props.history} />
                <h1>Friends</h1>
            </div>
        );
    }
}
