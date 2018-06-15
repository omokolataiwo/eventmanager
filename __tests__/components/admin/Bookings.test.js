import React from 'react';
import { mount } from 'enzyme';
import { Bookings } from '../../../client/src/components/admin/Bookings';
import { events } from '../../__mocks__/event';

const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  fetchCenterEventRequest: jest.fn(() => {}),
  centersEvents: events,
  count: events.length,
  action: {
    getEvents: 'FETCHING_CENTERS_EVENTS'
  }
};

const wrapper = mount(<Bookings {...props} />);

describe('Bookings Component', () => {
  it('Render preloader', () => {
    expect(wrapper.find('.preloader-wrapper').exists()).toBe(true);
  });

  it('Render events', () => {
    wrapper.setProps({
      ...props,
      action: { getEvents: 'RECEIVED_CENTERS_EVENTS' }
    });
    expect(wrapper.find('h5').text()).toEqual('Bookings');
    expect(
      wrapper
        .find('table tr')
        .at(1)
        .children()
        .at(0)
        .text()
    ).toEqual('Birthday Party');
    expect(
      wrapper
        .find('table tr')
        .at(2)
        .children()
        .at(0)
        .text()
    ).toEqual('Wedding Anniversary');
  });

  it('Render no event exist for admin record', () => {
    wrapper.setProps({
      ...props,
      action: { getEvents: 'FETCHING_CENTERS_EVENTS_ERRORS' }
    });
    expect(wrapper.find('.no-event-admin').exists()).toBe(true);
    expect(wrapper.find('.no-event-admin h3').text()).toEqual('Welcome!');
  });

  it('handlePagingNav to call fetchCenterEventRequest', () => {
    const handlePagingNavSpy = jest.spyOn(
      wrapper.instance(),
      'handlePagingNav'
    );
    const instance = wrapper.instance();
    instance.handlePagingNav(3);
    expect(props.fetchCenterEventRequest).toHaveBeenCalled();
  });
});
