import { setShowOverlay, store } from '../store';
import { viewLocalVideo } from './elements';
import { getLocalStream } from './media-stream';
import { createNewRoom, joinRoom } from './socket';

let localStream: MediaStream;

export async function initRoomConnection({
  roomId,
  identity,
  isRoomHost,
}: {
  roomId: string | null;
  identity: string;
  isRoomHost: boolean;
}) {
  console.log('initRoomConnection', { roomId, identity, isRoomHost });

  localStream = await getLocalStream();
  viewLocalVideo(localStream);

  store.dispatch(setShowOverlay(false));

  if (isRoomHost) {
    createNewRoom(identity);
  } else {
    roomId && joinRoom(identity, roomId);
  }
}
