import store from '../store';
import { setShowOverlay } from '../store/actions';

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

      // if (isRoomHost) {
      //   wss.createNewRoom(identity)
      // } else {
      //   wss.joinRoom(roomId, identity)
      // }
    })
    .catch(console.error);
};

const showLocalVideoPreview = (stream) => {
  // const localVideo = document.getElementById('local_video');
  // localVideo.srcObject = stream;
};
