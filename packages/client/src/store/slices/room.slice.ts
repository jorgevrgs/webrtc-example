import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  connectOnlyWithAudio: boolean;
  identity: string;
  isRoomHost: boolean;
  participants: { identity: string }[];
  roomId: string | null;
  showOverlay: boolean;
}

const initState: AppState = {
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

    setParticipants: (state, action: PayloadAction<{ identity: string }[]>) => {
      state.participants = action.payload;
    },
  },
});

export const {
  setIsRoomHost,
  setConnectOnlyWithAudio,
  setIdentity,
  setRoomId,
  setShowOverlay,
  setParticipants,
} = roomSlice.actions;

export const roomReducer = roomSlice.reducer;
