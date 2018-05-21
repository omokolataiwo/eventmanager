import axios from 'axios';
import { API_PATH } from '../consts';
import { DELETE_EVENT_ERROR, DELETING_EVENT, DELETED_EVENT } from '../types';

/**
 * Action to delete
 *
 * @param {object} eventId  Delete
 * @return {object}  action
 */
const deletedEvent = eventId => ({
  type: DELETED_EVENT,
  eventId
});

/**
 * Action for errors generated from backend
 *
 * @param {object} errors  Errors from backend
 * @return {object}  action
 */
const deleteEventError = errors => ({
  type: DELETE_EVENT_ERROR,
  errors
});

/**
 * Makes http request to backend to delete event
 *
 * @returns {void}
 */
const deleteEventRequest = event => (dispatch, getState) => {
  dispatch({ type: DELETING_EVENT });
  axios.defaults.headers.common['x-access-token'] = getState().user.accessToken;

  axios
    .delete(`${API_PATH}/events/${event}`)
    .then(response => {
      dispatch(deletedEvent(response.data.event.id));
    })
    .catch(error => {
      if (!error.response || error.response.status >= 500) {
        console.error('Internal server error.');
        return;
      }
      dispatch(deleteEventError(error.response.data.event.errors));
    });
};

export default deleteEventRequest;
