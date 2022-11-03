// @ts-check

import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { Instance, SignalData } from 'simple-peer';
import * as SimplePeer from 'simple-peer';
import { SocketContext } from '../../../contexts/socket.context';
import { useAppDispatch } from '../../../hooks';
import { setShowOverlay } from '../../../store';
import { getLocalStream } from '../../../utils/media-stream';

export default function VideoPreview() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [streams, setStreams] = useState<Map<string, MediaStream>>(new Map());
  const [peers, setPeers] = useState<Map<string, Instance>>(new Map());
  const socket = useContext(SocketContext);
  const remoteVideoRef = useRef<Map<string, HTMLVideoElement>>(new Map());

  if (!socket) {
    throw new Error('Socket is not defined');
  }

  const videoRef = useRef<HTMLVideoElement>(null);

  // Store
  const dispatch = useAppDispatch();

  const getStream = useCallback(getLocalStream, []);

  useEffect(() => {
    const getLocalVideo = async () => {
      const localStream = await getStream();
      setLocalStream(localStream);

      const video = videoRef.current;

      if (video) {
        video.srcObject = localStream;
      }

      dispatch(setShowOverlay(false));
    };

    getLocalVideo();
  }, []);

  // Socket events

  const prepareNewPeerConnection = ({
    socketId,
    isInitiator,
  }: {
    socketId: string;
    isInitiator: boolean;
  }) => {
    console.log('prepareNewPeerConnection', socketId, isInitiator);

    // Event Handlers

    const onSignal = (signal: SignalData) => {
      const signalData = {
        signal,
        socketId,
      };

      console.log('onSignal', signalData);

      socket.emit('conn-signal', signalData);
    };

    const onStream = (stream: MediaStream) => {
      console.log('onStream', { stream, socketId });

      setStreams((prevStreams) => prevStreams.set(stream.id, stream));
    };

    // Peer Config

    const config = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    };

    const peer = new SimplePeer(
      Object.assign(
        {
          initiator: isInitiator,
          config,
        },
        localStream ? { stream: localStream } : {}
      )
    );

    peer
      .on('signal', onSignal)
      .on('stream', onStream)
      .on('error', (error) => {
        console.error('onError', error);
      });

    setPeers((prevPeers) => prevPeers.set(socketId, peer));
  };

  const onConnectionPrepare = ({ socketId }: { socketId: string }) => {
    console.log('conn-prepare', socketId);

    prepareNewPeerConnection({ socketId, isInitiator: false });

    socket.emit('conn-init', { socketId });
  };

  const onConnectionSignal = ({
    signal,
    socketId,
  }: {
    signal: any;
    socketId: string;
  }) => {
    console.log('conn-signal', { signal, socketId });

    const peer = peers.get(socketId);

    if (!peer) {
      console.error('Peer not found', socketId);

      throw new Error(`Peer not found for socket id ${socketId}`);
    }

    peer.signal(signal);
  };

  const onConnectionInit = ({ socketId }: { socketId: string }) => {
    console.log('conn-init', socketId);

    prepareNewPeerConnection({ socketId, isInitiator: true });
  };

  socket
    .on('conn-prepare', onConnectionPrepare)
    .on('conn-signal', onConnectionSignal)
    .on('conn-init', onConnectionInit);

  return (
    <div id="videos_portal" className="videos_portal_styles">
      <div id="local-video-container" className="video_track_container">
        <video muted autoPlay ref={videoRef} />
      </div>

      {[...streams.keys()].map((key) => (
        <div key={key} className="video_track_container" id={`${key}-video`}>
          <video
            autoPlay
            ref={(el) => el && remoteVideoRef.current.set(key, el)}
          />
        </div>
      ))}
    </div>
  );
}
