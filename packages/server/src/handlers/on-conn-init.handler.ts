import { SOCKET_EVENT } from '@app/commons';
import { ServerContext } from '../types';

export const onConnInit = (
  {
    socketId,
  }: {
    socketId: string;
  },
  { socket, io }: ServerContext
) => {
  console.log('onConnInit', { socketId });

  const initData = { socketId: socket.id };

  io.to(socketId).emit(SOCKET_EVENT.connInit, initData);
};
