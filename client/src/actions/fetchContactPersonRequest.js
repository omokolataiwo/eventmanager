import instance from '../utils/axios';
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
export const getContactPersonRequest = () => (dispatch, getState) => {
  instance.defaults.headers.common[
    'x-access-token'
  ] = getState().user.accessToken;
  return instance
    .get(`/centers/contacts`)
    .then(response => {
      dispatch(centerContacts(response.data.contacts));
    })
    .catch(error => {
      dispatch({ type: 'FETCHING_CONTACT_ERROR' });
    });
};

export default getContactPersonRequest;
