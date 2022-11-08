import { SOCKET_EVENT } from '@app/commons';
import { ServerContext } from '../types';

export const onCreateRoom = (
  {
    identity,
  }: {
    identity: string;
  },
  { rooms, socket, connectedUsers }: ServerContext
) => {
  console.log('create-new-room', { identity, socketId: socket.id });

  const { user, room } = rooms.createRoom(socket.id, identity);

  socket.join(room.id);

  connectedUsers.addUser(user);

  console.log('New room created', { roomId: room.id });

  socket.emit(SOCKET_EVENT.roomCreated, { roomId: room.id });
  socket.emit(SOCKET_EVENT.roomUpdated, {
    connectedUsers: [user],
  });
};
