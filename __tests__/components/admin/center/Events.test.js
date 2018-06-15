import React from 'react';
import { mount } from 'enzyme';
import { Events } from '../../../../client/src/components/admin/center/Events';
import { events } from '../../../__mocks__/event';
import { center } from '../../../__mocks__/center';
import { contactAda } from '../../../__mocks__/contact';

const history = [];
const eventsWithContact = events.map((event, index) => ({
  ...event,
  ...contactAda,
  id: index + 1
}));

const props = {
  history: {
    push: jest.fn(path => history.push(path)),
    replace: jest.fn(path => history.push(path))
  },
  match: { params: { id: '1' } },
  fetchCenterRequest: jest.fn(() => {}),
  adminCancelEventRequest: jest.fn(() => {}),
  reset: jest.fn(() => {}),
  count: 0,
  events: [],
  center: {},
  action: { getCenter: '' }
};

const wrapper = mount(<Events {...props} />);

describe('Events Component', () => {
  it('renders preloader', () => {
    wrapper.setProps({ ...props, action: { getCenter: 'FETCHING_CENTER' } });
    expect(wrapper.find('.preloader-wrapper').exists()).toBe(true);
  });

  it('redirects to 404 page if center does not exist', () => {
    wrapper.setProps({
      ...props,
      action: { getCenter: 'FETCHING_CENTER_ERROR' }
    });
    expect(history.pop()).toEqual('/404');
  });

  it('render center and the events for the center', () => {
    wrapper.setProps({
      ...props,
      events: eventsWithContact,
      center,
      count: 8,
      action: { getCenter: 'RECEIVE_CENTER' }
    });
    expect(wrapper.find('.event-card-admin').length).toEqual(2);
    const pageWrapper = wrapper.find('.container-medium');
    expect(pageWrapper.find('h3').text()).toEqual('Sheba Center');
    expect(
      pageWrapper
        .find('.event-card-admin h6 span')
        .first()
        .text()
    ).toEqual('Birthday Party');
  });

  it('should cancel event with modal', () => {
    const firstEventCard = wrapper
      .find('.container-medium .event-card-admin')
      .first();
    firstEventCard.find('h6 i.delete').simulate('click');
    expect(wrapper.state().poppedEvent).toEqual(1);
    wrapper.find('.red.btn').simulate('click');
    expect(props.adminCancelEventRequest).toHaveBeenCalledWith(1, true);
  });

  it('handlePagingNav to call fetchCenterRequest', () => {
    const instance = wrapper.instance();
    instance.handlePagingNav(3);
    expect(props.fetchCenterRequest).toHaveBeenCalled();
    wrapper.unmount();
  });
});
