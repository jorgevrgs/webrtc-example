import React from 'react';
import ChatSection from './chat/ChatSection';
import ParticipantsSection from './participants/ParticipantsSection';
import RoomLabel from './RoomLabel';
import VideoSection from './videos/VideoSection';

import { connect } from 'react-redux';
import './RoomPage.css';

function RoomPage({ roomId }) {
  return (
    <div className="room_container">
      <ParticipantsSection />

      <VideoSection />

      <ChatSection />

      <RoomLabel roomId={roomId} />
    </div>
  );
}

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(RoomPage);
