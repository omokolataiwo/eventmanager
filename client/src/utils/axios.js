import axios from 'axios';

export const API_PATH =
  process.env.NODE_ENV === 'development' ?
    'http://localhost:5000/api/v2' :
    'https://eventmanng.herokuapp.com/api/v2';

const instance = axios.create({
  baseURL: API_PATH
});

export default instance;
