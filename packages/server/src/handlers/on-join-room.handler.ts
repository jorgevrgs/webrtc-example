import { SOCKET_EVENT } from '@app/commons';
import { ServerContext } from '../types';

export const onJoinRoom = (
  {
    roomId,
    identity,
    onlyAudio,
  }: {
    roomId: string;
    identity: string;
    onlyAudio: boolean;
  },
  { rooms, socket, connectedUsers, io }: ServerContext
) => {
  console.log('join-room', { roomId, identity, onlyAudio });

  const user = rooms.joinRoom({
    roomId,
    identity,
    socketId: socket.id,
    onlyAudio,
  });

  socket.join(roomId);

  connectedUsers.addUser(user);

  console.log('User joined room', { roomId, user });

  const users = rooms.getUsersByRoomId(roomId);

  // Prepare peer connection
  if (!users) {
    throw new Error("Can't find users in room");
  }

  console.log(
    'Current users in room',
    JSON.stringify({ roomId, users }, null, 2)
  );

  users
    .filter((user) => user.socketId !== socket.id)
    .forEach((user) => {
      const data = { socketId: socket.id };

      console.log('Emitting connPrepare', data);

      io.to(user.socketId).emit(SOCKET_EVENT.connPrepare, data);
    });

  io.to(roomId).emit(SOCKET_EVENT.roomUpdated, {
    connectedUsers: users,
  });
};
