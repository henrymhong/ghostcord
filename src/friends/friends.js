import React, { useContext } from "react";
import NavBarComponent from "../navBar/navBar";
import { GlobalContext } from "../state/State";

const FriendsComponent = ({ history }) => {
    const { state, dispatch } = useContext(GlobalContext);

    return (
        <div>
            <NavBarComponent history={history} />
            <h1>Friends</h1>
        </div>
    );
};

export default FriendsComponent;
