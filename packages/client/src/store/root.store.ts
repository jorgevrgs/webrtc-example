import { configureStore } from '@reduxjs/toolkit';
import { roomReducer } from './slices';

export const store = configureStore({
  reducer: {
    room: roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
