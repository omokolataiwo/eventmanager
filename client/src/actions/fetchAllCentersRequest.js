import axios from 'axios';
import { API_PATH } from '../consts';
import { RECEIVED_CENTERS, FETCHING_CENTERS } from '../types';

const fetchAllCenter = centers => ({
  type: RECEIVED_CENTERS,
  centers
});

const fetchingCenters = () => ({
  type: FETCHING_CENTERS
});

export const fetchAllCentersRequest = accessToken => dispatch => {
  dispatch(fetchingCenters());
  axios
    .get(`${API_PATH}/centers`)
    .then(response => dispatch(fetchAllCenter(response.data)))
    .catch(e => console.dir(e));
};

export default fetchAllCentersRequest;
