import React, { useEffect, useContext, useState } from "react";
import { auth, firestore } from "../config/fire";
import firebase from "firebase/app";
import Divider from "@material-ui/core/Divider";

import { GlobalContext } from "../state/State";
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    ListItemSecondaryAction,
    IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const Requests = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const [friends, setFriends] = useState([]);

    const deleteFriend = (email, name) => {
        firestore
            .collection("users")
            .doc(state.user.email)
            .update({
                friends: firebase.firestore.FieldValue.arrayRemove({
                    email: email,
                    name: name,
                }),
            })
            .then(() => {});
        firestore
            .collection("users")
            .doc(email)
            .update({
                friends: firebase.firestore.FieldValue.arrayRemove({
                    email: state.user.email,
                    name: auth.currentUser.displayName,
                }),
            })
            .then(() => {});
        firestore
            .collection("users")
            .where("email", "==", state.user.email)
            .get()
            .then((res) => {
                setFriends(res.docs[0].data().friends);
            });
    };

    useEffect(() => {
        firestore
            .collection("users")
            .where("email", "==", state.user.email)
            .get()
            .then((res) => {
                setFriends(res.docs[0].data().friends);
            });
    }, [state.user.email]);

    return (
        <div>
            <List>
                {friends !== undefined ? (
                    friends.map((users, index) => {
                        return (
                            <>
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={
                                                state.home.loadedAvatars[
                                                    users.email
                                                ]
                                            }
                                        ></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={users.name} />
                                    <ListItemSecondaryAction>
                                        {/* <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => sendRequest(users.email)}
                                >
                                    <AddIcon />
                                </IconButton> */}
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() =>
                                                deleteFriend(
                                                    users.email,
                                                    users.name
                                                )
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                            </>
                        );
                    })
                ) : (
                    <div>
                        <em>Add some friends!</em>
                    </div>
                )}
            </List>
        </div>
    );
};

export default Requests;
