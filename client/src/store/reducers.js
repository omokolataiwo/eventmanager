import { combineReducers } from 'redux';
import {
  REQUEST_SIGNUP_USER,
  SIGNUP_USER,
  ACCOUNT_TYPE_GUEST,
  SIGNOUT_USER,
} from './consts';

import {log} from '../components/ui/log';

const defaultUser = {
    userdata: null,
		accountType: ACCOUNT_TYPE_GUEST,
    events: {
			isSigningout: false,
			isSignedout: false,
			isSigningup: false,
			isSignedup: false,
			isSigningin: false,
			isSignedin: false,
		}
};

function user(state = defaultUser,  action) {
	switch (action.type) {
  case REQUEST_SIGNUP_USER:
    return Object.assign({}, state, {
				...state,
				events: { ...state.events, isSigningup: true }
		});
    case SIGNUP_USER:
    return Object.assign({}, state, {
				userdata: action.userdata,
				accountType: action.accountType,
				events: {
					...defaultUser.events,
					isSignedup: true
				}
		});
	case SIGNOUT_USER:
		console.log('Something has raise signout user');
		  return defaultUser;
    default:
      return state;
  }
}

const combinedReducer = combineReducers({
  user,
});
export default combinedReducer;
