import React, { useState } from "react";
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
  Typography
} from "@material-ui/core";
import { firestore } from "../config/fire";
import firebase from "firebase/app";

const sendInvite = async (chats, username, selectedChat, setInviteError) => {
  setInviteError(null);

  let inviteEmail = await firestore
    .collection("users")
    .where("name", "==", username)
    .get()
    .then(res => {
      if (res.docs[0] !== undefined) {
        return res.docs[0].id;
      }
      setInviteError("No user with that name exists!");
    })
    .catch(err => {
      console.log("[ChatInvite] Error ", err);
      return;
    });

  if (inviteEmail !== undefined) {
    await firestore
      .collection("chats")
      .doc(chats.find(e => e.name === selectedChat).id)
      .update({
        invited: firebase.firestore.FieldValue.arrayUnion(inviteEmail)
      })
      .catch(err => {
        console.log("[ChatInvite] Error ", err);
        return;
      });
    setInviteError("Invite sent!");
  }
};

export const ChatInvite = ({
  showChatInvite,
  closeChatInvite,
  chats,
  email
}) => {
  const [selectedChat, setSelectedChat] = useState("");
  const [name, setName] = useState("");
  const [inviteError, setInviteError] = useState("");

  return (
    <Dialog
      open={showChatInvite}
      onClose={closeChatInvite}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>Invite a user to your group</DialogTitle>
      <DialogContent>
        <FormControl>
          <InputLabel>Chat</InputLabel>
          <Select
            value={selectedChat}
            onChange={e => setSelectedChat(e.target.value)}
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
        <TextField
          margin="dense"
          label="User to invite"
          type="user"
          fullWidth
          onChange={e => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeChatInvite} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => sendInvite(chats, name, selectedChat, setInviteError)}
          color="primary"
        >
          Invite
        </Button>
      </DialogActions>
      {inviteError ? (
        <Typography component="h5" variant="h6">
          {inviteError}
        </Typography>
      ) : null}
    </Dialog>
  );
};
