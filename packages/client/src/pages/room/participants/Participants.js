import React from 'react';

const dummyParticipants = [
  { identity: 'Jake' },
  { identity: 'Anna' },
  { identity: 'Marek' },
  { identity: 'Darius' },
];

const Participant = ({ identity, lastItem }) => {
  return (
    <>
      <p className="participants_paragraph">{identity}</p>

      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
};

export default function Participants() {
  return (
    <div className="participants_container">
      {dummyParticipants.map(({ identity }, index) => (
        <Participant
          identity={identity}
          key={identity}
          lastItem={dummyParticipants.length === index + 1}
        />
      ))}
    </div>
  );
}
