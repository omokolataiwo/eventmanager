/* global describe it expect */
import center from '../../client/src/reducers/getAvailableCenters';
import * as actionTypes from '../../client/src/types';
import { centers } from '../../__tests__/__mocks__/reducer/center';

const defaultCenter = {
  centers: [],
  errors: {},
  count: 0,
  action: {
    getCenters: 'FETCHING_CENTERS'
  }
};

describe('center reducer', () => {
  it('should return the initial state', () => {
    expect(center(undefined, {})).toEqual(defaultCenter);
  });

  it('should handle FETCHING_CENTERS', () => {
    expect(center(defaultCenter, {
      type: actionTypes.FETCHING_CENTERS
    })).toEqual({
      ...defaultCenter,
      action: {
        ...defaultCenter.action,
        getCenters: actionTypes.FETCHING_CENTERS
      }
    });
  });

  it('should handle RECEIVED_CENTERS', () => {
    expect(center(defaultCenter, {
      type: actionTypes.RECEIVED_CENTERS,
      centers,
      count: center.length
    })).toEqual({
      ...defaultCenter,
      centers,
      count: center.length,
      action: {
        ...defaultCenter.action,
        getCenters: actionTypes.RECEIVED_CENTERS
      }
    });
  });

  it('should handle RECEIVED_ADMIN_CENTERS', () => {
    expect(center(defaultCenter, {
      type: actionTypes.RECEIVED_ADMIN_CENTERS,
      centers,
      count: center.length
    })).toEqual({
      ...defaultCenter,
      centers,
      count: center.length,
      action: {
        ...defaultCenter.action,
        getCenters: actionTypes.RECEIVED_ADMIN_CENTERS
      }
    });
  });

  it('should handle FETCHING_ADMIN_CENTERS', () => {
    expect(center(defaultCenter, {
      type: actionTypes.FETCHING_ADMIN_CENTERS
    })).toEqual({
      ...defaultCenter,
      action: {
        ...defaultCenter.action,
        getCenters: actionTypes.FETCHING_ADMIN_CENTERS
      }
    });
  });
});
