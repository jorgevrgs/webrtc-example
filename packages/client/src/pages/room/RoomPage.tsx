import { pick } from 'lodash-es';
import { useEffect } from 'react';
import ChatSection from './chat/ChatSection';
import Overlay from './Overlay';
import ParticipantsSection from './participants/ParticipantsSection';
import RoomLabel from './RoomLabel';
import VideoSection from './videos/VideoSection';

import { useAppSelector } from '../../hooks';
import { initRoomConnection } from '../../utils/webrtc';
import './RoomPage.css';

export default function RoomPage() {
  const { roomId, identity, isRoomHost, showOverlay } = useAppSelector(
    (state) =>
      pick(state.room, ['roomId', 'identity', 'isRoomHost', 'showOverlay'])
  );

  useEffect(() => {
    initRoomConnection({
      roomId,
      identity,
      isRoomHost,
    });
  }, []);

  return (
    <div className="room_container">
      <ParticipantsSection />

      <VideoSection />

      <ChatSection />

      {roomId && <RoomLabel roomId={roomId} />}

      {showOverlay && <Overlay />}
    </div>
  );
}
