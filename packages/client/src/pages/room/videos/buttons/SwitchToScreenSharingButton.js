import React, { useState } from 'react';
import SwitchIcon from '../../../../assets/icons/switchToScreenSharing.svg';

export default function SwitchToScreenSharingButton() {
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const handleClick = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  return (
    <div className="video_button_container">
      <img
        src={SwitchIcon}
        alt="Switch"
        onClick={handleClick}
        className="video_button_image"
      />
    </div>
  );
}
