import instance from '../utils/axios';


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
export const createCenter = center => (dispatch, getState) => {
  instance.defaults.headers.common[
    'x-access-token'
  ] = getState().user.accessToken;

  if (center.newContact) {
    center.contact = center.contact.newContact;
  }

  return instance
    .post(`/centers`, center)
    .then(response => dispatch(createdNewCenter(response.data)))
    .catch(error => {
      dispatch(creatingNewCenterError(error.response.data.errors));
    });
};

/**
 * Make http request to cloudinary to upload image
 *
 * @param {object} centerDetails - center details
 * @returns {void}
 */
export const createCenterRequest = centerDetails => dispatch => {
  dispatch(creatingNewCenter());
  Reflect.deleteProperty(instance.defaults.headers.common, 'x-access-token');

  const formData = new FormData();
  formData.append('upload_preset', 'hgbxt9tc');
  formData.append('tags', 'eventman_client_upload');
  formData.append('file', centerDetails.image);
  const config = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  };

  return instance
    .post(
      'https://api.cloudinary.com/v1_1/omokolataiwo/image/upload',
      formData,
      config
    )
    .then(res => {
      centerDetails.image = res.data.url || 'default_center_image';
      return dispatch(createCenter(centerDetails));
    })
    .catch(event =>
      dispatch(creatingNewCenterError({
        image: [
          'Can not upload image to cloudinary at the moment. Please try again'
        ]
      })));
};

export default createCenterRequest;
