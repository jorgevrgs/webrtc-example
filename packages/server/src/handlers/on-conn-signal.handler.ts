import { SOCKET_EVENT } from '@app/commons';
import { ServerContext } from '../types';

export const onConnSignal = (
  {
    socketId,
    signal,
  }: {
    socketId: string;
    signal: any;
  },
  { socket, io }: ServerContext
) => {
  const signalingData = {
    signal,
    socketId: socket.id,
  };

  io.to(socketId).emit(SOCKET_EVENT.connSignal, signalingData);
};
