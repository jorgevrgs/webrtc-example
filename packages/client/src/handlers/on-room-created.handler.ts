import { setRoomId, store } from '../store';

export const onRoomCreated = ({ roomId }: { roomId: string }) => {
  console.log('room-created', roomId);

  store.dispatch(setRoomId(roomId));
};
