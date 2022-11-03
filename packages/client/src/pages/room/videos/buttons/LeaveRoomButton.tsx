export default function LeaveRoomButton() {
  const handleClick = () => {
    window.location.href = window.location.origin;
  };

  return (
    <div className="video_button_container">
      <button className="video_button_end" onClick={handleClick}>
        Leave Room
      </button>
    </div>
  );
}
