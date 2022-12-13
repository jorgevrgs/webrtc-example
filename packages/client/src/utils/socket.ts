import { SOCKET_EVENT } from '@app/commons';
import { omit } from 'lodash-es';
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
import { addMessage, setChatSocketId, store } from '../store';
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

export const sendChatMessage = (content: string) => {
  // Append message to the store
  const identity = store.getState().room.identity;
  const messageData = {
    identity,
    content,
    createdByMe: true,
  };

  store.dispatch(addMessage(messageData));

  // Send message to all peers
  peers.forEach((peer) => {
    if (!peer.destroyed && peer.connected) {
      peer.send(JSON.stringify(omit(messageData, 'createdByMe')));
    }
  });
};

export const createNewRoom = (identity: string, onlyAudio: boolean) => {
  console.log(SOCKET_EVENT.createRoom, { identity });

  const data = {
    identity,
    onlyAudio,
  };

  socket.emit(SOCKET_EVENT.createRoom, data);
};

export const joinRoom = (
  identity: string,
  roomId: string,
  onlyAudio: boolean
) => {
  console.log('joinRoom', { identity, roomId });

  const data = {
    roomId,
    identity,
    onlyAudio,
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
  peers.forEach((peer) => {
    peer.streams.forEach((stream) => {
      stream.getTracks().forEach((oldTrack) => {
        newStream.getTracks().forEach((newTrack) => {
          if (oldTrack.kind === newTrack.kind) {
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

  store.dispatch(setChatSocketId(socket.id));

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
