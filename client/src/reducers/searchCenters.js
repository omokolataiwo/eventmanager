import { SEARCH_RESULT, SEARCHING_CENTER } from '../types';

const defaultCenter = {
  searched: [],
  errors: {},
  count: 0,
  action: {
    searchCenter: SEARCHING_CENTER
  }
};

export default (state = defaultCenter, action) => {
  switch (action.type) {
  case SEARCHING_CENTER:
    return {
      ...state,
      action: { ...state.action, searchCenter: action.type }
    };
  case SEARCH_RESULT:
    return {
      ...state,
      searched: action.centers.centers,
      count: action.centers.centers.length,
      action: { ...state.action, searchCenter: action.type }
    };
  default:
    return state;
  }
};
