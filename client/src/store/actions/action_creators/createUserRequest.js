import axios from 'axios';
import { API_PATH } from '../consts';
import {REQUEST_SIGNUP_USER, SIGNUP_USER, SIGNUP_ERROR} from '../types';

const requestSignupUser = () => ({
    type: REQUEST_SIGNUP_USER,
});

const signupUser = user => ({
    type: SIGNUP_USER,
    userdata: user.payload,
});

const signupError = errors => ({
    type: SIGNUP_ERROR,
    errors,
});


const createUserRequest = (user) => {
  return (dispatch) => {
    dispatch(requestSignupUser(user));
    return axios
      .post(`${API_PATH}/users`, user)
      .then((response) => {
        dispatch(signupUser(response.data));
      })
      .catch((e) => {
        if (!e.response || (e.response.status < 400 && e.response.status >= 500)) {
          console.error('Internal server error.');
          return;
        }
        dispatch(signupError(e.response.data.errors));
      });
  };
}

export default createUserRequest;
