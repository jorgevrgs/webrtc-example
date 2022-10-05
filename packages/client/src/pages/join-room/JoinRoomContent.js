import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setConnectOnlyWithAudio } from '../../store/actions';
import { getRoomExists } from '../../utils/api';
import ErrorMessage from './ErrorMessage';
import JoinRoomButtons from './JoinRoomButtons';
import JoinRoomInputs from './JoinRoomInputs';
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox';

function JoinRoomContent({
  isRoomHost,
  connectOnlyWithAudio,
  setConnectOnlyWithAudioAction,
}) {
  const [roomIdValue, setRoomIdValue] = useState('');
  const [userNameValue, setUserNameValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    if (isRoomHost) {
      createRoom();
    } else {
      joinRoom();
    }
  };

  const joinRoom = async () => {
    const { roomExists, isFull } = await getRoomExists(roomIdValue);

    if (roomExists && !isFull) {
      setErrorMessage('');

      // Join a room!
      navigate('/room');
    } else {
      setErrorMessage(
        roomExists
          ? 'Meeting is full. Please try again later.'
          : 'Meeting does not exist. Please enter a valid room ID.'
      );
    }
  };

  const createRoom = () => {
    // Create a room!
    navigate('/room');
  };

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

      <ErrorMessage errorMessage={errorMessage} />

      <JoinRoomButtons
        isRoomHost={isRoomHost}
        handleJoinRoom={handleJoinRoom}
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
