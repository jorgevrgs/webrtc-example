interface ConnectingButtonProps {
  createRoomButton?: boolean;
  buttonText: string;
  onClickHandler: () => void;
}

export default function ConnectingButton({
  createRoomButton = false,
  buttonText,
  onClickHandler,
}: ConnectingButtonProps) {
  const buttonClass = createRoomButton
    ? 'create_room_button'
    : 'join_room_button';

  return (
    <button className={buttonClass} onClick={onClickHandler}>
      {buttonText}
    </button>
  );
}
