import React from "react";
import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@material-ui/core";

const ChatsListComponent = ({ chatsList, selectFunction }) => {
    if (chatsList.length > 0) {
        // If the user is in at least one chat
        return (
            <List>
                {console.log(chatsList)}
                {chatsList.map((chat, index) => {
                    // create a list item for each chat by mapping over the chatsList passed in from props
                    return (
                        // create a listitem for each chat the user is in
                        <div key={index}>
                            <ListItem
                                onClick={() => selectFunction(index)}
                                divider
                            >
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={""}>
                                        {chat.name.split("")[0]}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={chat.name} />
                            </ListItem>
                        </div>
                    );
                })}
            </List>
        );
    } else {
        // If the user is not in any chats
        return <div>You have no chatrooms!</div>;
    }
};

export default ChatsListComponent;
