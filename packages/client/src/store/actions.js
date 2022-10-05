const Actions = {
  SET_IS_ROOM_HOST: 'SET_IS_ROOM_HOST',
  SET_CONNECT_ONLY_WITH_AUDIO: 'SET_CONNECT_ONLY_WITH_AUDIO',
};

/**
 *
 * @param {boolean} isRoomHost
 * @returns
 */
export const setIsRoomHost = (isRoomHost) => ({
  type: Actions.SET_IS_ROOM_HOST,
  payload: isRoomHost,
});

/**
 *
 * @param {boolean} isConnectedOnlyWithAudio
 * @returns
 */
export const setConnectOnlyWithAudio = (isConnectedOnlyWithAudio) => ({
  type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
  payload: isConnectedOnlyWithAudio,
});

export default Actions;
