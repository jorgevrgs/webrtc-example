import React from 'react';

export default function JoinRoomTItle({ isRoomHost }) {
  const titleText = isRoomHost ? 'Host meeting' : 'Join a meeting';

  return <p className="join_room_title">{titleText}</p>;
}
