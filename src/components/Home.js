import React, { Component } from "react";
import { Button, Badge, Avatar, Divider, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PersonAddSharpIcon from "@material-ui/icons/PersonAddSharp";
import { auth, firestore } from "../config/fire";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import { withStyles } from "@material-ui/core/styles";
import { CreateChat } from "./CreateChat";
import { ChatInvite } from "./ChatInvite";
import { ChatAccept } from "./ChatAccept";
import ChatsListComponent from "./ChatsList";
import ChatViewComponent from "./ChatView";

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}))(Badge);

export default class HomeComponent extends Component {
  constructor() {
    super();
    this.state = {
      email: auth.currentUser.email,
      username: "",
      chatrooms: [],
      currentAvatars: {},
      selectedChat: null,
      showCreateChat: false,
      showChatInvite: false,
      showChatAccept: false
    };

    firestore
      .collection("chats")
      .where("users", "array-contains", this.state.email)
      .onSnapshot(result => {
        // anytime there is an update in database, call this to update chat list
        const chats = result.docs.map(doc => doc.data());
        this.setState({
          chatrooms: chats // set chatrooms in state
        });
      });

    firestore
      .collection("users")
      .doc(this.state.email)
      .get()
      .then(res => {
        this.setState({
          username: res.data().name // set chatrooms in state
        });
      });

    if (!(this.state.email in this.state.currentAvatars)) {
      firestore
        .collection("users")
        .doc(this.state.email)
        .get()
        .then(res => {
          let temp = this.state.currentAvatars;
          temp[this.state.email] = res.data().avatar;
          this.setState({ avatars: temp });
        });
    }
  }

  createChat = name => {
    if (name) {
      firestore
        .collection("chats")
        .add({
          messages: [],
          invited: [],
          users: [this.state.email],
          name: name,
          owner: this.state.email,
          id: null
        })
        .then(res => {
          firestore
            .collection("chats")
            .doc(res.id)
            .update({
              id: res.id
            });
        })
        .catch(err => {
          console.log("Error creating room: %s", err.code);
        });
      this.setState({ showCreateChat: false });
    } else {
      console.log("room not created");
    }
  };

  selectChat = async chatIndex => {
    await this.setState({
      selectedChat: chatIndex
    });
    this.updateAvatars();
  };

  updateAvatars = () => {
    var i = 0;
    let chatUsers = this.state.chatrooms[this.state.selectedChat].users;
    for (i; i < Object.keys(chatUsers).length; i++) {
      let email = chatUsers[i];
      if (!(email in this.state.currentAvatars)) {
        firestore
          .collection("users")
          .doc(email)
          .get()
          .then(res => {
            let temp = this.state.currentAvatars;
            temp[email] = res.data().avatar;
            this.setState({ avatars: temp });
          });
      }
    }
  };

  render() {
    return (
      // Whole page div
      <div
        style={{
          height: "97vh",
          width: "100%",
          display: "flex",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "green"
          // backgroundColor: this.props.theme.backgroundColor
        }}
      >
        {/* Left Section (ChatList) */}
        <div
          style={{
            height: "100%",
            width: "17%",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "black",
            alignSelf: "flexStart"
          }}
        >
          {/* Profile / Logout / Create chat */}
          <div
            style={{
              height: "15%",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "red"
            }}
          >
            <StyledBadge
              style={{ paddingTop: 8 }}
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              variant="dot"
            >
              <Avatar
                alt="Remy Sharp"
                src={this.state.currentAvatars[this.state.email]}
              />
            </StyledBadge>
            <Button variant="outlined" onClick={() => auth.signOut()}>
              Logout
            </Button>
            <IconButton onClick={() => this.setState({ showCreateChat: true })}>
              <AddIcon />
            </IconButton>
            {this.state.showCreateChat ? (
              <CreateChat
                showCreateChat={this.state.showCreateChat}
                closeCreateChat={() => this.setState({ showCreateChat: false })}
                createChat={this.createChat}
              />
            ) : null}

            <IconButton onClick={() => this.setState({ showChatInvite: true })}>
              <PersonAddSharpIcon />
            </IconButton>
            {this.state.showChatInvite ? (
              <ChatInvite
                showChatInvite={this.state.showChatInvite}
                closeChatInvite={() => this.setState({ showChatInvite: false })}
                chats={this.state.chatrooms}
                email={this.state.email}
              />
            ) : null}

            <IconButton onClick={() => this.setState({ showChatAccept: true })}>
              <PlaylistAddCheckIcon />
            </IconButton>
            {this.state.showChatAccept ? (
              <ChatAccept
                showChatAccept={this.state.showChatAccept}
                closeChatAccept={() => this.setState({ showChatAccept: false })}
                email={this.state.email}
              />
            ) : null}
            <Divider style={{ width: "90%" }} />
          </div>
          {/* Chatroom list (ChatList) */}
          <div
            style={{
              width: "100%",
              height: "84.5%",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "blue"
            }}
          >
            <ChatsListComponent
              chatsList={this.state.chatrooms}
              selectFunction={this.selectChat}
            />
          </div>
        </div>
        {/* Right Section (ChatView) */}
        {this.state.selectedChat < 0 ? (
          <div>No chat selected...</div>
        ) : (
          <ChatViewComponent
            chat={this.state.chatrooms[this.state.selectedChat]}
            email={this.state.email}
            username={this.state.username}
            avatars={this.state.currentAvatars}
          />
        )}
      </div>
    );
  }
}
