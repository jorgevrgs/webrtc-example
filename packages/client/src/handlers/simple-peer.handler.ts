import { socketEvent } from '@app/commons';
import SimplePeer, { Instance, SignalData } from 'simple-peer';
import { Socket } from 'socket.io-client';
import { viewRemoteVideo } from '../utils/elements';
import { getLocalStream } from '../utils/media-stream';

export interface ClientContext {
  socket: Socket;
  streams: Map<string, MediaStream>;
  peers: Map<string, Instance>;
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

  // Peer Config
  const config = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };

  const peer = new SimplePeer({
    initiator: isInitiator,
    config,
    stream: localStream,
  });

  const onSignal = (signal: SignalData, socketId: string) => {
    const signalData = {
      signal,
      socketId,
    };

    if (socket) socket.emit(socketEvent.connSignal, signalData);
  };

  const onStream = (stream: MediaStream, socketId: string) => {
    console.log('onStream', { stream, socketId });

    if (socketId === socket?.id) {
      console.log('Ommiting stream from self', { socketId });
      return;
    }

    streams.set(socketId, stream);

    // view remote streams
    viewRemoteVideo(stream, socketId);
  };

  peer
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

  if (socket) socket.emit(socketEvent.connInit, { socketId });
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
