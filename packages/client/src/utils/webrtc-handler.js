import store from '../store';
import { setShowOverlay } from '../store/actions';
import { createNewRoom, joinRoom } from './wss';

const defaultContraints = {
  audio: true,
  video: true,
};

let localStream;

export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost,
  roomId = null,
  identity
) => {
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
