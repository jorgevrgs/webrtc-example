import { configureStore } from '@reduxjs/toolkit';
import { chatReducer, roomReducer } from './slices';

export const store = configureStore({
  reducer: {
    room: roomReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
