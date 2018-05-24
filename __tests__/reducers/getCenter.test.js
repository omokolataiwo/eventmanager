/* global describe it expect */
import getCenter from '../../client/src/reducers/getCenter';
import * as actionTypes from '../../client/src/types';
import { center } from '../__mocks__/center';

const defaultCenter = {
  center: {},
  errors: {},
  action: {
    getCenter: 'FETCHING_CENTER'
  }
};

describe('center reducer', () => {
  it('should return the initial state', () => {
    expect(getCenter(undefined, {})).toEqual(defaultCenter);
  });

  it('should handle FETCHING_CENTER', () => {
    expect(getCenter(defaultCenter, {
      type: actionTypes.FETCHING_CENTER
    })).toEqual({
      ...defaultCenter,
      action: {
        ...defaultCenter.action,
        getCenter: actionTypes.FETCHING_CENTER
      }
    });
  });

  it('should handle RECEIVED_CENTER', () => {
    expect(getCenter(defaultCenter, {
      type: actionTypes.RECEIVED_CENTER,
      center
    })).toEqual({
      ...defaultCenter,
      center,
      action: {
        ...defaultCenter.action,
        getCenter: actionTypes.RECEIVED_CENTER
      }
    });
  });

  it('should handle FETCHING_CENTER_ERROR', () => {
    expect(getCenter(defaultCenter, {
      type: actionTypes.FETCHING_CENTER_ERROR,
      errors: [{ center: ['Invalid center ID'] }]
    })).toEqual({
      ...defaultCenter,
      errors: [{ center: ['Invalid center ID'] }],
      action: {
        ...defaultCenter.action,
        getCenter: actionTypes.FETCHING_CENTER_ERROR
      }
    });
  });
});
