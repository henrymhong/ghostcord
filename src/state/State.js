import React, { createContext, useReducer } from "react";
import { GlobalReducer } from "./Reducer";

// Create context
export const GlobalContext = createContext();

// Create initial state
const initialState = {
  user: { auth: false, email: null, username: null },
  display: {
    showChatCreate: false,
    showChatInvite: false,
    showChatAccept: false
  },
  home: {
    chats: [],
    loadedAvatars: [],
    selectedChat: null
  }
};

// Create provider to pass state to children in context
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
