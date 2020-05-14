import React, { useEffect, useContext } from "react";
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
import { GlobalContext } from "../state/State";
import NavBarComponent from "../navBar/navBar";
import Burger from "../burger/burger";

const StyledBadge = withStyles((theme) => ({
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
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}))(Badge);

const HomeComponent = ({ history }) => {
    // constructor() {
    //   super();
    //   this.state = {
    //     email: auth.currentUser.email,
    //     username: "",
    //     chatrooms: [],
    //     loadedAvatars: {},
    //     selectedChat: null,
    //     showCreateChat: false,
    //     showChatInvite: false,
    //     showChatAccept: false
    //   };

    const { state, dispatch } = useContext(GlobalContext);

    useEffect(() => {
        if (state.user.email === null) {
            dispatch({
                type: "SET_CHATS",
                payload: [],
            });
        } else {
            firestore
                .collection("chats")
                .where("users", "array-contains", state.user.email)
                .onSnapshot((result) => {
                    // anytime there is an update in database, call this to update chat list
                    dispatch({
                        type: "SET_CHATS",
                        payload: result.docs.map((doc) => doc.data()),
                    });
                });
        }

        // if (!(state.user.email in state.home.loadedAvatars)) {
        //   firestore
        //     .collection("users")
        //     .doc(state.user.email)
        //     .get()
        //     .then(res => {
        //       let temp = state.home.loadedAvatars;
        //       temp[state.user.email] = res.data().avatar;
        //       //this.setState({ avatars: temp });
        //       dispatch({ type: "SET_AVATARS", payload: temp });
        //     });
        // }
    }, [dispatch, state.user.email]);

    const createChat = (name) => {
        if (name) {
            firestore
                .collection("chats")
                .add({
                    messages: [],
                    invited: [],
                    users: [state.user.email],
                    name: name,
                    owner: state.user.email,
                    id: null,
                })
                .then((res) => {
                    firestore.collection("chats").doc(res.id).update({
                        id: res.id,
                    });
                })
                .catch((err) => {
                    console.log("Error creating room: %s", err.code);
                });
            dispatch({ type: "SET_SHOW_CHAT_CREATE", payload: false });
            //this.setState({ showCreateChat: false });
        } else {
            console.log("room not created");
        }
    };

    const selectChat = (chatIndex) => {
        dispatch({ type: "SET_SELECTED_CHAT", payload: chatIndex });
    };

    useEffect(() => {
        console.log(state.home.selectedChat);
        updateAvatars();
    }, [state.home.selectedChat]);

    const updateAvatars = () => {
        if (!(state.home.selectedChat === null)) {
            console.log("UPDATEAVATARS: ", state.home.chats);
            if (
                state.home.chats.length !== 0 &&
                state.home.chats !== undefined
            ) {
                var i = 0;
                // console.log(state.home.chats[state.home.selectedChat]);
                let chatUsers = state.home.chats[state.home.selectedChat].users;

                for (i; i < Object.keys(chatUsers).length; i++) {
                    let email = chatUsers[i];
                    if (!(email in state.home.loadedAvatars)) {
                        firestore
                            .collection("users")
                            .doc(email)
                            .get()
                            .then((res) => {
                                let temp = state.home.loadedAvatars;
                                temp[email] = res.data().avatar;
                                dispatch({
                                    type: "SET_AVATARS",
                                    payload: temp,
                                });
                            });
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (state.user.email !== null) {
            let temp;
            firestore
                .collection("users")
                .doc(state.user.email)
                .get()
                .then((res) => {
                    temp = state.home.loadedAvatars;
                    temp[state.user.email] = res.data().avatar;
                    dispatch({
                        type: "SET_AVATARS",
                        payload: temp,
                    });
                });
        }
    }, [state.user.email]);

    return (
        <>
            <div>
                <NavBarComponent history={history} />
            </div>
            <div
                id="outer-container"
                style={{
                    height: "90vh",
                    width: "100%",
                    display: "flex",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "green",
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
                        alignSelf: "flexStart",
                    }}
                >
                    {/* Profile / Logout / Create chat */}
                    <div
                        style={{
                            height: "15%",
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: "red",
                        }}
                    >
                        <StyledBadge
                            style={{ paddingTop: 8 }}
                            overlap="circle"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            variant="dot"
                        >
                            <Avatar
                                alt="Remy Sharp"
                                src={state.home.loadedAvatars[state.user.email]}
                            />
                        </StyledBadge>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                auth.signOut();
                                history.push("/login");
                            }}
                        >
                            Logout
                        </Button>
                        <IconButton
                            onClick={() =>
                                dispatch({
                                    type: "SET_SHOW_CHAT_CREATE",
                                    payload: true,
                                })
                            }
                        >
                            <AddIcon />
                        </IconButton>
                        {state.display.showChatCreate ? (
                            <CreateChat
                                showCreateChat={state.display.showChatCreate}
                                closeCreateChat={() =>
                                    dispatch({
                                        type: "SET_SHOW_CHAT_CREATE",
                                        payload: false,
                                    })
                                }
                                createChat={createChat}
                            />
                        ) : null}

                        <IconButton
                            onClick={() =>
                                dispatch({
                                    type: "SET_SHOW_CHAT_INVITE",
                                    payload: true,
                                })
                            }
                        >
                            <PersonAddSharpIcon />
                        </IconButton>
                        {state.display.showChatInvite ? (
                            <ChatInvite
                                showChatInvite={state.display.showChatInvite}
                                closeChatInvite={() =>
                                    dispatch({
                                        type: "SET_SHOW_CHAT_INVITE",
                                        payload: false,
                                    })
                                }
                                chats={state.home.chats}
                                email={state.user.email}
                            />
                        ) : null}

                        <IconButton
                            onClick={() =>
                                dispatch({
                                    type: "SET_SHOW_CHAT_ACCEPT",
                                    payload: true,
                                })
                            }
                        >
                            <PlaylistAddCheckIcon />
                        </IconButton>
                        {state.display.showChatAccept ? (
                            <ChatAccept
                                showChatAccept={state.display.showChatAccept}
                                closeChatAccept={() =>
                                    dispatch({
                                        type: "SET_SHOW_CHAT_ACCEPT",
                                        payload: false,
                                    })
                                }
                                email={state.user.email}
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
                            borderColor: "blue",
                        }}
                    >
                        <ChatsListComponent
                            chatsList={state.home.chats}
                            selectFunction={selectChat}
                            loadedAvatars={state.home.loadedAvatars}
                        />
                    </div>
                </div>
                {/* Right Section (ChatView) */}
                {state.home.selectedChat < 0 ? (
                    <div>No chat selected...</div>
                ) : (
                    <ChatViewComponent
                        chat={state.home.chats[state.home.selectedChat]}
                        email={state.user.email}
                        username={state.user.username}
                        avatars={state.home.loadedAvatars}
                    />
                )}
            </div>
        </>
    );
};

export default HomeComponent;
