// @ts-check

import { pick } from 'lodash-es';
import { useEffect } from 'react';
import { createNewRoom, joinRoom } from '../../contexts/socket.context';
import ChatSection from './chat/ChatSection';
import Overlay from './Overlay';
import ParticipantsSection from './participants/ParticipantsSection';
import RoomLabel from './RoomLabel';
import VideoPreview from './videos/VideoPreview';
import VideoSection from './videos/VideoSection';

import { useAppSelector } from '../../hooks';
import './RoomPage.css';

export default function RoomPage() {
  const { roomId, identity, isRoomHost, showOverlay } = useAppSelector(
    (state) =>
      pick(state.room, ['roomId', 'identity', 'isRoomHost', 'showOverlay'])
  );

  useEffect(() => {
    if (isRoomHost) {
      createNewRoom(identity);
    } else {
      roomId && joinRoom(identity, roomId);
    }
  }, []);

  return (
    <div className="room_container">
      <ParticipantsSection />

      <VideoSection />

      <ChatSection />

      {roomId && <RoomLabel roomId={roomId} />}

      {showOverlay && <Overlay />}

      <VideoPreview />
    </div>
  );
}
