// @ts-check

import { socketEvent } from '@app/commons';
import { Context } from '../types';

export const onCreateRoom = (
  {
    identity,
  }: {
    identity: string;
  },
  { rooms, socket, connectedUsers }: Context
) => {
  console.log('create-new-room', identity);

  const { user, room } = rooms.createRoom(socket.id, identity);

  socket.join(room.id);

  connectedUsers.addUser(user);

  console.log('New room created', room.id);
  console.log('Rooms', JSON.stringify(room, null, 2));

  socket.emit(socketEvent.roomCreated, { roomId: room.id });
  socket.emit(socketEvent.roomUpdated, {
    connectedUsers: [user],
  });
};
