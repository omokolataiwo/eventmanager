import { combineReducers } from 'redux';
import user from './authentication';

const combinedReducer = combineReducers({
  user,
});
export default combinedReducer;
