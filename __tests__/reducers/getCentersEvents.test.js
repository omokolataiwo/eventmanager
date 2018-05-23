/* global describe it expect */
import getCentersEvents from '../../client/src/reducers/getCentersEvents';
import * as actionTypes from '../../client/src/types';
import { events } from '../__mocks__/reducer/event';

const defaultCenterEvents = {
  centersEvents: [],
  count: 0,
  action: {
    getEvents: null
  }
};

describe('center reducer', () => {
  it('should return the initial state', () => {
    expect(getCentersEvents(undefined, {})).toEqual(defaultCenterEvents);
  });

  it('should handle FETCHING_CENTERS_EVENTS', () => {
    expect(getCentersEvents(defaultCenterEvents, {
      type: actionTypes.FETCHING_CENTERS_EVENTS
    })).toEqual({
      ...defaultCenterEvents,
      action: {
        ...defaultCenterEvents.action,
        getEvents: actionTypes.FETCHING_CENTERS_EVENTS
      }
    });
  });

  it('should handle RECEIVED_CENTERS_EVENTS', () => {
    expect(getCentersEvents(defaultCenterEvents, {
      type: actionTypes.RECEIVED_CENTERS_EVENTS,
      events
    })).toEqual({
      ...defaultCenterEvents,
      centersEvents: events,
      action: {
        ...defaultCenterEvents.action,
        getEvents: actionTypes.RECEIVED_CENTERS_EVENTS
      }
    });
  });
});
