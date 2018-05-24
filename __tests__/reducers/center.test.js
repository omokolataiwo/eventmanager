/* global describe it expect */
import center from '../../client/src/reducers/center';
import * as actionTypes from '../../client/src/types';
import { defaultCenter } from '../__mocks__/center';

describe('center reducer', () => {
  it('should return the initial state', () => {
    expect(center(undefined, {})).toEqual(defaultCenter);
  });

  it('should handle UPDATED_CENTER', () => {
    expect(center(defaultCenter, {
      type: actionTypes.UPDATED_CENTER
    })).toEqual({
      ...defaultCenter,
      action: {
        ...defaultCenter.action,
        updateCenter: actionTypes.UPDATED_CENTER
      }
    });
  });

  it('should handle UPDATING_CENTER_ERROR', () => {
    expect(center(defaultCenter, {
      type: actionTypes.UPDATING_CENTER_ERROR,
      errors: { center: ['Invalid Center ID'] }
    })).toEqual({
      ...defaultCenter,
      action: {
        ...defaultCenter.action,
        updateCenter: actionTypes.UPDATING_CENTER_ERROR
      },
      errors: { center: ['Invalid Center ID'] }
    });
  });

  it('should handle CREATED_NEW_CENTER', () => {
    expect(center(defaultCenter, {
      type: actionTypes.CREATED_NEW_CENTER
    })).toEqual({
      ...defaultCenter,
      action: {
        ...defaultCenter.action,
        createCenter: actionTypes.CREATED_NEW_CENTER
      }
    });
  });

  it('should handle CREATING_NEW_CENTER_ERROR', () => {
    expect(center(defaultCenter, {
      type: actionTypes.CREATING_NEW_CENTER_ERROR,
      errors: { center: ['Center already exist'] }
    })).toEqual({
      ...defaultCenter,
      action: {
        ...defaultCenter.action,
        createCenter: actionTypes.CREATING_NEW_CENTER_ERROR
      },
      errors: { center: ['Center already exist'] }
    });
  });
});
