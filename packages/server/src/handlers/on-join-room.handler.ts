import { SOCKET_EVENT } from '@app/commons';
import { ServerContext } from '../types';

export const onJoinRoom = (
  {
    roomId,
    identity,
  }: {
    roomId: string;
    identity: string;
  },
  { rooms, socket, connectedUsers, io }: ServerContext
) => {
  console.log('join-room', roomId, identity);

  const user = rooms.joinRoom(roomId, identity, socket.id);

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
    .filter((u) => u.socketId !== socket.id)
    .forEach((u) => {
      const data = { socketId: u.socketId };

      console.log('Emitting connPrepare', data);

      io.to(roomId).emit(SOCKET_EVENT.connPrepare, data);
    });

  io.to(roomId).emit(SOCKET_EVENT.roomUpdated, {
    connectedUsers: users,
  });
};
