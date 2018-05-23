/* global describe it expect */
import searchCenters from '../../client/src/reducers/searchCenters';
import * as actionTypes from '../../client/src/types';
import { centers } from '../__mocks__/reducer/center';

const defaultCenter = {
  searched: [],
  errors: {},
  count: 0,
  action: {
    searchCenter: 'SEARCHING_CENTER'
  }
};

describe('center reducer', () => {
  it('should return the initial state', () => {
    expect(searchCenters(undefined, {})).toEqual(defaultCenter);
  });

  it('should handle SEARCHING_CENTER', () => {
    expect(searchCenters(defaultCenter, {
      type: actionTypes.SEARCHING_CENTER
    })).toEqual({
      ...defaultCenter,
      action: {
        ...defaultCenter.action,
        searchCenter: actionTypes.SEARCHING_CENTER
      }
    });
  });

  it('should handle SEARCH_RESULT', () => {
    expect(searchCenters(defaultCenter, {
      type: actionTypes.SEARCH_RESULT,
      centers: { centers }
    })).toEqual({
      ...defaultCenter,
      searched: centers,
      count: centers.length,
      action: {
        ...defaultCenter.action,
        searchCenter: actionTypes.SEARCH_RESULT
      }
    });
  });
});
