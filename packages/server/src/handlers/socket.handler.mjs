// @ts-check

const onCreateRoom = ({ identity }, { rooms, socket, connectedUsers }) => {
  console.log('create-new-room', identity);

  const { user, room } = rooms.createRoom(socket.id, identity);

  socket.join(room.id);

  connectedUsers.addUser(user);

  console.log('New room created', room.id);
  console.log('Rooms', JSON.stringify(room, null, 2));

  socket.emit('room-created', { roomId: room.id });
  socket.emit('room-updated', {
    connectedUsers: [user],
  });
};

const onJoinRoom = (
  { roomId, identity },
  { rooms, socket, connectedUsers, io }
) => {
  console.log('join-room', roomId, identity);

  const user = rooms.joinRoom(roomId, identity, socket.id);

  socket.join(roomId);

  connectedUsers.addUser(user);

  console.log('User joined room', { roomId, user });

  const users = rooms.getRoomUsers(roomId);

  // Prepare peer connection
  users
    .filter((u) => u.socketId !== socket.id)
    .forEach((u) => {
      const data = { socketId: u.socketId };

      io.to(roomId).emit('conn-prepare', data);
    });

  io.to(roomId).emit('room-updated', {
    connectedUsers: users,
  });
};

const onConnPrepare = ({ socketId, signal }, { socket, io }) => {
  const signalingData = {
    signal,
    socketId: socket.id,
  };

  io.to(socketId).emit('conn-signal', signalingData);
};

const onDisconnect = ({ socket, connectedUsers, io, rooms }) => {
  console.log('disconnect', socket.id);

  const user = connectedUsers.getUserBySocketId(socket.id);

  if (user) {
    console.log('Disconnecting user', user);

    const roomId = user.roomId;

    connectedUsers.removeUserBySocketId(user.socketId);
    rooms.removeUserFromRoom(roomId, user.socketId);

    socket.leave(roomId);

    const users = rooms.getRoomUsers(roomId);

    console.log('Update users', users);

    if (users.length > 0) {
      io.to(roomId).emit('room-updated', {
        connectedUsers: users,
      });
    } else {
      rooms.removeRoom(roomId);
    }
  }
};

export const onConnectionHandler = ({ socket, rooms, connectedUsers, io }) => {
  console.log('User connected', socket.id);

  socket.on('create-new-room', ({ identity }) =>
    onCreateRoom({ identity }, { rooms, socket, connectedUsers })
  );

  socket.on('join-room', ({ roomId, identity }) =>
    onJoinRoom({ roomId, identity }, { rooms, socket, connectedUsers, io })
  );

  socket.on('disconnect', () =>
    onDisconnect({ socket, rooms, connectedUsers, io })
  );

  socket.on('conn-prepare', ({ signal, socketId }) =>
    onConnPrepare({ signal, socketId }, { socket, io })
  );
};
