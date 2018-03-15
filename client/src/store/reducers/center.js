import { FETCHING_CENTER_CONTACTS, RECIEVED_CENTER_CONTACTS } from '../actions/types';

const defaultCenter = {
  contacts: [],
  events: {
    getCenterContact: FETCHING_CENTER_CONTACTS,
  },
};

export default (state = defaultCenter, action) => {
  switch (action.type) {
    case RECIEVED_CENTER_CONTACTS:
      return Object.assign({}, state, {
        ...state,
        contacts: action.contacts,
        events: { ...state.events, getCenterContact: action.type },
      });
    default:
      return state;
  }
};
