import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import HomePageComponent from "./homepage/homepage";
import SignUpComponent from "./signup/SignUpForm";
import DashboardComponent from "./dashboard/dashboard";
import HomeComponent from "./groupchat/Home";
import ProfileComponent from "./profile/profile";
import EditProfileComponent from "./profile/editProfile";
import FriendsComponent from "./friends/friends";
import AboutComponent from "./about/about";
import WhiteBoardComponent from "./whiteboard/whiteboard";
import VideoChatComponent from "./video/videochat";
import { GlobalProvider } from "./state/State";
import { GlobalContext } from "./state/State";
import { auth } from "./config/fire";

const RoutingComponent = () => {
    const { state, dispatch } = useContext(GlobalContext);

    // Set global state user if logged in
    useEffect(() => {
        auth.onAuthStateChanged((res) => {
            if (res) {
                dispatch({
                    type: "SET_USER",
                    payload: res,
                });
            } else {
                dispatch({ type: "NO_USER" });
            }
        });
    }, [dispatch]);

    return (
        <Router>
            <div id="routing-container">
                <Redirect exact from="/" to="/login" />
                <Route exact path="/" component={HomePageComponent}></Route>
                <Route path="/login" component={HomePageComponent}></Route>
                <Route path="/signup" component={HomePageComponent}></Route>
                <Route
                    path="/dashboard"
                    render={({ history }) => (
                        <HomeComponent history={history} />
                    )}
                ></Route>
                <Route
                    path="/friends"
                    render={({ history }) => (
                        <FriendsComponent history={history} />
                    )}
                ></Route>
                <Route
                    exact
                    path="/profile"
                    render={({ history }) => (
                        <ProfileComponent history={history} />
                    )}
                ></Route>
                <Route
                    path="/profile/edit"
                    render={({ history }) => (
                        <EditProfileComponent history={history} />
                    )}
                ></Route>
                <Route
                    path="/whiteboard"
                    render={({ history }) => (
                        <WhiteBoardComponent history={history} />
                    )}
                ></Route>
                <Route
                    path="/about"
                    render={({ history }) => (
                        <AboutComponent history={history} />
                    )}
                ></Route>
                <Route
                    path="/video"
                    render={({ history }) => (
                        <VideoChatComponent history={history} />
                    )}
                ></Route>
            </div>
        </Router>
    );
};

ReactDOM.render(
    <GlobalProvider>
        <RoutingComponent />
    </GlobalProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
