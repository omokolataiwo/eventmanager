import {
  FETCHING_CENTER_CONTACTS,
  RECEIVED_CENTER_CONTACTS,
  RECEIVED_CENTERS,
} from '../actions/types';

const defaultCenter = {
  contacts: [],
  centers: [],
  events: {
    getCenterContact: FETCHING_CENTER_CONTACTS,
  },
};

export default (state = defaultCenter, action) => {
  switch (action.type) {
    case RECEIVED_CENTER_CONTACTS:
      return Object.assign({}, state, {
        ...state,
        contacts: action.contacts,
        events: { ...state.events, getCenterContact: action.type },
      });
    case RECEIVED_CENTERS:
      return Object.assign({}, state, { ...state, centers: action.centers });
    default:
      return state;
  }
};
