import { useEffect, useRef } from 'react';

interface LocalScreenSharingPreviewProps {
  stream: MediaStream;
}

function LocalScreenSharingPreview({ stream }: LocalScreenSharingPreviewProps) {
  const localPreviewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localPreviewRef.current) {
      const video = localPreviewRef.current;
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();
      };
    }
  }, [stream]);

  return (
    <div className="local_screen_share_preview">
      <video muted autoPlay ref={localPreviewRef}></video>
    </div>
  );
}

export default LocalScreenSharingPreview;
