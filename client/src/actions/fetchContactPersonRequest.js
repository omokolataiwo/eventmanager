import axios from 'axios';
import { API_PATH } from '../consts';
import { RECEIVED_CENTER_CONTACTS } from '../types';

/**
 * Action for retrieving registered contacts
 *
 * @param {object} contacts - Center owner's contacts
 * @return {object} - action
 */
const centerContacts = contacts => ({
  type: RECEIVED_CENTER_CONTACTS,
  contacts
});

/**
 * Make http request to backend to get contacts
 *
 * @returns {void}
 */
const getContactPersonRequest = () => (dispatch, getState) => {
  axios.defaults.headers.common['x-access-token'] = getState().user.accessToken;
  axios
    .get(`${API_PATH}/centers/contacts`)
    .then(response => {
      dispatch(centerContacts(response.data));
    })
    .catch(error => {
      console.dir(error);
    });
};

export default getContactPersonRequest;
