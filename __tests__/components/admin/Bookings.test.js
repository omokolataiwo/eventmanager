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
  count: events.length,
  action: {
    getEvents: 'FETCHING_CENTERS_EVENTS'
  }
};

const wrapper = shallow(<Bookings {...props} />);

describe('Bookings Component', () => {
  it('Render preloader', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Render events', () => {
    wrapper.setProps({
      ...props,
      action: { getEvents: 'RECEIVED_CENTERS_EVENTS' }
    });
    expect(wrapper.find('h5').text()).toEqual('Bookings');
  });

  it('Render no event exist for admin record', () => {
    wrapper.setProps({
      ...props,
      action: { getEvents: 'FETCHING_CENTERS_EVENTS_ERRORS' }
    });
    expect(wrapper.find('.no-event-admin').exists()).toBe(true);
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
