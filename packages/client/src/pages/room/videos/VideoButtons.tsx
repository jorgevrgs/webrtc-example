import { pick } from 'lodash-es';
import { useAppSelector } from '../../../hooks';
import CameraButton from './buttons/CameraButton';
import LeaveRoomButton from './buttons/LeaveRoomButton';
import MicButton from './buttons/MicButton';
import SwitchToScreenSharingButton from './buttons/SwitchToScreenSharingButton';

export default function VideoButtons() {
  const { connectOnlyWithAudio } = useAppSelector((state) =>
    pick(state.room, ['connectOnlyWithAudio'])
  );

  return (
    <div className="video_buttons_container">
      <MicButton />

      {!connectOnlyWithAudio && <CameraButton />}

      <LeaveRoomButton />

      {!connectOnlyWithAudio && <SwitchToScreenSharingButton />}
    </div>
  );
}
