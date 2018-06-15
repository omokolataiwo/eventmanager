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
  id: 1,
  eid: 1,
  title: 'Birthday Party',
  startDate: '2018-10-12',
  endDate: '2018-10-12'
};

export const eventWedding = {
  id: 2,
  eid: 2,
  title: 'Wedding Anniversary',
  startDate: '2018-10-12',
  endDate: '2018-10-12'
};

export const events = [eventBirthday, eventWedding];
