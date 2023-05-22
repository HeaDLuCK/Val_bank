const initialState = {
    token: null,
    error: null,
};
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOG_SUCCESS':
        return {
          ...state,
          token: action.payload,
          error: null,
        };
      case 'LOG_FAILURE':
        return {
          ...state,
          token: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;