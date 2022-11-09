import { getLocalStream } from './media-stream';

export const toggleMic = async (isMuted: boolean) => {
  const localStream = await getLocalStream();

  localStream.getAudioTracks().forEach((track) => {
    track.enabled = isMuted;
  });
};

export const toggleVideo = async (isPaused: boolean) => {
  const localStream = await getLocalStream();

  localStream.getVideoTracks().forEach((track) => {
    track.enabled = !isPaused;
  });
};
