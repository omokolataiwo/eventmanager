import axios from 'axios';
import { API_PATH } from '../consts';
import { FETCHING_CENTERS_EVENTS, RECEIVED_CENTERS_EVENTS } from '../types';

/**
 * Action for received events
 *
 * @param {object} events - events booked for admin centers
 * @return {object} Action: RECEIVED_CENTERS_EVENTS
 */
const recievedEvents = events => ({
  type: RECEIVED_CENTERS_EVENTS,
  events: events.data
});

/**
 * Actions creator for fetching admin events
 *
 * @returns {void}
 */
const fetchCenterEventRequest = () => (dispatch, getState) => {
  dispatch({ type: FETCHING_CENTERS_EVENTS });
  axios.defaults.headers.common['x-access-token'] = getState().user.accessToken;
  axios
    .get(`${API_PATH}/centers/events`)
    .then(response => {
      dispatch(recievedEvents(response.data));
    })
    .catch(e => console.dir(e));
};
export default fetchCenterEventRequest;
