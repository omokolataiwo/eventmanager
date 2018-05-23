import {
  FETCHING_EVENTS,
  RECEIVED_EVENTS,
  FETCHING_EVENTS_ERROR,
  FETCHING_EVENT,
  RECEIVED_EVENT,
  FETCHING_EVENT_ERROR,
  CREATED_EVENT,
  REQUEST_CREATE_EVENT,
  CREATE_EVENT_ERROR,
  REQUEST_UPDATE_EVENT,
  UPDATED_EVENT,
  UPDATE_EVENT_ERROR,
  RESET_EVENT_STATE,
  RESET_UPDATE_EVENT_STATE,
  DELETE_EVENT_ERROR,
  DELETING_EVENT,
  DELETED_EVENT
} from '../types';

/**
 * Filter out removed event
 *
 * @param {int} id ID of event to be removed
 * @param {object} events User events
 * @returns {object} User events
 */
const removeEvent = (id, events) =>
  events.filter(event => parseInt(event.id, 10) !== id);

const defaultEvent = {
  events: [],
  actions: {
    getEvents: FETCHING_EVENTS,
    getEvent: FETCHING_EVENT,
    createUpdateEvent: null,
    cancel: DELETING_EVENT
  },
  errors: {}
};

export default (state = defaultEvent, action) => {
  switch (action.type) {
  case FETCHING_EVENTS:
    return {
      ...state,
      actions: { ...state.actions, getEvents: action.type }
    };
  case RECEIVED_EVENTS:
    return {
      ...state,
      events: action.events,
      count: action.count,
      actions: { ...state.actions, getEvents: action.type }
    };
  case FETCHING_EVENTS_ERROR:
    return {
      ...state,
      errors: action.errors,
      actions: { ...state.actions, getEvents: action.type }
    };

  case FETCHING_EVENT:
    return {
      ...state,
      actions: { ...state.actions, getEvent: action.type }
    };
  case RECEIVED_EVENT:
    return {
      ...state,
      event: action.event,
      actions: { ...state.actions, getEvent: action.type }
    };
  case FETCHING_EVENT_ERROR:
    return {
      ...state,
      errors: action.errors,
      actions: { ...state.actions, getEvent: action.type }
    };
  case REQUEST_CREATE_EVENT:
  case CREATED_EVENT:
  case RESET_EVENT_STATE:
    return {
      ...state,
      actions: { ...state.actions, createEvents: action.type },
      errors: {}
    };
  case CREATE_EVENT_ERROR:
    return {
      ...state,
      errors: action.errors,
      actions: { ...state.actions, createEvents: action.type }
    };
  case REQUEST_UPDATE_EVENT:
  case UPDATED_EVENT:
  case RESET_UPDATE_EVENT_STATE:
    return {
      ...state,
      actions: { ...state.actions, updateEvent: action.type },
      errors: {}
    };

  case UPDATE_EVENT_ERROR:
    return {
      ...state,
      errors: action.errors,
      actions: { ...state.actions, updateEvent: action.type }
    };
  case DELETE_EVENT_ERROR:
  case DELETING_EVENT:
    return {
      ...state,
      actions: { ...state.actions, cancel: action.type }
    };
  case DELETED_EVENT:
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
