import { Participant, setParticipants, store } from '../store';

export const onRoomUpdated = ({
  connectedUsers,
}: {
  connectedUsers: Participant[];
}) => {
  console.log('room-updated', connectedUsers);

  store.dispatch(setParticipants(connectedUsers));
};
