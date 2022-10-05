import React from 'react';
import Participants from './Participants';
import ParticipantsLabel from './ParticipantsLabel';

export default function ParticipantsSection() {
  return (
    <div className="participants_section_container">
      <ParticipantsLabel />

      <Participants />
    </div>
  );
}
