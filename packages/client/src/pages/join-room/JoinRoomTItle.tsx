interface JoinRoomTItleProps {
  isRoomHost: boolean;
}

export default function JoinRoomTItle({ isRoomHost }: JoinRoomTItleProps) {
  const titleText = isRoomHost ? 'Host meeting' : 'Join a meeting';

  return <p className="join_room_title">{titleText}</p>;
}
