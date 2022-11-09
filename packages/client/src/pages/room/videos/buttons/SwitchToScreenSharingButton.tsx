import { useState } from 'react';
import SwitchIcon from '../../../../assets/icons/switchToScreenSharing.svg';
import { toggleScreenShare } from '../../../../utils/socket';
import LocalScreenSharingPreview from '../LocalScreenSharingPreview';

export default function SwitchToScreenSharingButton() {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] =
    useState<MediaStream | null>(null);

  const handleClick = async () => {
    if (!isScreenSharingActive) {
      const constraints: DisplayMediaStreamConstraints = {
        video: true,
        audio: false,
      };

      try {
        const screen = await navigator.mediaDevices.getDisplayMedia(
          constraints
        );

        setScreenSharingStream(screen);
        setIsScreenSharingActive(true);

        toggleScreenShare(isScreenSharingActive, screen);
      } catch (error) {
        console.log(error);
      }
    } else {
      setScreenSharingStream(null);
      setIsScreenSharingActive(false);

      toggleScreenShare(isScreenSharingActive);

      if (screenSharingStream) {
        screenSharingStream.getTracks().forEach((track) => track.stop());
      }
    }
  };

  return (
    <>
      <div className="video_button_container">
        <img
          src={SwitchIcon}
          alt="Switch"
          onClick={handleClick}
          className="video_button_image"
        />
      </div>
      {isScreenSharingActive && screenSharingStream && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )}
    </>
  );
}
