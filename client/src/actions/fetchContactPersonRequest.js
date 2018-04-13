import axios from 'axios';
import { API_PATH } from '../consts';
import { RECEIVED_CENTER_CONTACTS } from '../types';

const centerContacts = contacts => ({
  type: RECEIVED_CENTER_CONTACTS,
  contacts
});

export const getContactPersonRequest = accessToken => dispatch => {
  axios
    .get(`${API_PATH}/centers/contacts`)
    .then(response => {
      dispatch(centerContacts(response.data));
    })
    .catch(error => {
      console.log(error);
    });
};

export default getContactPersonRequest;
