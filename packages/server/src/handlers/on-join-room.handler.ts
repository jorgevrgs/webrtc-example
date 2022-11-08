// @ts-check

import { socketEvent } from '@app/commons';
import { Context } from '../types';

export const onJoinRoom = (
  {
    roomId,
    identity,
  }: {
    roomId: string;
    identity: string;
  },
  { rooms, socket, connectedUsers, io }: Context
) => {
  console.log('join-room', roomId, identity);

  const user = rooms.joinRoom(roomId, identity, socket.id);

  socket.join(roomId);

  connectedUsers.addUser(user);

  console.log('User joined room', { roomId, user });

  const users = rooms.getUsersByRoomId(roomId);

  // Prepare peer connection
  users &&
    users
      .filter((u) => u.socketId !== socket.id)
      .forEach((u) => {
        const data = { socketId: u.socketId };

        io.to(roomId).emit(socketEvent.connPrepare, data);
      });

  io.to(roomId).emit(socketEvent.roomUpdated, {
    connectedUsers: users,
  });
};
