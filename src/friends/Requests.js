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
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

const Requests = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const [sent, setSent] = useState([]);
    const [received, setReceived] = useState([]);

    const deletePending = (email, name) => {
        firestore
            .collection("users")
            .doc(state.user.email)
            .update({
                sent: firebase.firestore.FieldValue.arrayRemove({
                    email: email,
                    name: name,
                }),
            })
            .then(() => {});
        firestore
            .collection("users")
            .doc(email)
            .update({
                received: firebase.firestore.FieldValue.arrayRemove({
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
                setSent(res.docs[0].data().sent);
                setReceived(res.docs[0].data().received);
            });
    };

    const deleteRequest = (email, name) => {
        firestore
            .collection("users")
            .doc(state.user.email)
            .update({
                received: firebase.firestore.FieldValue.arrayRemove({
                    email: email,
                    name: name,
                }),
            })
            .then(() => {});
        firestore
            .collection("users")
            .doc(email)
            .update({
                sent: firebase.firestore.FieldValue.arrayRemove({
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
                setSent(res.docs[0].data().sent);
                setReceived(res.docs[0].data().received);
            });
    };

    const acceptRequest = (email, name) => {
        firestore
            .collection("users")
            .doc(state.user.email)
            .update({
                received: firebase.firestore.FieldValue.arrayRemove({
                    email: email,
                    name: name,
                }),
            })
            .then(() => {});
        firestore
            .collection("users")
            .doc(email)
            .update({
                sent: firebase.firestore.FieldValue.arrayRemove({
                    email: state.user.email,
                    name: auth.currentUser.displayName,
                }),
            })
            .then(() => {});

        firestore
            .collection("users")
            .doc(state.user.email)
            .update({
                friends: firebase.firestore.FieldValue.arrayUnion({
                    email: email,
                    name: name,
                }),
            })
            .then(() => {});
        firestore
            .collection("users")
            .doc(email)
            .update({
                friends: firebase.firestore.FieldValue.arrayUnion({
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
                setSent(res.docs[0].data().sent);
                setReceived(res.docs[0].data().received);
            });
    };

    useEffect(() => {
        firestore
            .collection("users")
            .where("email", "==", state.user.email)
            .get()
            .then((res) => {
                setSent(res.docs[0].data().sent);
                setReceived(res.docs[0].data().received);
            });
    }, [state.user.email]);

    return (
        <div>
            Pending
            <List>
                {sent !== undefined
                    ? sent.map((users, index) => {
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
                                                  deletePending(
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
                    : null}
            </List>
            Received
            <List>
                {received !== undefined
                    ? received.map((users, index) => {
                          return (
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
                                      <IconButton
                                          edge="end"
                                          aria-label="delete"
                                          onClick={() =>
                                              acceptRequest(
                                                  users.email,
                                                  users.name
                                              )
                                          }
                                      >
                                          <AddIcon />
                                      </IconButton>
                                      <IconButton
                                          edge="end"
                                          aria-label="delete"
                                          onClick={() =>
                                              deleteRequest(
                                                  users.email,
                                                  users.name
                                              )
                                          }
                                      >
                                          <DeleteIcon />
                                      </IconButton>
                                  </ListItemSecondaryAction>
                              </ListItem>
                          );
                      })
                    : null}
            </List>
        </div>
    );
};

export default Requests;
