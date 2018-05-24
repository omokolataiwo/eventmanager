import React from 'react';
import { shallow } from 'enzyme';
import { Bookings } from '../../../client/src/components/admin/Bookings';
import { events } from '../../__mocks__/event';

const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  fetchCenterEventRequest: jest.fn(() => {}),
  centersEvents: events,
  action: {
    getEvents: 'FETCHING_EVENTS_REQUEST'
  }
};

const wrapper = shallow(<Bookings {...props} />);

describe('Bookings Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
