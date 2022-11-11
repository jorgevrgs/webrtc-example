import { pick } from 'lodash-es';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setConnectOnlyWithAudio, setIdentity, setRoomId } from '../../store';
import { getRoomExists } from '../../utils/api';
import ErrorMessage from './ErrorMessage';
import JoinRoomButtons from './JoinRoomButtons';
import JoinRoomInputs from './JoinRoomInputs';
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox';

export default function JoinRoomContent() {
  const [roomIdValue, setRoomIdValue] = useState('');
  const [userNameValue, setUserNameValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Store
  const dispatch = useAppDispatch();
  const { isRoomHost, connectOnlyWithAudio } = useAppSelector((state) =>
    pick(state.room, ['isRoomHost', 'connectOnlyWithAudio'])
  );

  const handleConnectOnlyWithAudioChange = (isChecked: boolean) => {
    dispatch(setConnectOnlyWithAudio(isChecked));
  };

  const handleJoinRoom = async () => {
    dispatch(setIdentity(userNameValue));

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
      dispatch(setRoomId(roomIdValue));
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
        isChecked={connectOnlyWithAudio}
        onChange={handleConnectOnlyWithAudioChange}
      />

      <ErrorMessage errorMessage={errorMessage} />

      <JoinRoomButtons
        isRoomHost={isRoomHost}
        handleJoinRoom={handleJoinRoom}
      />
    </>
  );
}
