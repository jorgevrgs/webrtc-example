import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  onClick: () => void;
  buttonText: string;
  cancelButton?: boolean;
}

const Button = ({ onClick, buttonText, cancelButton = false }: ButtonProps) => {
  const buttonClass = cancelButton
    ? 'join_room_cancel_button'
    : 'join_room_success_button';
  return (
    <button className={buttonClass} onClick={onClick}>
      {buttonText}
    </button>
  );
};

interface JoinRoomButtonsProps {
  handleJoinRoom: () => void;
  isRoomHost: boolean;
}

export default function JoinRoomButtons({
  handleJoinRoom,
  isRoomHost,
}: JoinRoomButtonsProps) {
  const successButtonText = isRoomHost ? 'Host' : 'Join';
  const navigate = useNavigate();
  const pushToIntroductionPage = () => {
    navigate('/');
  };

  return (
    <div className="join_room_buttons_container">
      <Button onClick={handleJoinRoom} buttonText={successButtonText} />

      <Button
        onClick={pushToIntroductionPage}
        buttonText="Cancel"
        cancelButton
      />
    </div>
  );
}
