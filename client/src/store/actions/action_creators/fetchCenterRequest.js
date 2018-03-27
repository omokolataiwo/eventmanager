import axios from 'axios';
import { API_PATH } from '../../consts';
import { FETCHING_CENTER, RECEIVED_CENTER } from '../types';
import { tokenExpired } from './auth';

const recievedCenter = center => ({
  type: RECEIVED_CENTER,
  center,
});

const fetchingCenter = () => ({
  type: FETCHING_CENTER,
});

export const fetchCenterRequest = id => (dispatch) => {
  dispatch(fetchingCenter());
  axios
    .get(`${API_PATH}/centers/${id}`)
    .then((response) => {
      dispatch(recievedCenter(response.data));
    })
    .catch(e => console.log(e));
};

export default fetchCenterRequest;
