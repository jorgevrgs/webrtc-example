import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  identity: string;
  content: string;
  createdByMe: boolean;
}

export interface Participant {
  id: string;
  identity: string;
  socketId: string;
  roomId: string;
  onlyAudio: boolean;
}

export interface RoomState {
  messages: Message[];
  connectOnlyWithAudio: boolean;
  identity: string;
  isRoomHost: boolean;
  participants: Participant[];
  roomId: string | null;
  showOverlay: boolean;
}

const initState: RoomState = {
  messages: [],
  connectOnlyWithAudio: false,
  identity: '',
  isRoomHost: false,
  participants: [],
  roomId: null,
  showOverlay: true,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState: initState,
  reducers: {
    setIsRoomHost: (state, action: PayloadAction<boolean>) => {
      state.isRoomHost = action.payload;
    },

    setConnectOnlyWithAudio: (state, action: PayloadAction<boolean>) => {
      state.connectOnlyWithAudio = action.payload;
    },

    setIdentity: (state, action: PayloadAction<string>) => {
      state.identity = action.payload;
    },

    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },

    setShowOverlay: (state, action: PayloadAction<boolean>) => {
      state.showOverlay = action.payload;
    },

    setParticipants: (state, action: PayloadAction<Participant[]>) => {
      state.participants = action.payload;
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const {
  addMessage,
  setConnectOnlyWithAudio,
  setIdentity,
  setIsRoomHost,
  setParticipants,
  setRoomId,
  setShowOverlay,
} = roomSlice.actions;

export const roomReducer = roomSlice.reducer;
