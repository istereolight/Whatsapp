import { createSlice } from "@reduxjs/toolkit";

type Message = {
  chatId: string;
  lastMessage: string;
}[];

const initialState: Message = [];

export const newChatSlice = createSlice({
  name: 'newChat',
  initialState: initialState,
  reducers: {
    newChats: (state, action) => {
      const { chatId, lastMessage } = action.payload;
      state.push({chatId, lastMessage})
    }
  }, 
}) 

export const { newChats } = newChatSlice.actions;

export default newChatSlice.reducer;