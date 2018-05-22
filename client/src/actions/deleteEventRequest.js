import instance from '../utils/axios';
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
 * @param {int} event id
 * @returns {void}
 */
export const deleteEventRequest = event => (dispatch, getState) => {
  dispatch({ type: DELETING_EVENT });
  instance.defaults.headers.common[
    'x-access-token'
  ] = getState().user.accessToken;

  return instance
    .delete(`/events/${event}`)
    .then(response => {
      dispatch(deletedEvent(response.data.event.id));
    })
    .catch(error => {
      dispatch(deleteEventError(error.response.data.event.errors));
    });
};

export default deleteEventRequest;
