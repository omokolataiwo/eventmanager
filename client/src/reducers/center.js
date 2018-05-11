import {
  CREATING_NEW_CENTER,
  CREATING_NEW_CENTER_ERROR,
  CREATED_NEW_CENTER,
  UPDATING_CENTER,
  UPDATED_CENTER,
  UPDATING_CENTER_ERROR,
  RESET_UPDATING_CENTER_STATE
} from '../types';

const defaultCenter = {
  center: {},
  errors: {},
  action: {
    createCenter: CREATING_NEW_CENTER,
    updateCenter: UPDATING_CENTER
  }
};

export default (state = defaultCenter, action) => {
  switch (action.type) {
  case RESET_UPDATING_CENTER_STATE:
  case UPDATING_CENTER:
  case UPDATED_CENTER:
    return {
      ...state,
      action: { ...state.events, updateCenter: action.type }
    };

  case UPDATING_CENTER_ERROR:
    return {
      ...state,
      action: { ...state.events, updateCenter: action.type },
      errors: action.errors
    };

  case CREATING_NEW_CENTER:
  case CREATED_NEW_CENTER:
    return {
      ...state,
      action: { ...state.events, createCenter: action.type }
    };

  case CREATING_NEW_CENTER_ERROR:
    return {
      ...state,
      action: { ...state.events, createCenter: action.type },
      errors: action.errors
    };
  default:
    return state;
  }
};
