interface RoomLabelProps {
  roomId: string;
}

export default function RoomLabel({ roomId }: RoomLabelProps) {
  return (
    <div className="room_label">
      <p className="room_label_paragraph">
        ID:{' '}
        <span onClick={() => navigator.clipboard.writeText(roomId)}>
          {roomId}
        </span>
      </p>
    </div>
  );
}
