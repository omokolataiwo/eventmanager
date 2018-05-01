import {
  RECEIVED_CENTER_CONTACTS,
  RECEIVED_CENTERS,
  FETCHING_CENTERS,
  FETCHING_CENTER,
  FETCHING_CENTER_ERROR,
  RECEIVED_CENTER,
  FETCHING_CENTERS_EVENTS,
  RECEIVED_CENTERS_EVENTS,
  FETCHING_ADMIN_CENTERS,
  RECEIVED_ADMIN_CENTERS,
  FETCHING_ADMIN_CENTERS_ERROR,
  CREATING_NEW_CENTER,
  CREATING_NEW_CENTER_ERROR,
  CREATED_NEW_CENTER,
  RESET_CENTER_CREATION_STATE,
  UPDATING_CENTER,
  UPDATED_CENTER,
  RESET_UPDATING_CENTER_STATE,
  UPDATING_CENTER_ERROR
} from '../types';

const defaultCenter = {
  contacts: [],
  centers: [],
  eventCenter: [],
  center: {},
  errors: {},
  count: 0,
  events: {
    getCenterContact: null,
    getCenters: null,
    getCenter: null,
    getEvents: null,
    createCenter: null,
    updateCenter: null
  }
};

export default (state = defaultCenter, action) => {
  switch (action.type) {
  case UPDATING_CENTER:
  case UPDATED_CENTER:
  case RESET_UPDATING_CENTER_STATE:
    return {
      ...state,
      events: { ...state.events, updateCenter: action.type }
    };

  case UPDATING_CENTER_ERROR:
    return {
      ...state,
      events: { ...state.events, updateCenter: action.type },
      errors: action.errors
    };

  case RECEIVED_CENTER_CONTACTS:
    return Object.assign({}, state, {
      ...state,
      contacts: action.contacts,
      events: { ...state.events, getCenterContact: action.type }
    });
  case CREATING_NEW_CENTER:
  case CREATED_NEW_CENTER:
  case RESET_CENTER_CREATION_STATE:
    return {
      ...state,
      events: { ...state.events, createCenter: action.type }
    };

  case CREATING_NEW_CENTER_ERROR:
    return {
      ...state,
      events: { ...state.events, createCenter: action.type },
      errors: action.errors
    };
  case FETCHING_CENTERS:
    return { ...state, events: { ...state.events, getCenters: action.type } };
  case RECEIVED_CENTERS:
    return { ...state, centers: action.centers, count: action.count };
  case FETCHING_CENTER:
    return {
      ...state,
      events: { ...state.events, getCenter: action.type }
    };
  case FETCHING_CENTER_ERROR:
    return {
      ...state,
      events: { ...state.events, getCenter: action.type },
      errors: action.errors
    };
  case RECEIVED_CENTER:
    return {
      ...state,
      center: action.center,
      events: { ...state.events, getCenter: action.type }
    };
  case FETCHING_CENTERS_EVENTS:
    return { ...state, events: { ...state.events, getEvents: action.type } };
  case RECEIVED_CENTERS_EVENTS:
    return {
      ...state,
      eventCenter: action.events,
      events: { ...state.events, getEvents: action.type }
    };
  case RECEIVED_ADMIN_CENTERS:
    return {
      ...state,
      adminCenters: action.centers,
      events: { ...state.events, getCenters: action.type }
    };

  case FETCHING_ADMIN_CENTERS:
  case FETCHING_ADMIN_CENTERS_ERROR:
    return {
      ...state,
      events: { ...state.events, getCenters: action.type }
    };
  default:
    return state;
  }
};
