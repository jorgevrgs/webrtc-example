export function viewLocalVideo(stream: MediaStream, onlyAudio: boolean) {
  const videosPortal = document.getElementById('videos_portal');

  if (!videosPortal) {
    throw new Error('videos_portal not found');
  }
  // Clean content of videosPortal
  videosPortal.textContent = '';
  videosPortal.classList.add('videos_portal_styles');

  const localVideoContainer = document.createElement('div');
  localVideoContainer.classList.add('video_track_container');

  const videoElement = document.createElement('video');
  videoElement.muted = true;
  videoElement.autoplay = true;
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  localVideoContainer.appendChild(videoElement);

  if (onlyAudio) {
    localVideoContainer.appendChild(getOnlyAudioLabelElement());
  }

  videosPortal.appendChild(localVideoContainer);
}

export function viewRemoteVideo(
  stream: MediaStream,
  socketId: string,
  onlyAudio: boolean
) {
  const videosPortal = document.getElementById('videos_portal');

  if (!videosPortal) {
    throw new Error('videos_portal not found');
  }

  // Check duplicated video
  const duplicatedVideo = videosPortal.querySelector(
    `[data-socket-id="${socketId}"]`
  );

  if (duplicatedVideo) {
    console.log('Video already exists', { socketId });
    return;
  }

  videosPortal.classList.add('videos_portal_styles');

  const remoteVideoContainer = document.createElement('div');
  remoteVideoContainer.classList.add('video_track_container');
  remoteVideoContainer.id = `video-${socketId}`;
  remoteVideoContainer.setAttribute('data-socket-id', socketId);

  const videoElement = document.createElement('video');
  videoElement.autoplay = true;
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoElement.addEventListener('click', () => {
    if (videoElement.classList.contains('full_screen')) {
      videoElement.classList.remove('full_screen');
    } else {
      videoElement.classList.add('full_screen');
    }
  });

  remoteVideoContainer.appendChild(videoElement);

  if (onlyAudio) {
    remoteVideoContainer.appendChild(getOnlyAudioLabelElement());
  } else {
    remoteVideoContainer.style.position = 'static';
  }

  videosPortal.appendChild(remoteVideoContainer);
}

function getOnlyAudioLabelElement() {
  const labelContainer = document.createElement('div');
  labelContainer.classList.add('label_only_audio_container');

  const labelElement = document.createElement('p');
  labelElement.classList.add('label_only_audio_text');
  labelElement.innerText = 'Only audio';

  labelContainer.appendChild(labelElement);

  return labelContainer;
}
