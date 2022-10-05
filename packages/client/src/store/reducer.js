import Actions from './actions';

const initState = {
  identity: '',
  isRoomHost: false,
  connectOnlyWithAudio: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_IDENTITY':
      return {
        ...state,
        identity: action.payload,
      };
    case Actions.SET_IS_ROOM_HOST:
      return {
        ...state,
        isRoomHost: action.payload,
      };
    case Actions.SET_CONNECT_ONLY_WITH_AUDIO:
      return {
        ...state,
        connectOnlyWithAudio: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
