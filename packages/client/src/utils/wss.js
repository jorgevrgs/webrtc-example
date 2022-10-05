import io from 'socket.io-client';

const SERVER = 'http://localhost:1337';

let socket = null;

export const connectWithSocketIOServer = () => {
  if (!socket) {
    socket = io(SERVER);
  }

  socket.on('connect', () => {
    console.log('Connected to socket.io server', socket.id);
  });
};
