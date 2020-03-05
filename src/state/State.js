import React, { createContext, useReducer } from "react";
import GlobalReducer from "./Reducer";

// Create initial state
const initialState = {
  user: null
};

// const initialChatState = {
//   chat: null
// };

// Create context
export const GlobalContext = createContext(initialState);
// export const ChatContext = createContext(initialChatState);

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ user: state.user }}>
      {children}
    </GlobalContext.Provider>
  );
};
