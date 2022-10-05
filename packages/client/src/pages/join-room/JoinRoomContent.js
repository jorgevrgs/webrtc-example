import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setConnectOnlyWithAudio } from '../../store/actions';
import JoinRoomInputs from './JoinRoomInputs';
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox';

function JoinRoomContent({
  isRoomHost,
  connectOnlyWithAudio,
  setConnectOnlyWithAudioAction,
}) {
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

      <OnlyWithAudioCheckbox
        value={connectOnlyWithAudio}
        onChange={setConnectOnlyWithAudioAction}
      />
    </>
  );
}

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConnectOnlyWithAudioAction: (connectOnlyWithAudio) =>
      dispatch(setConnectOnlyWithAudio(connectOnlyWithAudio)),
  };
};

export default connect(
  mapStoreStateToProps,
  mapDispatchToProps
)(JoinRoomContent);
