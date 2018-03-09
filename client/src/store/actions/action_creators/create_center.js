import axios from 'axios';
import { API_PATH } from '../../consts';
import { TOKEN_EXPIRED } from '../types';

const tokenExpire = () => ({ type: TOKEN_EXPIRED });

const createCenter = centerDetails => (dispatch) => {
  const config = {
    headers: {
      'x-access-token': centerDetails.access_token,
    },
  };
  axios
    .post(`${API_PATH}/vtoken`, {}, config)
    .then((res) => {
      axios
        .post(`${API_PATH}/centers`, centerDetails.center, config)
        .then((response) => {
          console.log(response, 'ttttttttttttt');
        })
        .catch(e => console.dir(e));
    })
    .catch((e) => {
      alert('lslkdsklsdkls');
      dispatch(tokenExpire());
    });
};

export default function createCenterRequest(centerDetails) {
  return (dispatch) => {
    const url = 'https://api.cloudinary.com/v1_1/omokolataiwo/image/upload';
    const { center: { image } } = centerDetails;
    if (!image || image.type !== 'image/jpeg') {
      console.log('Please upload a jpeg format image.');
      return;
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
