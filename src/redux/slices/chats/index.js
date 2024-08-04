import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

const initialState = {
  chats: [],
  messages: {},
  chatSeen: {},
  selectedChat: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats(state, action) {
      state.chats = action.payload;
    },
    setMessages(state, action) {
      state.messages[action.payload.regno] = action.payload.messages;
    },
    addMessage(state, action) {
      const regno = action.payload.regno;
      if (state?.messages[regno])
        state.messages[regno].push(action.payload.message);
      else {
        state.messages[regno] = [action.payload.message];
      }
    },
    setChatSeen(state, action) {
      const regno = action.payload.regno;
      state.chatSeen[regno] = action.payload.seen;
    },
    removeUnread(state, action) {
      const regno = action.payload;
      state.chats.forEach((chat) => {
        if (chat.regno == regno) chat.isUnreadMessages = false;
      });
    },
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },
  },
});

export const {
  setChats,
  setMessages,
  addMessage,
  setChatSeen,
  removeUnread,
  setSelectedChat,
} = chatsSlice.actions;

export default chatsSlice.reducer;
