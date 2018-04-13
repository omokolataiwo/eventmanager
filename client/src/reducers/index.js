import { combineReducers } from 'redux';
import user from './user';
import center from './center';
import event from './event';

const combinedReducer = combineReducers({
  user,
  center,
  event
});
export default combinedReducer;
