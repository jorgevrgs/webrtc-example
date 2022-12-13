import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Participant } from './room.slice';

interface ChatHistory {
  message: string;
}

interface ChatState {
  history: ChatHistory[];
  socketId: string;
  activeChat: Participant | null;
}

const initialState: ChatState = {
  history: [],
  socketId: '',
  activeChat: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatSocketId: (state, action: PayloadAction<string>) => {
      state.socketId = action.payload;
    },

    setActiveChat: (state, action: PayloadAction<Participant | null>) => {
      state.activeChat = action.payload;
    },

    addChatMessage: (state, action: PayloadAction<ChatHistory>) => {
      state.history.push(action.payload);
    },
  },
});

export const { setChatSocketId, setActiveChat, addChatMessage } =
  chatSlice.actions;

export const chatReducer = chatSlice.reducer;
