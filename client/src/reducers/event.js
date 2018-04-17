import {
  FETCHING_EVENTS,
  RECEIVED_EVENTS,
  FETCHING_EVENTS_ERROR,
  CREATED_EVENT,
  REQUEST_CREATE_EVENT,
  CREATE_EVENT_ERROR
} from '../types';

const defaultEvent = {
  events: [],
  actions: {
    getEvents: FETCHING_EVENTS,
    createEvents: null
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
      actions: { ...state.actions, getEvents: action.type }
    };
  case FETCHING_EVENTS_ERROR:
    return {
      ...state,
      actions: { ...state.actions, getEvents: action.type }
    };
  case REQUEST_CREATE_EVENT:
    return {
      ...state,
      actions: { ...state.actions, createEvents: action.type }
    };
  case CREATED_EVENT:
    return {
      ...state,
      events: action.event,
      actions: { ...state.actions, createEvents: action.type }
    };
  case CREATE_EVENT_ERROR:
    return {
      ...state,
      errors: action.errors,
      actions: { ...state.actions, createEvents: action.type }
    };
  default:
    return state;
  }
};
