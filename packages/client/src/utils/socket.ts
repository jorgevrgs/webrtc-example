import { SOCKET_EVENT } from '@app/commons';
import type { Instance } from 'simple-peer';
import io from 'socket.io-client';
import {
  ClientContext,
  onConnectionInit,
  onConnectionPrepare,
  onConnectionSignal,
  onRoomCreated,
  onRoomUpdated,
  onUserDisconnected,
} from '../handlers';
import { getLocalStream } from './media-stream';

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
  console.log(SOCKET_EVENT.createRoom, { identity });

  const data = {
    identity,
  };

  socket.emit(SOCKET_EVENT.createRoom, data);
};

export const joinRoom = (identity: string, roomId: string) => {
  console.log('joinRoom', { identity, roomId });

  const data = {
    roomId,
    identity,
  };

  socket.emit(SOCKET_EVENT.joinRoom, data);
};

export async function toggleScreenShare(
  isActive: boolean,
  screen?: MediaStream
) {
  console.log('toggleScreenShare', { isActive });

  if (isActive) {
    console.log('Displaying local stream');

    const localStream = await getLocalStream();
    replaceStream(localStream);
  } else if (screen) {
    console.log('Displaying screen stream');

    replaceStream(screen);
  } else {
    console.error('No screen stream found');
  }
}

export function replaceStream(newStream: MediaStream) {
  peers.forEach((peer, socketId) => {
    peer.streams.forEach((stream) => {
      stream.getTracks().forEach((oldTrack) => {
        newStream.getTracks().forEach((newTrack) => {
          if (oldTrack.kind === newTrack.kind) {
            console.log('replacing track', {
              current: oldTrack.kind,
              new: newTrack.kind,
              socketId,
            });

            if (!peer.destroyed) {
              peer.replaceTrack(oldTrack, newTrack, stream);
              return;
            }
          }
        });
      });
    });
  });
}

socket.on(SOCKET_EVENT.connect, () => {
  console.log('connected to server', socket.id);
  socket
    .on(SOCKET_EVENT.roomCreated, (data) => onRoomCreated(data))
    .on(SOCKET_EVENT.roomUpdated, (data) => onRoomUpdated(data))
    .on(SOCKET_EVENT.connPrepare, (data) => onConnectionPrepare(data, context))
    .on(SOCKET_EVENT.connSignal, (data) => onConnectionSignal(data, context))
    .on(SOCKET_EVENT.connInit, (data) => onConnectionInit(data, context))
    .on(SOCKET_EVENT.userDisconnected, (data) =>
      onUserDisconnected(data, context)
    );
});
