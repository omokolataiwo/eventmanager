import axios from 'axios';
import { API_PATH } from '../consts';
import * as actions from '../actions';

function signinRequest(user) {
  return dispatch =>
    axios
      .post(`${API_PATH}/users/login`, user)
      .then((response) => {
        dispatch(actions.signinUser(response.data));
      })
      .catch((e) => {
        if (!e.response || e.response.status >= 500) {
          console.error('Internal server error.');
          return;
        }
        dispatch(actions.signinError(e.response.data.errors));
      });
}

export signinRequest;
