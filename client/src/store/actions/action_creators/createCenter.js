import axios from 'axios';
import { API_PATH } from '../../consts';
import { setHeader, tokenExpired, isTokenActive } from './auth';

const createCenter = (center, accessToken) => (dispatch) => {
  isTokenActive(accessToken)
    .then(() => {
      axios
        .post(`${API_PATH}/centers`, center, setHeader(accessToken))
        .then((response) => {
          console.log(response, 'ttttttttttttt');
        })
        .catch(e => console.log(e));
    })
    .catch((e) => {
      // TODO Check if tokenExpires
      dispatch(tokenExpired());
    });
};

export default function createCenterRequest(centerDetails) {
  return (dispatch) => {
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
        'X-Requested-With': 'XMLHttpRequest',
      },
    };

    axios
      .post(url, formData, config)
      .then((res) => {
        const state = centerDetails;
        state.center.image = res.data.url;
        dispatch(createCenter(state));
      })
      .catch((e) => {
        console.log(e); // TODO: VALIDATION FOR CREATE CENTER
      });
  };
}
