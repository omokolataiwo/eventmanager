import {
  FETCHING_CENTER,
  FETCHING_CENTER_ERROR,
  RECEIVED_CENTER,
  RESET_FETCHING_CENTER
} from '../types';

const defaultCenter = {
  center: {},
  errors: {},
  action: {
    getCenter: FETCHING_CENTER
  }
};

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
  default:
    return state;
  }
};
