const Actions = {
  SET_IS_ROOM_HOST: 'SET_IS_ROOM_HOST',
  SET_CONNECT_ONLY_WITH_AUDIO: 'SET_CONNECT_ONLY_WITH_AUDIO',
  SET_IDENTITY: 'SET_IDENTITY',
  SET_ROOM_ID: 'SET_ROOM_ID',
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

export const setIdentity = (identity) => ({
  type: Actions.SET_IDENTITY,
  payload: identity,
});

export const setRoomId = (roomId) => ({
  type: Actions.SET_ROOM_ID,
  payload: roomId,
});

export default Actions;
