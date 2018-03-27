import { REHYDRATE } from 'redux-persist';
import {
  FETCHING_CENTER_CONTACTS,
  RECEIVED_CENTER_CONTACTS,
  RECEIVED_CENTERS,
  FETCHING_CENTERS,
  FETCHING_CENTER,
  RECEIVED_CENTER,
} from '../actions/types';

const defaultCenter = {
  contacts: [],
  centers: [],
  center: {},
  events: {
    getCenterContact: FETCHING_CENTER_CONTACTS,
    getCenters: FETCHING_CENTERS,
    getCenter: FETCHING_CENTER,
  },
};

export default (state = defaultCenter, action) => {
  switch (action.type) {
    case FETCHING_CENTERS:
      return { ...state, events: { ...state.events, getCenters: action.type } };
    case RECEIVED_CENTER_CONTACTS:
      return Object.assign({}, state, {
        ...state,
        contacts: action.contacts,
        events: { ...state.events, getCenterContact: action.type },
      });
    case RECEIVED_CENTERS:
      return Object.assign({}, state, { ...state, centers: action.centers });
    case FETCHING_CENTER:
      return { ...state, center: {}, events: { ...state.events, getCenter: action.type } };
    case RECEIVED_CENTER:
      return {
        ...state,
        center: action.center,
        events: { ...state.events, getCenter: action.type },
      };
    default:
      return state;
  }
};
