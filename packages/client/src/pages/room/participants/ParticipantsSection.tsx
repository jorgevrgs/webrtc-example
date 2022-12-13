import DirectChat from './direct-chat/DirectChat';
import Participants from './Participants';
import ParticipantsLabel from './ParticipantsLabel';

export default function ParticipantsSection() {
  return (
    <div className="participants_section_container">
      <ParticipantsLabel />

      <Participants />

      <DirectChat />
    </div>
  );
}
