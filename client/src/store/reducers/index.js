import { combineReducers } from 'redux';
import user from './authentication';
import center from './center';

const combinedReducer = combineReducers({
  user,
  center,
});
export default combinedReducer;
