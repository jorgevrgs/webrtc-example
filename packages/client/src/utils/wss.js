import io from 'socket.io-client';
import store from '../store';
import { setParticipants, setRoomId } from '../store/actions';

const SERVER = 'http://localhost:1337';

let socket = null;

export const connectWithSocketIOServer = () => {
  if (!socket) {
    socket = io(SERVER);
  }

  socket.on('connect', () => {
    console.log('Connected to socket.io server', socket.id);
  });

  socket.on('room-created', ({ roomId }) => {
    store.dispatch(setRoomId(roomId));
  });

  socket.on('room-updated', ({ connectedUsers }) => {
    store.dispatch(setParticipants(connectedUsers));
  });
};

export const createNewRoom = (identity) => {
  const data = {
    identity,
  };

  socket.emit('create-new-room', data);
};

export const joinRoom = (identity, roomId) => {
  const data = {
    roomId,
    identity,
  };

  socket.emit('join-room', data);
};
