import { setShowOverlay, store } from '../store';
import { viewLocalVideo } from './elements';
import { getLocalStream } from './media-stream';
import { createNewRoom, joinRoom } from './socket';
import { fetchTurnCredentials } from './turn';

let localStream: MediaStream;

export async function initRoomConnection({
  roomId,
  identity,
  isRoomHost,
  onlyAudio,
}: {
  roomId: string | null;
  identity: string;
  isRoomHost: boolean;
  onlyAudio: boolean;
}) {
  console.log('initRoomConnection', { roomId, identity, isRoomHost });
  await fetchTurnCredentials();

  localStream = await getLocalStream();
  viewLocalVideo(localStream, onlyAudio);

  store.dispatch(setShowOverlay(false));

  if (isRoomHost) {
    createNewRoom(identity, onlyAudio);
  } else {
    roomId && joinRoom(identity, roomId, onlyAudio);
  }
}
