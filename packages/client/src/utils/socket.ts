import { socketEvent } from '@app/commons';
import type { Instance } from 'simple-peer';
import io from 'socket.io-client';
import {
  ClientContext,
  onConnectionInit,
  onConnectionPrepare,
  onConnectionSignal,
  onRoomCreated,
  onRoomUpdated,
} from '../handlers';

const SERVER = 'http://localhost:1337';

const peers = new Map<string, Instance>();
const streams = new Map<string, MediaStream>();

export const socket = io(SERVER);

const context: ClientContext = {
  socket,
  peers,
  streams,
};

export const createNewRoom = (identity: string) => {
  console.log(socketEvent.createRoom, { identity });

  const data = {
    identity,
  };

  socket.emit(socketEvent.createRoom, data);
};

export const joinRoom = (identity: string, roomId: string) => {
  console.log('joinRoom', { identity, roomId });

  const data = {
    roomId,
    identity,
  };

  socket.emit(socketEvent.joinRoom, data);
};

socket.on(socketEvent.connect, () => {
  console.log('connected to server', socket.id);
  socket
    .on(socketEvent.roomCreated, (data) => onRoomCreated(data))
    .on(socketEvent.roomUpdated, (data) => onRoomUpdated(data))
    .on(socketEvent.connPrepare, (data) => onConnectionPrepare(data, context))
    .on(socketEvent.connSignal, (data) => onConnectionSignal(data, context))
    .on(socketEvent.connInit, (data) => onConnectionInit(data, context));
});
