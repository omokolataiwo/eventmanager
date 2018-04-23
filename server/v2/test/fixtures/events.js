module.exports = {
  create: {
    validEvent: {
      title: 'Birthday Party',
      startDate: '2018-11-7',
      endDate: '2018-11-14',
      centerId: null
    },
    validEventBothOutLeft: {
      name: 'Birthday Party',
      startdate: '2017-12-3',
      enddate: '2017-12-5',
      centerid: null
    },
    validEventStartOut: {
      name: 'Birthday Party',
      startdate: '2017-12-3',
      enddate: '2017-12-8',
      centerid: null
    },
    validEventBothIn: {
      name: 'Birthday Party',
      startdate: '2017-12-8',
      enddate: '2017-12-10',
      centerid: null
    },
    validEventEndOut: {
      name: 'Birthday Party',
      startdate: '2017-12-8',
      enddate: '2017-12-16',
      centerid: null
    },
    validEventBothOutRight: {
      name: 'Birthday Party',
      startdate: '2017-12-15',
      enddate: '2017-12-20',
      centerid: null
    },
    validEventWithPassStartDate: {
      name: 'Birthday Party',
      startdate: '2017-1-28',
      enddate: '2017-12-30',
      centerid: null
    },
    validEventWithInvalidStartDate: {
      name: 'Birthday Party',
      startdate: '2017-12-12',
      enddate: '2017-11-12',
      centerid: null
    }
  },
  update: {
    validEventModified: {
      name: 'Wedding Aniversary',
      startdate: '2017-12-28',
      enddate: '2017-12-30',
      centerid: null
    }
  }
};
