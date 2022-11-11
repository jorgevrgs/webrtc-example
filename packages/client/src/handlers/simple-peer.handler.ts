import { SOCKET_EVENT } from '@app/commons';
import SimplePeer, { Instance, SignalData } from 'simple-peer';
import { Socket } from 'socket.io-client';
import { addMessage, store } from '../store';
import { viewRemoteVideo } from '../utils/elements';
import { getLocalStream } from '../utils/media-stream';
import { getTurnIceServers } from '../utils/turn';

export const CHANNEL_NAME = 'messenger';

export interface ClientContext {
  socket: Socket;
  streams: Map<string, MediaStream>;
  peers: Map<string, Instance>;
}

function getRTCConfig(): RTCConfiguration {
  const turnIceServers = getTurnIceServers();

  const iceServers: RTCConfiguration['iceServers'] = [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ];

  if (turnIceServers) {
    iceServers.push(...turnIceServers);
  }

  console.log('TURN ice servers', iceServers);

  return {
    iceServers,
  };
}

const prepareNewPeerConnection = async (
  {
    socketId,
    isInitiator,
  }: {
    socketId: string;
    isInitiator: boolean;
  },
  { socket, streams, peers }: ClientContext
) => {
  const localStream = await getLocalStream();

  const peer = new SimplePeer({
    initiator: isInitiator,
    config: getRTCConfig(),
    stream: localStream,
    channelName: CHANNEL_NAME,
  });

  const onSignal = (signal: SignalData, socketId: string) => {
    const signalData = {
      signal,
      socketId,
    };

    if (socket) socket.emit(SOCKET_EVENT.connSignal, signalData);
  };

  const onStream = (stream: MediaStream, socketId: string) => {
    streams.set(socketId, stream);

    const { participants } = store.getState().room;

    const participant = participants.find((p) => p.socketId === socketId);

    // view remote streams
    viewRemoteVideo(stream, socketId, Boolean(participant?.onlyAudio));
  };

  const onData = (chunk: any) => {
    const messageData = JSON.parse(chunk.toString());

    // Append new message to chat
    store.dispatch(addMessage(messageData));
  };

  peer
    .on('data', onData)
    .on('signal', (signal) => onSignal(signal, socketId))
    .on('stream', (stream) => onStream(stream, socketId))
    .on('error', (error) => {
      console.error('peer onError', error);
    });

  peers.set(socketId, peer);
};

export const onConnectionPrepare = (
  { socketId }: { socketId: string },
  { socket, streams, peers }: ClientContext
) => {
  console.log('1. conn-prepare for socket id', socketId);

  prepareNewPeerConnection(
    { socketId, isInitiator: false },
    { socket, streams, peers }
  );

  if (socket) socket.emit(SOCKET_EVENT.connInit, { socketId });
};

export const onConnectionSignal = (
  {
    signal,
    socketId,
  }: {
    signal: SignalData;
    socketId: string;
  },
  { peers }: ClientContext
) => {
  const peer = peers.get(socketId);

  if (peer) {
    peer.signal(signal);
  }
};

export const onConnectionInit = (
  { socketId }: { socketId: string },
  { socket, streams, peers }: ClientContext
) => {
  console.log('2. conn-init', socketId);

  prepareNewPeerConnection(
    { socketId, isInitiator: true },
    { socket, streams, peers }
  );
};
