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
    getEvents: 'FETCHING_CENTERS_EVENTS'
  }
};

const wrapper = shallow(<Index {...props} />);

describe('Index Component', () => {
  it('Render preloader', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('Render no event exist for admin record', () => {
    wrapper.setProps({
      ...props,
      action: { getEvents: 'FETCHING_CENTERS_EVENTS_ERRORS' }
    });
    expect(wrapper.find('.no-event-admin').exists()).toBe(true);
  });
  it('Render events', () => {
    wrapper.setProps({
      ...props,
      action: { getEvents: 'RECEIVED_CENTERS_EVENTS' }
    });
    expect(wrapper.find('h5').text()).toEqual('MOST RECENT EVENTS');
  });
});
