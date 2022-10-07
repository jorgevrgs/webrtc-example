import Peer from 'simple-peer';
import store from '../store';
import { setShowOverlay } from '../store/actions';
import { createNewRoom, joinRoom, signalPeerData } from './wss';

const defaultContraints = {
  audio: true,
  video: true,
};

let localStream;

export const getLocalPreviewAndInitRoomConnection = async ({
  isRoomHost,
  roomId = null,
  identity,
}) => {
  navigator.mediaDevices
    .getUserMedia(defaultContraints)
    .then((stream) => {
      localStream = stream;
      showLocalVideoPreview(stream);

      // dispatch action to hide overlay
      store.dispatch(setShowOverlay(false));

      if (isRoomHost) {
        createNewRoom(identity);
      } else {
        joinRoom(identity, roomId);
      }
    })
    .catch(console.error);
};

const showLocalVideoPreview = (stream) => {
  // const localVideo = document.getElementById('local_video');
  // localVideo.srcObject = stream;
};

const addStream = (stream, socketId) => {};

/** @type {Map<string, any>} */
let peers = new Map();

let streams = [];

/**
 *
 * @param {string} socketId Connected user socket id
 * @param {boolean} isInitiator
 */
export const prepareNewPeerConnection = (socketId, isInitiator) => {
  console.log('prepareNewPeerConnection', socketId, isInitiator);

  const config = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };

  const peer = new Peer({
    initiator: isInitiator,
    stream: localStream,
    config,
  });

  peer
    .on('signal', (data) => {
      const signalData = {
        signal: data,
        socketId,
      };

      signalPeerData(signalData);
    })
    // .on('connect', () => {
    //   console.log('connect');
    // })
    // .on('data', (data) => {
    //   console.log('data', data);
    // })
    .on('stream', (stream) => {
      addStream(stream, socketId);
      streams = [...streams, stream];
    });

  peers.set(socketId, peer);
};

export const handleSignalingData = ({ signal, socketId }) => {
  const peer = peers.get(socketId);

  if (peer) {
    peer.signal(signal);
  }
};
