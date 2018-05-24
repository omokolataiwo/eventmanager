import { center } from './center';

export const defaultEvent = {
  events: [],
  actions: {
    getEvents: 'FETCHING_EVENTS',
    getEvent: 'FETCHING_EVENT',
    createUpdateEvent: null,
    cancel: 'DELETING_EVENT'
  },
  errors: {}
};

export const eventBirthday = {
  title: 'Birthday Party',
  startDate: '2018-10-12',
  endDate: '2018-10-12',
  center: { ...center }
};

export const eventWedding = {
  title: 'Wedding Anniversary',
  startDate: '2018-10-12',
  endDate: '2018-10-12',
  center: { ...center }
};

export const events = [eventBirthday, eventWedding];
