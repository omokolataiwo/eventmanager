import axios from 'axios';
import { API_PATH } from '../consts';
import { FETCHING_CENTERS_EVENTS, RECEIVED_CENTERS_EVENTS } from '../types';

const fetchingEvents = () => ({ type: FETCHING_CENTERS_EVENTS });

const recievedEvents = events => ({
  type: RECEIVED_CENTERS_EVENTS,
  events
});

export const fetchCenterEventRequest = () => (dispatch, getState) => {
  dispatch(fetchingEvents());
  axios.defaults.headers.common['x-access-token'] = getState().user.accessToken;
  axios
    .get(`${API_PATH}/centers/events`)
    .then(response => {
      dispatch(recievedEvents(response.data));
    })
    .catch(e => console.dir(e));
};
export default fetchCenterEventRequest;
