import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { RoomsDto } from './dtos/rooms.dto.mjs';
import { UsersDto } from './dtos/users.dto.mjs';
import { onConnectionHandler } from './handlers/socket.handler.mjs';
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

io.on('connection', (socket) =>
  onConnectionHandler({ socket, rooms, io, connectedUsers })
);

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
