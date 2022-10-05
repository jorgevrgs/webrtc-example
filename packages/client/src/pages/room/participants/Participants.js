import React from 'react';
import { connect } from 'react-redux';

const Participant = ({ identity, lastItem }) => {
  return (
    <>
      <p className="participants_paragraph">{identity}</p>

      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
};

function Participants({ participants }) {
  return (
    <div className="participants_container">
      {participants.map(({ identity }, index) => (
        <Participant
          identity={identity}
          key={index}
          lastItem={participants.length === index + 1}
        />
      ))}
    </div>
  );
}

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(Participants);
