import axios from 'axios';
import { API_PATH } from '../consts';
import * as actions from '../actions';
import { log } from '../../components/ui/log'
axios.defaults.withCrendentials = true;

function asyncSignupUser(user) {
  return (dispatch) => {
    dispatch(actions.requestSignupUser(user));
    return axios
      .post(`${API_PATH}/users`, user)
      .then(response => {
				if (!response.data.status || !response.data.status.signup === undefined) {
					throw Error('Invalid response');
				}
				return response.data;
			})
      .then((userData) => {
				if (!userData.status.signup){
					dispatch(actions.signupError(userData))
				}
				return userData;
			})
			.then((userData) => {
				console.log(userData);
//				dispatch(actions.signupUser(userData))
			})
		  .catch((e) => {
				if (e.status < 400 && e.status >= 500) {
					console.error('Internal server error.');
				}
				alert(log(e.response.data))
			});
  };
}

export default asyncSignupUser;
