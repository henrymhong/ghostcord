import React, { useState, useEffect } from "react";
import {
    List,
    Dialog,
    ListItem,
    ListItemAvatar,
    DialogTitle,
    ListItemText,
    Avatar,
    ListItemSecondaryAction,
    IconButton,
    Typography,
    DialogContentText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import { firestore } from "../config/fire";
import firebase from "firebase/app";

const acceptInvite = async (chat, email, setAcceptError) => {
    setAcceptError(null);
    await firestore
        .collection("chats")
        .doc(chat.id)
        .update({ users: firebase.firestore.FieldValue.arrayUnion(email) })
        .catch((err) => {
            console.log("[ChatAccept] ", err);
            setAcceptError(err);
        });
    await firestore
        .collection("chats")
        .doc(chat.id)
        .update({ invited: firebase.firestore.FieldValue.arrayRemove(email) })
        .catch((err) => {
            console.log("[ChatAccept] ", err);
            setAcceptError(err);
        });
    //   if (inviteEmail !== undefined) {
    //     await firestore
    //       .collection("chats")
    //       .doc(chats.find(e => e.name === selectedChat).id)
    //       .update({
    //         invited: firebase.firestore.FieldValue.arrayUnion(inviteEmail)
    //       })
    //       .catch(err => {
    //         console.log("[ChatInvite] Error ", err);
    //         return;
    //       });
    //     setInviteError("Invite sent!");
    //   }
};

export const ChatAccept = ({ showChatAccept, closeChatAccept, email }) => {
    const [acceptError, setAcceptError] = useState("");
    const [invitedChats, setInvitedChats] = useState([]);

    useEffect(() => {
        firestore
            .collection("chats")
            .where("invited", "array-contains", email)
            .onSnapshot((result) => {
                let chats = result.docs.map((doc) => doc.data());
                setInvitedChats(chats);
            });
    }, [email]);

    return (
        <Dialog
            open={showChatAccept}
            onClose={closeChatAccept}
            aria-labelledby="form-dialog-title"
            style={{ textAlign: "center" }}
        >
            <DialogTitle>Accept or decline chat invites</DialogTitle>
            {invitedChats.length === 0 ? (
                <DialogContentText>You have no invites.</DialogContentText>
            ) : null}
            <List>
                {invitedChats.map((chat, index) => {
                    return (
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar></Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={chat.name}
                                secondary={chat.owner}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() =>
                                        acceptInvite(
                                            chat,
                                            email,
                                            setAcceptError
                                        )
                                    }
                                >
                                    <DoneIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
            {acceptError ? (
                <Typography component="h5" variant="h6">
                    {acceptError}
                </Typography>
            ) : null}
        </Dialog>
    );
};
