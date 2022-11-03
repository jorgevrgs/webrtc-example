import CameraButton from './buttons/CameraButton';
import LeaveRoomButton from './buttons/LeaveRoomButton';
import MicButton from './buttons/MicButton';
import SwitchToScreenSharingButton from './buttons/SwitchToScreenSharingButton';

export default function VideoButtons() {
  return (
    <div className="video_buttons_container">
      <MicButton />

      <CameraButton />

      <LeaveRoomButton />

      <SwitchToScreenSharingButton />
    </div>
  );
}
