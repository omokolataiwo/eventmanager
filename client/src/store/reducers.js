import { combineReducers } from 'redux';
import { REQUEST_SIGNUP_USER, SIGNUP_USER } from './consts';

function user(
  state = {
    user: {
      userdata: null,
      isSigningup: false,
    },
  },
  action,
) {
  switch (action.type) {
    case REQUEST_SIGNUP_USER:
      return Object.assign({}, state, { user: { ...state.user, isSigningup: true } });
    case SIGNUP_USER:
      return Object.assign({}, state, { user: action.user });
    default:
      return state;
  }
}

const combinedReducer = combineReducers({
  user,
});
export default combinedReducer;
