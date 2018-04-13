import axios from 'axios';

axios.defaults.withCredentials = false;
const API_PATH = 'http://localhost:5000/api/v2';
export default API_PATH;
