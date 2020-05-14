import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export const CreateChat = ({ closeCreateChat, showCreateChat, createChat }) => {
  const [newRoomName, setNewRoomName] = useState("");

  return (
    <div>
      <Dialog
        open={showCreateChat}
        onClose={closeCreateChat}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Chatroom</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name for your new chatroom...
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Chatroom Name"
            type="email"
            fullWidth
            onChange={e => setNewRoomName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreateChat} color="primary">
            Cancel
          </Button>
          <Button onClick={() => createChat(newRoomName)} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
