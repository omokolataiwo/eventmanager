import instance from '../utils/axios';
import {
  ADMIN_CANCEL_EVENT_ERROR,
  DELETING_EVENT,
  ADMIN_CANCEL_EVENT
} from '../types';

/**
 * Action to Cancel event
 *
 * @param {object} eventId  Event deleted
 * @return {object}  action [ADMIN_CANCEL_EVENT]
 */
const deletedEvent = eventId => ({
  type: ADMIN_CANCEL_EVENT,
  eventId
});

/**
 * Action for errors generated from backend
 *
 * @param {object} errors  Errors from backend
 * @return {object}  action [ADMIN_CANCEL_EVENT_ERROR]
 */
const deleteEventError = errors => ({
  type: ADMIN_CANCEL_EVENT_ERROR,
  errors
});

/**
 * Makes http request to backend to delete event
 *
 * @param {int} event id
 * @returns {void}
 */
export const adminCancelEventRequest = event => (dispatch, getState) => {
  dispatch({ type: DELETING_EVENT });
  instance.defaults.headers.common[
    'x-access-token'
  ] = getState().user.accessToken;

  return instance
    .delete(`/centers/event/${event}`)
    .then(response => {
      dispatch(deletedEvent(response.data.event.id));
    })
    .catch(error => {
      dispatch(deleteEventError(error.response.data.event.errors));
    });
};

export default adminCancelEventRequest;
