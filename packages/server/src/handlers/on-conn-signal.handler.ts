// @ts-check

import { socketEvent } from '@app/commons';
import { Context } from '../types';

export const onConnSignal = (
  {
    socketId,
    signal,
  }: {
    socketId: string;
    signal: any;
  },
  { socket, io }: Context
) => {
  const signalingData = {
    signal,
    socketId: socket.id,
  };

  io.to(socketId).emit(socketEvent.connSignal, signalingData);
};
