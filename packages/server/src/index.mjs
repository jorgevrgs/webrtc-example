import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { RoomsDto } from './dtos/rooms.dto.mjs';
import { UsersDto } from './dtos/users.dto.mjs';
// import twilio from 'twilio';

const PORT = process.env.PORT || 1337;

const app = express();
app.use(cors());

const MAX_CONNECTIONS = 4;

const connectedUsers = new UsersDto();
const rooms = new RoomsDto();

app.get('/api/room-exists/:roomId', (req, res) => {
  const { roomId } = req.params;

  const roomExists = rooms.hasRoom(roomId);

  res.json({
    roomExists,
    isFull: roomExists
      ? rooms.getRoomUsers(roomId).length >= MAX_CONNECTIONS
      : undefined,
  });
});

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('create-new-room', ({ identity }) => {
    const { user, room } = rooms.createRoom(socket.id, identity);

    socket.join(room.id);

    console.log('New room created', room.id);
    console.log('Rooms', JSON.stringify(room, null, 2));

    socket.emit('room-created', { roomId: room.id });
    socket.emit('room-updated', {
      connectedUsers: [user],
    });
  });

  socket.on('join-room', ({ roomId, identity }) => {
    const user = rooms.joinRoom(roomId, identity, socket.id);

    socket.join(roomId);

    console.log('User joined room', { roomId, user });

    const users = rooms.getRoomUsers(roomId);

    io.to(roomId).emit('room-updated', {
      connectedUsers: users,
    });
  });
});

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
