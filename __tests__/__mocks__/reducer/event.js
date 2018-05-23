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

export const event = {
  title: 'Birthday Party',
  startDate: '2018-10-12',
  endDate: '2018-10-12'
};

export const events = [event, event];
