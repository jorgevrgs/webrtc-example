export const SOCKET_EVENT = {
  // Peer
  connInit: 'conn-init',
  connPrepare: 'conn-prepare',
  connSignal: 'conn-signal',

  // Client
  connect: 'connect',
  roomCreated: 'room-created',
  roomUpdated: 'room-updated',

  // Server
  connection: 'connection',
  createRoom: 'create-new-room',
  disconnect: 'disconnect',
  joinRoom: 'join-room',
};
