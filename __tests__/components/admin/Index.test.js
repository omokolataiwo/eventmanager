import React from 'react';
import { mount } from 'enzyme';
import { Index } from '../../../client/src/components/admin/Index';
import { events } from '../../__mocks__/event';

const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  fetchCenterEventRequest: jest.fn(() => {}),
  events: [],
  action: {
    getEvents: 'FETCHING_CENTERS_EVENTS'
  }
};

const wrapper = mount(<Index {...props} />);

describe('Index Component', () => {
  it('Render preloader', () => {
    expect(wrapper.find('.preloader-wrapper').exists()).toBe(true);
  });
  it('Render no event exist for admin record', () => {
    wrapper.setProps({
      events: [],
      action: { getEvents: 'FETCHING_CENTERS_EVENTS_ERRORS' }
    });

    expect(wrapper.find('.no-event-admin').exists()).toBe(true);
    expect(
      wrapper
        .find('.no-event-admin')
        .children()
        .at(1)
        .text()
    ).toEqual('There is no booking information for your centers.');
  });
  it('Render events', () => {
    wrapper.setProps({
      events,
      action: { getEvents: 'RECEIVED_CENTERS_EVENTS' }
    });

    expect(wrapper.find('h5').text()).toEqual('MOST RECENT EVENTS');
    expect(wrapper.find('.event-card-admin').length).toEqual(2);
    expect(
      wrapper
        .find('.event-card-admin')
        .first()
        .find('h6 span')
        .text()
    ).toEqual('Birthday Party');
  });
});
