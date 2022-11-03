import { useNavigate } from 'react-router-dom';
import ConnectingButton from './ConnectingButton';

export default function ConnectingButtons() {
  const navigate = useNavigate();

  const pushToJoinRoomPage = () => {
    navigate('/join-room');
  };

  const pushToCreateRoomPage = () => {
    navigate('/join-room?host=true');
  };

  return (
    <div className="connecting_buttons_container">
      <ConnectingButton
        buttonText="Join a meeting"
        onClickHandler={pushToJoinRoomPage}
      />
      <ConnectingButton
        buttonText="Create room"
        createRoomButton={true}
        onClickHandler={pushToCreateRoomPage}
      />
    </div>
  );
}
