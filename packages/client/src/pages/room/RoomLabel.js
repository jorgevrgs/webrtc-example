import React from 'react';

export default function RoomLabel({ roomId }) {
  return (
    <div className="room_label">
      <p className="room_label_paragraph">ID: {roomId}</p>
    </div>
  );
}
