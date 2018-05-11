import { combineReducers } from 'redux';
import user from './user';
import getAvailableCenters from './getAvailableCenters';
import getCenter from './getCenter';
import searchCenters from './searchCenters';
import getCentersEvents from './getCentersEvents';
import event from './event';
import getCenterContact from './getCenterContact';
import center from './center';

const combinedReducer = combineReducers({
  user,
  getAvailableCenters,
  getCenter,
  event,
  searchCenters,
  getCentersEvents,
  getCenterContact,
  center
});
/**
 * Sign out user
 *
 * @param {object} state Redux state
 * @param {any} action dispatched action
 * @returns {object} Reducers
 */
const rootReducer = (state, action) => {
  if (action.type === 'SIGNOUT_USER') {
    state = undefined;
  }

  return combinedReducer(state, action);
};
export default rootReducer;
