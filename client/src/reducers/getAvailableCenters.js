import {
  RECEIVED_CENTERS,
  FETCHING_CENTERS,
  FETCHING_ADMIN_CENTERS,
  RECEIVED_ADMIN_CENTERS,
  FETCHING_ADMIN_CENTERS_ERROR
} from '../types';

const defaultCenter = {
  centers: [],
  errors: {},
  count: 0,
  action: {
    getCenters: FETCHING_CENTERS
  }
};

export default (state = defaultCenter, action) => {
  switch (action.type) {
  case FETCHING_CENTERS:
    return { ...state, action: { ...state.action, getCenters: action.type } };
  case RECEIVED_CENTERS:
    return {
      ...state,
      centers: action.centers,
      count: action.count,
      action: { getCenters: action.type }
    };
  case RECEIVED_ADMIN_CENTERS:
    return {
      ...state,
      centers: action.centers,
      count: action.count,
      action: { getCenters: action.type }
    };

  case FETCHING_ADMIN_CENTERS:
  case FETCHING_ADMIN_CENTERS_ERROR:
    return {
      ...state,
      action: { ...state.action, getCenters: action.type }
    };
  default:
    return state;
  }
};
