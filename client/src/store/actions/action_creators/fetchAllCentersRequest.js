import axios from 'axios';
import { API_PATH } from '../../consts';
import { RECEIVED_CENTERS } from '../types';
import { isTokenActive, tokenExpired, setHeader } from './auth';

const fetchAllCenter = centers => ({
  type: RECEIVED_CENTERS,
  centers,
});

export const fetchAllCentersRequest = accessToken => (dispatch) => {
  isTokenActive(accessToken)
    .then(() => {
      axios
        .get(`${API_PATH}/centers`, setHeader(accessToken))
        .then(response => dispatch(fetchAllCenter(response.data)))
        .catch(e => console.log(e));
    })
    .catch(() => dispatch(tokenExpired()));
};

export default fetchAllCentersRequest;
