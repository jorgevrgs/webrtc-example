import Actions from './actions';

const initState = {
  identity: '',
  isRoomHost: false,
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
    default:
      return state;
  }
};

export default reducer;
