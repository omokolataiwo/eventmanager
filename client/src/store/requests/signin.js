import axios from 'axios';
import { API_PATH } from '../consts';
import * as actions from '../actions';

import {log} from '../../components/ui/log';

axios.defaults.withCrendentials = true;

function signinUser(user) {
	return (dispatch) => {
		return axios
			.post(`${API_PATH}/users/login`, user)
			.then((response) => {
				dispatch(actions.signinUser(response.data));
			})
			.catch((e) => {
				if (!e.response || e.response.status >= 500) {
					console.error('Internal server error.');
					return;
				}
				dispatch(actions.signinError(e.response.data.errors));
				return;
			});
	}
}

export default signinUser;
