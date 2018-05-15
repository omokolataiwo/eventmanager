import axios from 'axios';
import {
  CREATED_EVENT,
  REQUEST_CREATE_EVENT,
  CREATE_EVENT_ERROR
} from '../types';
import { API_PATH } from '../consts';

/**
 * Action creator for receiving created event
 *
 * @param {object} event - received event
 * @return {object} - Action: CREATED_EVENT
 */
const createEvent = event => ({
  type: CREATED_EVENT,
  event
});

/**
 * Action creator for creating event errors
 *
 * @param {object} errors - Errors received from endpoint
 * @returns {object} Action: CREATE_EVENT_ERROR
 */
const createEventError = errors => ({
  type: CREATE_EVENT_ERROR,
  errors
});

/**
 * Make request to endpoint to created event
 *
 * @param {object} event - Event to be created
 * @returns {void}
 */
export const createEventRequest = event => (dispatch, getState) => {
  dispatch({
    type: REQUEST_CREATE_EVENT
  });
  axios.defaults.headers.common['x-access-token'] = getState().user.accessToken;
  axios
    .post(`${API_PATH}/events`, event)
    .then(response => {
      dispatch(createEvent(response.data));
    })
    .catch(errors => {
      dispatch(createEventError(errors.response.data.errors));
    });
};

export default createEventRequest;
