import React, { useState, useEffect } from "react";
import { Avatar, IconButton, TextField } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { firestore } from "../config/fire";
import firebase from "firebase/app";

const sendMessage = (message, chat, email, username) => {
    if (message.length > 0) {
        // only send if the message isn't empty
        firestore
            .collection("chats")
            .doc(chat.id)
            .update({
                // update the chat by adding a message object to the messages array in firestore
                messages: firebase.firestore.FieldValue.arrayUnion({
                    sender: email,
                    senderUsername: username,
                    message: message,
                    timestamp: Date.now(),
                }),
            })
            .then(() => {});
        // clear the chat input
        document.getElementById("messagebox").value = "";
    }
};

const ChatViewComponent = ({ chat, avatars, email, username }) => {
    const [message, setMessage] = useState("");
    // const [bubbleColors, setBubbleColors] = useState({});

    // scroll the the bottom of the chat view
    useEffect(() => {
        const container = document.getElementById("chatview-container");
        if (container) container.scrollTo(0, container.scrollHeight);
    }, [chat]);

    if (chat === undefined) {
        return <>Welcome</>;
    } else {
        return (
            <main
                style={{
                    height: "100%",
                    width: "83%",
                    borderWidth: 1,
                    borderStyle: "solid",
                    alignSelf: "flexStart",
                    borderColor: "pink",
                }}
            >
                <div
                    id="chatview-container"
                    style={{
                        height: "95%",
                        width: "99%",
                        overflowY: "scroll",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "purple",
                        paddingLeft: "10px",
                    }}
                >
                    {chat.messages.length === 0 ? (
                        <>No messages have been sent.</>
                    ) : (
                        chat.messages.map((msg, index) => {
                            // Map all messages
                            var bubbleColor =
                                msg.sender !== email ? "#CCCCCC" : "#147efb"; // If user sent message, set color
                            var fontColor =
                                msg.sender !== email ? "#000000" : "#FFFFFF"; // If user sent message, set color
                            return (
                                // Chat bubble
                                <div
                                    key={index}
                                    style={{
                                        float: "left",
                                        clear: "both",
                                        padding: "15px 10px 15px 10px",
                                        boxSizing: "border-box",
                                        wordWrap: "break-word",
                                        marginTop: "10px",
                                        backgroundColor: `${bubbleColor}`,
                                        width: "300px",
                                        borderRadius: "10px",
                                        fontSize: "20px",
                                        fontFamily: "arial",
                                        color: `${fontColor}`,
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    {/* Avatar in chat bubble */}
                                    <div style={{ paddingRight: 8 }}>
                                        <Avatar
                                            src={
                                                msg.senderUsername !== username
                                                    ? avatars[msg.sender]
                                                    : avatars[email]
                                            }
                                            style={{ borderRight: "10px" }}
                                        />
                                    </div>
                                    {/* Timestamp and Sender */}
                                    <div>
                                        {msg.message}
                                        <div
                                            style={{
                                                fontSize: "14px",
                                                paddingTop: 5,
                                                whiteSpace: "pre-wrap",
                                            }}
                                        >
                                            {new Date(
                                                msg.timestamp
                                            ).toLocaleString()}
                                            {`\nSent By: ${msg.senderUsername}`}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                {/* Chat message input */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        width: "100%",
                    }}
                >
                    <TextField
                        id="messagebox"
                        style={{ flexGrow: 1 }}
                        onKeyUp={(e) =>
                            e.keyCode === 13 // If the user hits enter
                                ? sendMessage(message, chat, email, username)
                                : setMessage(e.target.value)
                        }
                    />
                    <IconButton
                        onClick={() =>
                            sendMessage(message, chat, email, username)
                        }
                    >
                        <SendRoundedIcon />
                    </IconButton>
                </div>
            </main>
        );
    }
};

export default ChatViewComponent;
