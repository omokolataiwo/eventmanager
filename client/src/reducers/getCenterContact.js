import {
  RECEIVED_CENTER_CONTACTS,
  FETCHING_CENTER_CONTACTS,
  RESET_FETCHING_CENTER_CONTACTS
} from '../types';

const defaultContacts = {
  contacts: [],
  action: {
    getCenterContact: null
  }
};

export default (state = defaultContacts, action) => {
  switch (action.type) {
  case RESET_FETCHING_CENTER_CONTACTS:
  case FETCHING_CENTER_CONTACTS:
    return {
      ...state,
      action: { ...state.action, getCenterContact: action.type }
    };
  case RECEIVED_CENTER_CONTACTS:
    return {
      ...state,
      contacts: action.contacts,
      action: { ...state.action, getCenterContact: action.type }
    };
  default:
    return state;
  }
};
