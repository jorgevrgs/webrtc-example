import { useState } from 'react';
import CameraIcon from '../../../../assets/icons/camera.svg';
import CameraOffIcon from '../../../../assets/icons/cameraOff.svg';
import { toggleVideo } from '../../../../utils/tracks';

export default function CameraButton() {
  const [isCameraOn, setIsCameraOn] = useState(true);

  const handleClick = () => {
    toggleVideo(isCameraOn);
    setIsCameraOn((prev) => !prev);
  };

  return (
    <div className="video_button_container">
      <img
        src={isCameraOn ? CameraIcon : CameraOffIcon}
        alt="Camera"
        onClick={handleClick}
        className="video_button_image"
      />
    </div>
  );
}
