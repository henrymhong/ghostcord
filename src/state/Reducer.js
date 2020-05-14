// Action.type
// Action.payload
export const GlobalReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return setUser(state, action.payload);
        case "NO_USER":
            return noUser(state);
        case "SET_CHATS":
            return setChats(state, action.payload);
        case "SET_AVATARS":
            return setAvatars(state, action.payload);
        case "SET_SELECTED_CHAT":
            return setSelectedChat(state, action.payload);
        case "SET_SHOW_CHAT_CREATE":
            return {
                ...state,
                display: {
                    ...state.display,
                    showChatCreate: action.payload,
                },
            };
        case "SET_SHOW_CHAT_INVITE":
            return {
                ...state,
                display: {
                    ...state.display,
                    showChatInvite: action.payload,
                },
            };
        case "SET_SHOW_CHAT_ACCEPT":
            return {
                ...state,
                display: {
                    ...state.display,
                    showChatAccept: action.payload,
                },
            };
        default:
            console.log("DEFAULT DISPATCH RAN");
            return state;
    }
};

// Set user is logged in
const setUser = (state, user) => {
    console.log("[Dispatch] SET_USER");
    console.log(user);

    return {
        ...state,
        user: {
            auth: true,
            email: user.email,
            username: user.displayName,
        },
    };
};

// No user is logged in
const noUser = (state) => {
    console.log("[Dispatch] NO_USER");
    return {
        ...state,
        user: {
            auth: false,
            email: null,
            username: null,
        },
    };
};

// Set chats in state
const setChats = (state, newChats) => {
    console.log("[Dispatch] SET_CHATS");
    return {
        ...state,
        home: {
            ...state.home,
            chats: newChats,
        },
    };
};

// Set avatars in state
const setAvatars = (state, newAvatars) => {
    console.log("[Dispatch] SET_AVATARS");
    return {
        ...state,
        home: {
            ...state.home,
            loadedAvatars: newAvatars,
        },
    };
};

// Set selected chat in state
const setSelectedChat = (state, newSelectedChat) => {
    console.log("[Dispatch] SET_SELECTED_CHAT");
    return {
        ...state,
        home: {
            ...state.home,
            selectedChat: newSelectedChat,
        },
    };
};
