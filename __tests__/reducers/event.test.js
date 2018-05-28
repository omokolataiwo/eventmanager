/* global describe it expect */
import event from '../../client/src/reducers/event';
import * as actionTypes from '../../client/src/types';
import { defaultEvent } from '../__mocks__/event';

describe('event reducer', () => {
  it('should return the initial state', () => {
    expect(event(undefined, {})).toEqual(defaultEvent);
  });

  it('should handle FETCHING_EVENTS', () => {
    expect(event(defaultEvent, {
      type: actionTypes.FETCHING_EVENTS
    })).toEqual({
      ...defaultEvent,
      actions: {
        ...defaultEvent.actions,
        getEvents: actionTypes.FETCHING_EVENTS
      }
    });
  });

  it('should handle RECEIVED_EVENTS', () => {
    expect(event(defaultEvent, {
      type: actionTypes.RECEIVED_EVENTS,
      events: [defaultEvent],
      count: 1
    })).toEqual({
      ...defaultEvent,
      events: [defaultEvent],
      count: 1,
      actions: {
        ...defaultEvent.actions,
        getEvents: actionTypes.RECEIVED_EVENTS
      }
    });
  });

  it('should handle FETCHING_EVENTS_ERROR', () => {
    expect(event(defaultEvent, {
      type: actionTypes.FETCHING_EVENTS_ERROR,
      errors: { auth: ['Authentication error.'] }
    })).toEqual({
      ...defaultEvent,
      errors: { auth: ['Authentication error.'] },
      actions: {
        ...defaultEvent.actions,
        getEvents: actionTypes.FETCHING_EVENTS_ERROR
      }
    });
  });

  it('should handle FETCHING_EVENT', () => {
    expect(event(defaultEvent, {
      type: actionTypes.FETCHING_EVENT
    })).toEqual({
      ...defaultEvent,
      actions: {
        ...defaultEvent.actions,
        getEvent: actionTypes.FETCHING_EVENT
      }
    });
  });

  it('should handle RECEIVED_EVENT', () => {
    expect(event(defaultEvent, {
      type: actionTypes.RECEIVED_EVENT,
      event: {
        title: 'Birthday Party',
        startDate: '2018-12-25',
        endDate: '2018-12-25'
      }
    })).toEqual({
      ...defaultEvent,
      event: {
        title: 'Birthday Party',
        startDate: '2018-12-25',
        endDate: '2018-12-25'
      },
      actions: {
        ...defaultEvent.actions,
        getEvent: actionTypes.RECEIVED_EVENT
      }
    });
  });

  it('should handle FETCHING_EVENT_ERROR', () => {
    expect(event(defaultEvent, {
      type: actionTypes.FETCHING_EVENT_ERROR,
      errors: { event: ['Invalid event id.'] }
    })).toEqual({
      ...defaultEvent,
      errors: { event: ['Invalid event id.'] },
      actions: {
        ...defaultEvent.actions,
        getEvent: actionTypes.FETCHING_EVENT_ERROR
      }
    });
  });

  it('should handle CREATED_EVENT', () => {
    expect(event(defaultEvent, {
      type: actionTypes.CREATED_EVENT
    })).toEqual({
      ...defaultEvent,
      actions: {
        ...defaultEvent.actions,
        createEvents: actionTypes.CREATED_EVENT
      }
    });
  });

  it('should handle CREATE_EVENT_ERROR', () => {
    expect(event(defaultEvent, {
      type: actionTypes.CREATE_EVENT_ERROR,
      errors: { startDate: ['Start Date can not be greater than end date.'] }
    })).toEqual({
      ...defaultEvent,
      errors: { startDate: ['Start Date can not be greater than end date.'] },
      actions: {
        ...defaultEvent.actions,
        createEvents: actionTypes.CREATE_EVENT_ERROR
      }
    });
  });

  it('should handle UPDATED_EVENT', () => {
    expect(event(defaultEvent, {
      type: actionTypes.UPDATED_EVENT
    })).toEqual({
      ...defaultEvent,
      actions: {
        ...defaultEvent.actions,
        updateEvent: actionTypes.UPDATED_EVENT
      }
    });
  });

  it('should handle UPDATE_EVENT_ERROR', () => {
    expect(event(defaultEvent, {
      type: actionTypes.UPDATE_EVENT_ERROR,
      errors: { startDate: ['Start Date can not be greater than end date.'] }
    })).toEqual({
      ...defaultEvent,
      errors: { startDate: ['Start Date can not be greater than end date.'] },
      actions: {
        ...defaultEvent.actions,
        updateEvent: actionTypes.UPDATE_EVENT_ERROR
      }
    });
  });

  it('should handle DELETING_EVENT', () => {
    expect(event(defaultEvent, {
      type: actionTypes.DELETING_EVENT
    })).toEqual({
      ...defaultEvent,
      actions: {
        ...defaultEvent.actions,
        cancel: actionTypes.DELETING_EVENT
      }
    });
  });

  it('should handle DELETED_EVENT', () => {
    expect(event(
      {
        ...defaultEvent,
        count: 1,
        events: [
          {
            id: 1,
            title: 'Birthday Party',
            startDate: '2018-11-30',
            endDate: '2018-11-30'
          }
        ]
      },
      {
        type: actionTypes.DELETED_EVENT,
        eventId: 1
      }
    )).toEqual({
      ...defaultEvent,
      events: [],
      count: 0,
      actions: {
        ...defaultEvent.actions,
        cancel: actionTypes.DELETED_EVENT
      }
    });
  });
});
