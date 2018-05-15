import axios from 'axios';
import { API_PATH } from '../consts';

import {
  CREATED_NEW_CENTER,
  CREATING_NEW_CENTER_ERROR,
  CREATING_NEW_CENTER
} from '../types';

/**
 * Action for  pre center creation state
 *
 * @return {object} - action
 */
const creatingNewCenter = () => ({ type: CREATING_NEW_CENTER });
/**
 * Action for creating center
 *
 * @param {object} center - created center details
 * @return {object} - action
 */
const createdNewCenter = center => ({ type: CREATED_NEW_CENTER, center });

/**
 * create center error state
 *
 * @param {object} errors Center creation error
 * @return {object}  action [CREATING_NEW_CENTER_ERROR]
 */
const creatingNewCenterError = errors => ({
  type: CREATING_NEW_CENTER_ERROR,
  errors
});

/**
 * Make http request to backend to create center
 *
 * @param {object} center - center details
 * @returns {void}
 */
const createCenter = center => (dispatch, getState) => {
  axios.defaults.headers.common['x-access-token'] = getState().user.accessToken;

  if (center.newContact) {
    center.contact = center.contact.newContact;
  }

  axios
    .post(`${API_PATH}/centers`, center)
    .then(response => {
      dispatch(createdNewCenter(response.data));
    })
    .catch(error => {
      console.dir(error.response);
      if (!error.response || error.response.status >= 500) {
        console.error('Internal server error.');
        return;
      }
      dispatch(creatingNewCenterError(error.response.data.errors));
    });
};

/**
 * Make http request to cloudinary to upload image
 *
 * @param {object} centerDetails - center details
 * @returns {void}
 */
export default function createCenterRequest(centerDetails) {
  return dispatch => {
    dispatch(creatingNewCenter());
    Reflect.deleteProperty(axios.defaults.headers.common, 'x-access-token');
    const url = 'https://api.cloudinary.com/v1_1/omokolataiwo/image/upload';
    const { image } = centerDetails;
    if (!image || (image.type !== 'image/jpeg' && image.type !== 'image/png')) {
      return dispatch(creatingNewCenterError({
        image: ['Please upload a jpeg/png format image.']
      }));
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
        centerDetails.image = res.data.url;
        dispatch(createCenter(centerDetails));
      })
      .catch(event => {
        dispatch(creatingNewCenterError({
          image: [
            'Can not upload image to cloudinary at the moment. Please try again'
          ]
        }));
      });
  };
}
