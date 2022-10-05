import React, { useState } from 'react';
import { connect } from 'react-redux';
import JoinRoomInputs from './JoinRoomInputs';

function JoinRoomContent({ isRoomHost }) {
  const [roomIdValue, setRoomIdValue] = useState('');
  const [userNameValue, setUserNameValue] = useState('');

  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        userNameValue={userNameValue}
        setUserNameValue={setUserNameValue}
        isRoomHost={isRoomHost}
      />
    </>
  );
}

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(JoinRoomContent);
