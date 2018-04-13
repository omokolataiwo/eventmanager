import axios from 'axios';
import { API_PATH } from '../consts';
import {
  FETCHING_ADMIN_CENTERS,
  RECEIVED_ADMIN_CENTERS,
  FETCHING_ADMIN_CENTERS_ERROR
} from '../types';

const receivedAdminCenter = centers => ({
  type: RECEIVED_ADMIN_CENTERS,
  centers
});

const fetchingAdminCenters = () => ({
  type: FETCHING_ADMIN_CENTERS
});

const fetchingAdminCentersError = () => ({
  type: FETCHING_ADMIN_CENTERS_ERROR
});

export const fetchAdminCentersRequest = () => (dispatch, getState) => {
  dispatch(fetchingAdminCenters());
  axios.defaults.headers.common['x-access-token'] = getState().user.accessToken;
  axios
    .get(`${API_PATH}/centers/admin`)
    .then(response => {
      dispatch(receivedAdminCenter(response.data));
    })
    .catch(e => {
      dispatch(fetchingAdminCentersError(e));
    });
};

export default fetchAdminCentersRequest;
