import axios from 'axios';
import { API_PATH } from '../../consts';
import { TOKEN_EXPIRED } from '../types';

export const setHeader = accessToken => ({
  headers: {
    'x-access-token': accessToken,
  },
});

export const tokenExpired = () => ({ type: TOKEN_EXPIRED });

export const isTokenActive = accessToken =>
  axios.post(`${API_PATH}/vtoken`, {}, setHeader(accessToken));
