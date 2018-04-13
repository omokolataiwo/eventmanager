import axios from 'axios';
import { API_PATH } from '../consts';
import { UPDATING_USER, UPDATED_USER } from '../types';

const updatingUser = () => ({ type: UPDATING_USER });
const updatedUser = user => ({ type: UPDATED_USER, user });

export const updateUserRequest = user => dispatch => {
  dispatch(updatingUser());
  axios
    .put(`${API_PATH}/users/`, { user })
    .then(response => dispatch(updatedUser(response.data)))
    .catch(e => console.log(e));
};
export default updateUserRequest;
