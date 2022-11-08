let localStream: MediaStream;

export const getLocalStream = async () => {
  if (!localStream) {
    const contraints: MediaStreamConstraints = {
      audio: true,
      video: {
        width: 480,
        height: 360,
      },
    };

    localStream = await navigator.mediaDevices.getUserMedia(contraints);
  }

  return localStream;
};
