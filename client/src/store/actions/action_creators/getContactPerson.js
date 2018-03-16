import axios from 'axios';
import { API_PATH } from '../../consts';
import { setHeader, tokenExpired, isTokenActive } from './auth';
import { RECEIVED_CENTER_CONTACTS } from '../types';

const centerContacts = contacts => ({
  type: RECEIVED_CENTER_CONTACTS,
  contacts,
});

export const getContactPersonRequest = accessToken => (dispatch) => {
  isTokenActive(accessToken)
    .then(() => {
      axios
        .get(`${API_PATH}/centers/contacts`, setHeader(accessToken))
        .then((response) => {
          dispatch(centerContacts(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch(e => dispatch(tokenExpired()));
};
export default getContactPersonRequest;
