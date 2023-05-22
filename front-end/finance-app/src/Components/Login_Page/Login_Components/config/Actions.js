import axios from 'axios';

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      const token = response.data.token;
      dispatch(loginSuccess(token));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};
export const loginSuccess = (token) => {
  return {
    type: 'LOG_SUCCESS',
    payload: token,
  };
};
export const loginFailure = (error) => {
  return {
    type: 'LOG_FAILURE',
    payload: error,
  };
};

