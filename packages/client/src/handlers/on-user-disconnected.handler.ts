import { ClientContext } from './simple-peer.handler';

export const onUserDisconnected = (
  { socketId }: { socketId: string },
  { peers, socket, streams }: ClientContext
) => {
  // Remove peer connection
  console.log('Removing disconnected user', socketId);

  const peer = peers.get(socketId);

  if (peer) {
    peer.destroy();
    peers.delete(socketId);
  }

  // Remove stream
  const stream = streams.get(socketId);

  if (stream) {
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());

    streams.delete(socketId);
  }

  // Remove video element
  const video = document.getElementById(`video-${socketId}`);

  if (video) {
    video.remove();
  }
};
