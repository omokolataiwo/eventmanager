import instance from '../utils/axios';
import {
  UPDATED_EVENT,
  REQUEST_UPDATE_EVENT,
  UPDATE_EVENT_ERROR
} from '../types';

/**
 * Action creator for receiving updated event
 *
 * @param {object} event - received event
 * @return {object} - Action: UPDATED_EVENT
 */
const updateEvent = event => ({
  type: UPDATED_EVENT,
  event
});

/**
 * Action creator for updating event errors
 *
 * @param {object} errors - Errors received from endpoint
 * @returns {object} Action: UPDATE_EVENT_ERROR
 */
const updateEventError = errors => ({
  type: UPDATE_EVENT_ERROR,
  errors
});

/**
 * Make request to endpoint to created event
 *
 * @param {object} event - Event to be created
 * @returns {void}
 */
export const updateEventRequest = event => (dispatch, getState) => {
  dispatch({
    type: REQUEST_UPDATE_EVENT
  });
  instance.defaults.headers.common[
    'x-access-token'
  ] = getState().user.accessToken;

  const {
    title, startDate, endDate, centerId
  } = event;

  return instance
    .put(`/events/${event.id}`, {
      title,
      startDate,
      endDate,
      centerId
    })
    .then(response => {
      dispatch(updateEvent(response.data));
    })
    .catch(errors => {
      dispatch(updateEventError(errors.response.data.errors));
    });
};

export default updateEventRequest;
