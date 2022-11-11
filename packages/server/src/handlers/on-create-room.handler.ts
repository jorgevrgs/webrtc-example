import { SOCKET_EVENT } from '@app/commons';
import { ServerContext } from '../types';

export const onCreateRoom = (
  {
    identity,
    onlyAudio,
  }: {
    identity: string;
    onlyAudio: boolean;
  },
  { rooms, socket, connectedUsers }: ServerContext
) => {
  console.log('create-new-room', { identity, socketId: socket.id, onlyAudio });

  const { user, room } = rooms.createRoom({
    socketId: socket.id,
    identity,
    onlyAudio,
  });

  socket.join(room.id);

  connectedUsers.addUser(user);

  console.log('New room created', { roomId: room.id });

  socket.emit(SOCKET_EVENT.roomCreated, { roomId: room.id });
  socket.emit(SOCKET_EVENT.roomUpdated, {
    connectedUsers: [user],
  });
};
