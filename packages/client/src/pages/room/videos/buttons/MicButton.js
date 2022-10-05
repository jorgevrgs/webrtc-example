import React, { useState } from 'react';
import MicIcon from '../../../../assets/icons/mic.svg';
import MicOffIcon from '../../../../assets/icons/micOff.svg';

export default function MicButton() {
  const [isMuted, setIsMuted] = useState(false);

  const handleClick = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="video_button_container">
      <img
        src={isMuted ? MicOffIcon : MicIcon}
        alt="Mic"
        onClick={handleClick}
        className="video_button_image"
      />
    </div>
  );
}
