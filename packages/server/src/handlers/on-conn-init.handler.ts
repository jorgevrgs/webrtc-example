// @ts-check

import { socketEvent } from '@app/commons';
import { Context } from '../types';

export const onInitializeConnection = (
  {
    socketId,
  }: {
    socketId: string;
  },
  { socket, io }: Context
) => {
  console.log('onInitializeConnection', { socketId });

  const initData = { socketId: socket.id };

  io.to(socketId).emit(socketEvent.connInit, initData);
};
