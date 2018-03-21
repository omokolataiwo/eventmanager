import axios from 'axios';
import { isTokenActive, tokenExpired, setHeader } from './auth';
import { API_PATH } from '../../consts';
import { FETCHING_EVENTS, RECEIVED_EVENTS, FETCHING_EVENTS_ERROR } from '../types';

const requestFetchUserEvent = () => ({ type: FETCHING_EVENTS });
const userEvents = events => ({ type: RECEIVED_EVENTS, events });
const fetchUserEventError = error => ({ type: FETCHING_EVENTS_ERROR, error });

export const fetchUserEventsRequest = accessToken => (dispatch) => {
  dispatch(requestFetchUserEvent);
  isTokenActive(accessToken)
    .then(() => {
      axios
        .get(`${API_PATH}/events`, setHeader(accessToken))
        .then((response) => {
          dispatch(userEvents(response.data));
        })
        .catch(e => dispatch(fetchUserEventError(e)));
    })
    .catch(() => dispatch(tokenExpired()));
};

export default fetchUserEventsRequest;
