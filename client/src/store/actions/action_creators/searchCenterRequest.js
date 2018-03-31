import axios from 'axios';
import { API_PATH } from '../../consts';

export const searchCenterRequest = params => (dispatch) => {
  axios
    .get(`${API_PATH}/centers/search`, { params })
    .then((response) => {
      console.log(response);
    })
    .catch(e => console.dir(e));
};

export default searchCenterRequest;
