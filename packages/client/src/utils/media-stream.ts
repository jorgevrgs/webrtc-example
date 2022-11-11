import { store } from '../store';

let localStream: MediaStream;

export const getLocalStream = async () => {
  if (!localStream) {
    const { connectOnlyWithAudio } = store.getState().room;

    const contraints: MediaStreamConstraints = {
      audio: true,
      video: connectOnlyWithAudio
        ? false
        : {
            width: 480,
            height: 360,
          },
    };

    localStream = await navigator.mediaDevices.getUserMedia(contraints);
  }

  return localStream;
};
