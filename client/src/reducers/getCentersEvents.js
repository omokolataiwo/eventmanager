import {
  FETCHING_CENTERS_EVENTS,
  RECEIVED_CENTERS_EVENTS,
  FETCHING_CENTERS_EVENTS_ERRORS
} from '../types';

const defaultCenterEvents = {
  centersEvents: [],
  count: 0,
  action: {
    getEvents: null
  }
};

export default (state = defaultCenterEvents, action) => {
  switch (action.type) {
  case FETCHING_CENTERS_EVENTS_ERRORS:
  case FETCHING_CENTERS_EVENTS:
    return { ...state, action: { ...state.action, getEvents: action.type } };
  case RECEIVED_CENTERS_EVENTS:
    return {
      ...state,
      centersEvents: action.events,
      action: { ...state.action, getEvents: action.type }
    };
  default:
    return state;
  }
};
