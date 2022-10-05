import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
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

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
