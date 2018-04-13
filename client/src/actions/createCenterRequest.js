import axios from 'axios';
import { API_PATH } from '../consts';

import {
  CREATED_NEW_CENTER,
  CREATING_NEW_CENTER_ERROR,
  CREATING_NEW_CENTER
} from '../types';

const creatingNewCenter = () => ({ type: CREATING_NEW_CENTER });
const createdNewCenter = center => ({ type: CREATED_NEW_CENTER, center });
const creatingNewCenterError = error => ({
  type: CREATING_NEW_CENTER_ERROR,
  error
});

const createCenter = (center, accessToken) => dispatch => {
  axios
    .post(`${API_PATH}/centers`, center)
    .then(response => {
      dispatch(createdNewCenter(response.data));
    })
    .catch(e => dispatch(creatingNewCenterError(e.response.data)));
};

export default function createCenterRequest(centerDetails) {
  return dispatch => {
    dispatch(creatingNewCenter());
    // TODO: FOR DEVELOPMENT PURPOSE
    let center = Object.assign({}, centerDetails.center);
    center = { ...center, contact: { ...center.contact.newContact } };
    center.image = 'SAMPLE_IMAGE.JPG';
    dispatch(createCenter(center, centerDetails.accessToken));
    return;

    // REMOVE: FOR DEVELOPMENT PURPOSE, move merge modification
    const url = 'https://api.cloudinary.com/v1_1/omokolataiwo/image/upload';
    const { center: { image } } = centerDetails;
    if (!image || image.type !== 'image/jpeg') {
      console.log('Please upload a jpeg format image.');
    }
    const formData = new FormData();
    formData.append('upload_preset', 'hgbxt9tc');
    formData.append('tags', 'eventman_client_upload');
    formData.append('file', image);
    const config = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    axios
      .post(url, formData, config)
      .then(res => {
        const state = centerDetails;
        state.center.image = res.data.url;
        dispatch(createCenter(state));
      })
      .catch(e => {
        console.log(e); // TODO: VALIDATION FOR CREATE CENTER
      });
  };
}
