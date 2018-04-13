import axios from 'axios';
import { API_PATH } from '../consts';
import {
  FETCHING_EVENTS,
  RECEIVED_EVENTS,
  FETCHING_EVENTS_ERROR
} from '../types';

const requestFetchUserEvent = () => ({ type: FETCHING_EVENTS });
const userEvents = events => ({ type: RECEIVED_EVENTS, events });
const fetchUserEventError = error => ({ type: FETCHING_EVENTS_ERROR, error });

export const fetchUserEventsRequest = accessToken => dispatch => {
  dispatch(requestFetchUserEvent);
  axios
    .get(`${API_PATH}/events`)
    .then(response => {
      dispatch(userEvents(response.data));
    })
    .catch(e => dispatch(fetchUserEventError(e)));
};

export default fetchUserEventsRequest;
