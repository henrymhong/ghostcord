import React, { useState, useEffect } from "react";
import {
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
    InputLabel,
    Button,
    Typography,
} from "@material-ui/core";
import { firestore } from "../config/fire";
import firebase from "firebase/app";

const sendInvite = async (
    chats,
    username,
    selectedChat,
    setInviteError,
    selectedFriend
) => {
    if (selectedChat !== "") {
        if (selectedFriend === "") {
            setInviteError(null);

            let inviteEmail = await firestore
                .collection("users")
                .where("name", "==", username)
                .get()
                .then((res) => {
                    if (res.docs[0] !== undefined) {
                        return res.docs[0].id;
                    }
                    setInviteError("No user with that name exists!");
                })
                .catch((err) => {
                    console.log("[ChatInvite] Error ", err);
                    return;
                });

            if (inviteEmail !== undefined) {
                await firestore
                    .collection("chats")
                    .doc(chats.find((e) => e.name === selectedChat).id)
                    .update({
                        invited: firebase.firestore.FieldValue.arrayUnion(
                            inviteEmail
                        ),
                    })
                    .catch((err) => {
                        console.log("[ChatInvite] Error ", err);
                        return;
                    });
                setInviteError("Invite sent!");
            }
        } else {
            let inviteEmail = await firestore
                .collection("users")
                .where("name", "==", selectedFriend)
                .get()
                .then((res) => {
                    if (res.docs[0] !== undefined) {
                        return res.docs[0].id;
                    }
                    setInviteError("No user selected!");
                })
                .catch((err) => {
                    console.log("[ChatInvite] Error ", err);
                    return;
                });

            if (selectedFriend !== undefined) {
                await firestore
                    .collection("chats")
                    .doc(chats.find((e) => e.name === selectedChat).id)
                    .update({
                        invited: firebase.firestore.FieldValue.arrayUnion(
                            inviteEmail
                        ),
                    })
                    .catch((err) => {
                        console.log("[ChatInvite] Error ", err);
                        return;
                    });
                setInviteError("Invite sent!");
            }
        }
    } else {
        setInviteError("Select a chat!");
    }
};

export const ChatInvite = ({
    showChatInvite,
    closeChatInvite,
    chats,
    email,
}) => {
    const [selectedChat, setSelectedChat] = useState("");
    const [name, setName] = useState("");
    const [inviteError, setInviteError] = useState("");

    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState("");

    useEffect(() => {
        firestore
            .collection("users")
            .where("email", "==", email)
            .get()
            .then((res) => {
                setFriends(res.docs[0].data().friends);
            });
    }, [email]);

    return (
        <Dialog
            open={showChatInvite}
            onClose={closeChatInvite}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle>Invite a user to your group</DialogTitle>
            <DialogContent style={{ display: "flex", flexDirection: "column" }}>
                <FormControl>
                    <InputLabel>Chat</InputLabel>
                    <Select
                        value={selectedChat}
                        onChange={(e) => setSelectedChat(e.target.value)}
                    >
                        {chats.map((chat, index) => {
                            if (chat.owner === email) {
                                return (
                                    <MenuItem value={chat.name} key={index}>
                                        {chat.name}
                                    </MenuItem>
                                );
                            }
                            return null;
                        })}
                    </Select>
                    <FormHelperText>* Must be owner of chat</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel>Friends</InputLabel>
                    <Select
                        value={selectedFriend}
                        onChange={(e) => setSelectedFriend(e.target.value)}
                    >
                        {friends !== undefined
                            ? friends.map((friend, index) => {
                                  return (
                                      <MenuItem value={friend.name} key={index}>
                                          {friend.name}
                                      </MenuItem>
                                  );
                              })
                            : null}
                    </Select>
                    <FormHelperText>* Select a friend to invite</FormHelperText>
                </FormControl>
                <TextField
                    margin="dense"
                    label="User to invite"
                    type="user"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeChatInvite} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() =>
                        sendInvite(
                            chats,
                            name,
                            selectedChat,
                            setInviteError,
                            selectedFriend
                        )
                    }
                    color="primary"
                >
                    Invite
                </Button>
            </DialogActions>
            {inviteError ? (
                <Typography
                    component="h5"
                    variant="h6"
                    style={{ textAlign: "center" }}
                >
                    {inviteError}
                </Typography>
            ) : null}
        </Dialog>
    );
};
