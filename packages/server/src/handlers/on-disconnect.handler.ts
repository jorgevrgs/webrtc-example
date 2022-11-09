import { SOCKET_EVENT } from '@app/commons';
import { ServerContext } from '../types';

export const onDisconnect = ({
  socket,
  connectedUsers,
  io,
  rooms,
}: ServerContext) => {
  console.log('disconnect', socket.id);

  const user = connectedUsers.getUserBySocketId(socket.id);

  if (user) {
    console.log('Disconnecting user', user);

    const roomId = user.roomId;

    connectedUsers.removeUserBySocketId(user.socketId);
    rooms.removeUserFromRoom(roomId, user.socketId);

    socket.leave(roomId);

    const users = rooms.getUsersByRoomId(roomId);

    console.log('Updated users', JSON.stringify(users, null, 2));

    if (users && users.length > 0) {
      io.to(roomId).emit(SOCKET_EVENT.userDisconnected, {
        socketId: socket.id,
      });

      io.to(roomId).emit(SOCKET_EVENT.roomUpdated, {
        connectedUsers: users,
      });
    } else {
      rooms.removeRoom(roomId);
    }
  }
};
