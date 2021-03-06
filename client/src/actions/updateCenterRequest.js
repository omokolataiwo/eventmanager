import instance from '../utils/axios';
import { API_PATH } from '../consts';

import {
  UPDATED_CENTER,
  UPDATING_CENTER,
  UPDATING_CENTER_ERROR
} from '../types';

/**
 * Action for updating center
 *
 * @param {object} center - created center details
 * @return {object} - action [UPDATED_CENTER]
 */
const updatedCenter = center => ({ type: UPDATED_CENTER, center });

/**
 * create center error state
 *
 * @param {object} errors Center creation error
 * @return {object}  action [UPDATING_CENTER_ERROR]
 */
const updatingCenterError = errors => ({
  type: UPDATING_CENTER_ERROR,
  errors
});

/**
 * Make http request to backend to create center
 *
 * @param {object} center - center details
 * @returns {void}
 */
const updateCenter = center => (dispatch, getState) => {
  instance.defaults.headers.common[
    'x-access-token'
  ] = getState().user.accessToken;

  return instance
    .put(`/centers/${center.id}`, center)
    .then(response => {
      dispatch(updatedCenter(response.data));
    })
    .catch(error => {
      dispatch(updatingCenterError(error.response.data.errors));
    });
};

/**
 * Make http request to cloudinary to upload image
 *
 * @param {object} centerDetails - center details
 * @returns {void}
 */
export const updateCenterRequest = centerDetails => dispatch => {
  dispatch({ type: UPDATING_CENTER });
  const { image } = centerDetails;
  // If owner is not changing image ignore cloudinary upload

  if (!image || (image.type !== 'image/jpeg' && image.type !== 'image/png')) {
    Reflect.deleteProperty(centerDetails, 'image');
    return dispatch(updateCenter({
      ...centerDetails,
      contact: centerDetails.contact.newContact,
      events: null
    }));
  }

  Reflect.deleteProperty(instance.defaults.headers.common, 'x-access-token');
  const url = 'https://api.cloudinary.com/v1_1/omokolataiwo/image/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'hgbxt9tc');
  formData.append('tags', 'eventman_client_upload');
  formData.append('file', image);
  const config = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  };

  return instance
    .post(url, formData, config)
    .then(res => {
      centerDetails.image = res.data.url;
      return dispatch(updateCenter({
        ...centerDetails,
        contact: centerDetails.contact.newContact,
        events: null
      }));
    })
    .catch(event => {
      dispatch(updatingCenterError({
        image: [
          'Can not upload image to cloudinary at the moment. Please try again'
        ]
      }));
    });
};

export default updateCenterRequest;
