import { createSlice } from "@reduxjs/toolkit";

type ExtendedTextMessage = {
  participant?: string;
  stanzaId?: string;
  description: string;
  forwardingScore: number;
  isForwarded: boolean;
  jpegThumbnail: string;
  previewType: string;
  text: string;
  title: string;
};

type QuotedMessage = {
  deletedMessageId: string;
  editedMessageId: string;
  isDeleted: boolean;
  isEdited: boolean;
  participant: string;
  stanzaId: string;
  textMessage: string;
  typeMessage: string;
};

type Message = {
  chatId: string;
  deletedMessageId: string;
  editedMessageId: string;
  extendedTextMessage?: ExtendedTextMessage;
  idMessage: string;
  isDeleted: boolean;
  isEdited: boolean;
  quotedMessage?: QuotedMessage;
  senderContactName: string;
  senderId: string;
  senderName: string;
  textMessage?: string;
  timestamp: number;
  type: string;
  typeMessage: string;
};

type InitialState = {
  message: Message[];
  chatName: string;
  chatId: string;
};

const initialState: InitialState = {
  message: [],
  chatName: '',
  chatId: ''
};


export const apiSlice = createSlice({
  name: 'apiSlice',
  initialState: initialState,
  reducers: {
    addChatHistory: (state, action) => {
      console.log(action.payload);
      if (action.payload.length > 0) {
        state.message = action.payload;
      }
    },
    chatName: (state, action) => {
      state.chatName = action.payload
    },
    addChatId: (state, action) => {
      state.chatId = action.payload
    }
  }, 
}) 

export const { addChatHistory, chatName, addChatId } = apiSlice.actions;

export default apiSlice.reducer;

