import React from 'react';
import { shallow } from 'enzyme';
import { Index } from '../../../client/src/components/admin/Index';
import { events } from '../../__mocks__/event';

const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  fetchCenterEventRequest: jest.fn(() => {}),
  events,
  action: {
    getEvents: 'FETCHING_EVENTS_REQUEST'
  }
};

const wrapper = shallow(<Index {...props} />);

describe('Index Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
