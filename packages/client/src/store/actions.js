const Actions = {
  SET_IS_ROOM_HOST: 'SET_IS_ROOM_HOST',
};

export const setIsRoomHost = (isRoomHost) => ({
  type: Actions.SET_IS_ROOM_HOST,
  payload: isRoomHost,
});

export default Actions;
