let localStream: MediaStream;

export const getLocalStream = async () => {
  if (!localStream) {
    const defaultMediaStreamContraints = {
      audio: true,
      video: true,
    };

    localStream = await navigator.mediaDevices.getUserMedia(
      defaultMediaStreamContraints
    );
  }

  return localStream;
};
