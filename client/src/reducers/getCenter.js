import {
  FETCHING_CENTER,
  FETCHING_CENTER_ERROR,
  RECEIVED_CENTER,
  RECEIVED_ADMIN_CENTER,
  ADMIN_CANCEL_EVENT,
  RESET_FETCHING_CENTER
} from '../types';

const defaultCenter = {
  center: {},
  events: [],
  errors: {},
  action: {
    getCenter: FETCHING_CENTER
  }
};
/**
 * Filter out removed event
 *
 * @param {int} id ID of event to be removed
 * @param {object} events User events
 * @returns {object} User events
 */
const removeEvent = (id, events) =>
  events.filter(event => parseInt(event.id, 10) !== id);

export default (state = defaultCenter, action) => {
  switch (action.type) {
  case RESET_FETCHING_CENTER:
  case FETCHING_CENTER:
    return {
      ...state,
      action: { ...state.action, getCenter: action.type }
    };
  case FETCHING_CENTER_ERROR:
    return {
      ...state,
      action: { ...state.action, getCenter: action.type },
      errors: action.errors
    };
  case RECEIVED_CENTER:
    return {
      ...state,
      center: action.center,
      action: { ...state.action, getCenter: action.type }
    };
  case RECEIVED_ADMIN_CENTER:
    return {
      ...state,
      center: action.center,
      events: action.events,
      count: parseInt(action.count, 10),
      action: { ...state.action, getCenter: action.type }
    };
  case ADMIN_CANCEL_EVENT:
    return {
      ...state,
      events: removeEvent(action.eventId, state.events),
      count: state.count - 1,
      actions: { ...state.actions, cancel: action.type }
    };
  default:
    return state;
  }
};
