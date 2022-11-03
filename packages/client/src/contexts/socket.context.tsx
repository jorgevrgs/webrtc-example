import { createContext } from 'react';
import io, { Socket } from 'socket.io-client';
import { setParticipants, setRoomId, store } from '../store';

const SERVER = 'http://localhost:1337';

export const socket = io(SERVER);
export const SocketContext = createContext<Socket | null>(null);

// Socket Event Handlers

export const onRoomCreated = ({ roomId }: { roomId: string }) => {
  console.log('room-created', roomId);

  store.dispatch(setRoomId(roomId));
};

export const onRoomUpdated = ({
  connectedUsers,
}: {
  connectedUsers: { identity: string }[];
}) => {
  console.log('room-updated', connectedUsers);

  store.dispatch(setParticipants(connectedUsers));
};

export const createNewRoom = (identity: string) => {
  socket.emit('create-new-room', { identity });

  const data = {
    identity,
  };

  socket.emit('create-new-room', data);
};

export const joinRoom = (identity: string, roomId: string) => {
  console.log('joinRoom', { identity, roomId });

  const data = {
    roomId,
    identity,
  };

  socket.emit('join-room', data);
};

socket.on('room-created', onRoomCreated).on('room-updated', onRoomUpdated);
