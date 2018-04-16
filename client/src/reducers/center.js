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
  CREATED_NEW_CENTER
} from '../types';

const defaultCenter = {
  contacts: [],
  centers: [],
  eventCenter: [],
  center: {},
  errors: {},
  events: {
    getCenterContact: null,
    getCenters: null,
    getCenter: null,
    getEvents: null,
    createCenter: null
  }
};

export default (state = defaultCenter, action) => {
  switch (action.type) {
  case RECEIVED_CENTER_CONTACTS:
    return Object.assign({}, state, {
      ...state,
      contacts: action.contacts,
      events: { ...state.events, getCenterContact: action.type }
    });
  case CREATING_NEW_CENTER:
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
  case CREATED_NEW_CENTER:
    return {
      ...state,
      events: { ...state.events, createCenter: action.type },
      center: action.center
    };
  case FETCHING_CENTERS:
    return { ...state, events: { ...state.events, getCenters: action.type } };
  case RECEIVED_CENTERS:
    return Object.assign({}, state, { ...state, centers: action.centers });
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
