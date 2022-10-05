import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
// import twilio from 'twilio';

const PORT = process.env.PORT || 1337;

const app = express();
app.use(cors());

const MAX_CONNECTIONS = 4;

let connectedUsers = [];
let rooms = [];

app.get('/api/room-exists/:roomId', (req, res) => {
  const { roomId } = req.params;
  const roomExists = rooms.find((room) => room.id === roomId);

  res.send({
    roomExists,
    isFull: roomExists ? roomExists.users.length >= MAX_CONNECTIONS : undefined,
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
    const roomId = uuidv4();

    const newUser = {
      identity,
      id: uuidv4(),
      socketId: socket.id,
      roomId,
    };

    connectedUsers.push(newUser);

    const newRoom = {
      id: roomId,
      connectedUsers: [newUser],
    };

    rooms.push(newRoom);

    socket.join(roomId);

    console.log('New room created', roomId);
    console.log('Rooms', rooms);

    socket.emit('room-created', { roomId });
  });

  socket.on('join-room', (data) => {
    const { roomId, identity } = data;

    const roomToJoin = rooms.find((room) => room.id === roomId);

    roomToJoin.users.push(identity);

    socket.join(roomId);

    console.log('User joined room', roomId);
    console.log('Rooms', rooms);

    socket.emit('room-joined', roomId);
  });
});

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
