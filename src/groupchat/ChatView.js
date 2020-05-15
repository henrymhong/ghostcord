import React, { useState, useEffect } from "react";
import { Avatar, IconButton, TextField } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { firestore, db } from "../config/fire";
import firebase from "firebase/app";
import AttachmentIcon from '@material-ui/icons/Attachment';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
import { teal } from '@material-ui/core/colors';

const sendMessage = (message, chat, email, username,type,fileName) => {
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
                    type: type,
                    fileName: fileName
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
    const onChoosePhoto = event => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0]
            if (image) {
                const uploadTask = db.ref(`images/${image.name}`).put(image);
                console.log("updating picture");
                uploadTask.on(
                    "state_changed",
                    snapshot => {},
                    error => {
                        console.log(error);
                    },
                    () => {
                        db
                            .ref("images")
                            .child(image.name)
                            .getDownloadURL()
                            .then(url => {
                                sendMessage(url, chat, email, username,2,image.name)
                            });
                    }
                );
        
                alert("photo sent!");
            }
        } else {
            
        }
    }
    const onChooseAttachment = event => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0]
            if (image) {
                const uploadTask = db.ref(`images/${image.name}`).put(image);
                console.log("updating picture");
                uploadTask.on(
                    "state_changed",
                    snapshot => {},
                    error => {
                        console.log(error);
                    },
                    () => {
                        db
                            .ref("images")
                            .child(image.name)
                            .getDownloadURL()
                            .then(url => {
                                sendMessage(url, chat, email, username,3,image.name)
                            });
                    }
                );
        
                alert("attachment sent!");
            }
        } else {
            
        }
    }
    
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
                    //borderWidth: 1,
                    //borderStyle: "solid",
                    alignSelf: "flexStart",
                   // borderColor: "pink",
                }}
            >
                <div
                    id="chatview-container"
                    style={{
                        height: "98%",
                        width: "99%",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        //borderWidth: 3,
                        //borderStyle: "outset",
                        //borderColor: "purple",
                        paddingLeft: "10px",
                        
                    }}
                >
                    {chat.messages.length === 0 ? (
                        <>No messages have been sent.</>
                    ) : (
                        chat.messages.map((msg, index) => {
                            // Map all messages
                            var position =
                                msg.sender !== email ? "left" : "right";
                            var bubbleColor =
                                msg.sender !== email ? "linear-gradient(0deg, rgba(198,210,201,1) 100%, rgba(253,187,45,1) 100%)" : "rgb(29,84,84)"; // If user sent message, set color
                            var fontColor =
                                msg.sender !== email ? "#000000" : "#FFFFFF"; // If user sent message, set color
                            return (
                                // Chat bubble
                                <div
                                    key={index}
                                    style={{
                                        float: `${position}`,
                                        clear: "both",
                                        padding: "15px 10px 15px 10px",
                                        boxSizing: "border-box",
                                        wordWrap: "break-word",
                                        marginTop: "10px",
                                        background: `${bubbleColor}`,
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
                                        {/*regular message*/}
                                        {msg.type === 1 &&
											<div style={{ fontSize: "15px", width: '250px'}}>
												{msg.message}
											</div>
										}
                                        {/*image*/}
                                        {msg.type === 2 &&
											<div>
												<img
												style={{width: '100%', height: '300px'}}
                                    			src={msg.message}
                                    			alt= "cannot load image"
                                				/>
											</div>
										}
                                        {/*attachment*/}
                                        {msg.type === 3 &&
											<div>
												<Button 
													href={msg.message}
													target="_blank" //open attachment in a new tab
													variant="outlined" 
													color="secondary"
													//className={classes.button}
													startIcon={<AttachmentIcon />}
												>
													{msg.fileName}
												</Button>
											</div>
										}
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
                    {/*Send photos */}
                    <input
                        accept="image/*"
                        //className={classes.input}
                        id="icon-button-photo"
                        onChange={onChoosePhoto}
                        type="file"
                        style={{ display: 'none', }}
                    />
                    <label htmlFor="icon-button-photo">
                        <IconButton color="primary" component="span">
                            <PhotoCamera style={{ color: teal[900] }} />
                        </IconButton>
                    </label>
                   
                  
                    {/*Send attachment */}
                    <input
                        accept="media_type"
                        //className={classes.input}
                        id="icon-button-attachment"
                        onChange={onChooseAttachment}
                        type="file"
                        style={{ display: 'none', }}
                    />
                    <label htmlFor="icon-button-attachment">
                        <IconButton color="primary" component="span">
                            <AttachmentIcon style={{ color: teal[900] }}/>
                        </IconButton>
				    </label>
                    <TextField
                        id="messagebox"
                        style={{ flexGrow: 1 }}
                        onKeyUp={(e) =>
                            e.keyCode === 13 // If the user hits enter
                                ? sendMessage(message, chat, email, username,1,"")
                                : setMessage(e.target.value)
                        }
                    />
                    <IconButton
                        onClick={() =>
                            sendMessage(message, chat, email, username,1,"")
                        }
                    >
                        <SendRoundedIcon style={{ color: teal[900] }} />
                    </IconButton>
                </div>
            </main>
        );
    }
};


export default ChatViewComponent;
