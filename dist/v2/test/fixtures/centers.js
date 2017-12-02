'use strict';

module.exports = {
  create: {
    validCenter: {
      name: 'Louise Place',
      capacity: '3000',
      address: '18 Lune Way',
      state: '5',
      facilities: 'webcam',
      amount: '6000000',
      ownerid: 2
    },
    validCenterModified: {
      name: 'Louise Chamber',
      capacity: '150',
      address: '18 Lune Way',
      state: '5',
      facilities: 'webcam,swiming pool',
      amount: '299999',
      ownerid: 2
    },
    centerWithoutName: {
      name: '',
      capacity: '3000',
      address: '18 Lune Way',
      area: 'Kosofe',
      state: '5',
      facilities: 'webcam',
      amount: '6000000',
      summary: 'Some summary information'
    },
    noCapacity: {
      name: 'Louise Place',
      address: '18 Lune Way',
      area: 'Kosofe',
      state: '5',
      facilities: 'webcam',
      amount: '6000000',
      summary: 'Some summary information'
    },
    zeroCapacity: {
      name: 'Louise Place',
      capacity: '0',
      address: '18 Lune Way',
      area: 'Kosofe',
      state: '5',
      facilities: 'webcam',
      amount: '6000000',
      summary: 'Some summary information'
    },
    invalidCapacity: {
      name: '',
      capacity: '30a008',
      address: '18 Lune Way',
      area: 'Kosofe',
      state: '5',
      facilities: 'webcam',
      amount: '6000000',
      summary: 'Some summary information'
    },
    noAmount: {
      name: '',
      capacity: '30008',
      address: '18 Lune Way',
      area: 'Kosofe',
      state: '5',
      facilities: 'webcam',
      amount: '',
      summary: 'Some summary information'
    },
    invalidAmount: {
      name: '',
      capacity: '3000',
      address: '18 Lune Way',
      area: 'Kosofe',
      state: '5',
      facilities: 'webcam',
      amount: '60a000#00',
      summary: 'Some summary information'
    }
  }
};