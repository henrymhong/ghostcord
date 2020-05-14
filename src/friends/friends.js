import React from "react";
import NavBarComponent from "../navBar/navBar";

const FriendsComponent = ({ history }) => {
    return (
        <div>
            <NavBarComponent history={history} />
            <h1>Friends</h1>
        </div>
    );
};

export default FriendsComponent;
