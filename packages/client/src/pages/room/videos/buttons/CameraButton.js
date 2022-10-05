import React from 'react';
import CameraIcon from '../../../../assets/icons/camera.svg';
import CameraOffIcon from '../../../../assets/icons/cameraOff.svg';

export default function CameraButton() {
  const [isCameraOn, setIsCameraOn] = React.useState(true);

  const handleClick = () => {
    setIsCameraOn(!isCameraOn);
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
