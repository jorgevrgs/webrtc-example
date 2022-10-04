const initState = {
  identity: '',
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_IDENTITY':
      return {
        ...state,
        identity: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
