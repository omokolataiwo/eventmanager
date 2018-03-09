import axios from 'axios';
import { API_PATH } from '../consts';
import * as actions from '../actions';

function asyncSignupUser(user) {
  return (dispatch) => {
    dispatch(actions.requestSignupUser(user));
    return axios
      .post(`${API_PATH}/users`, user)
      .then((response) => {
        dispatch(actions.signupUser(response.data));
      })
      .catch((e) => {
        if (!e.response || (e.response.status < 400 && e.response.status >= 500)) {
          console.error('Internal server error.');
          return;
        }
        dispatch(actions.signupError(e.response.data.errors));
      });
  };
}

export default asyncSignupUser;
