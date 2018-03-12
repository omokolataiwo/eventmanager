import { combineReducers } from 'redux';
import user from './reducers/authentication';

const combinedReducer = combineReducers({
  user,
});
export default combinedReducer;
