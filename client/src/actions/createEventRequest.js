import axios from 'axios';
import {
  CREATED_EVENT,
  REQUEST_CREATE_EVENT,
  CREATE_EVENT_ERROR
} from '../types';
import { API_PATH } from '../consts';

const createEvent = event => ({
  type: CREATED_EVENT,
  event
});
const requestCreateEvent = () => ({
  type: REQUEST_CREATE_EVENT
});
const createEventError = errors => ({
  type: CREATE_EVENT_ERROR,
  errors
});

export const createEventRequest = (event, accessToken) => dispatch => {
  dispatch(requestCreateEvent());

  axios
    .post(`${API_PATH}/events`, event)
    .then(response => {
      dispatch(createEvent(response.data));
    })
    .catch(e => {
      dispatch(createEventError(e));
    });
};

export default createEventRequest;
