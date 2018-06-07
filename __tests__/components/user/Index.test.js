import React from 'react';
import { shallow } from 'enzyme';
import { Index } from '../../../client/src/components/user/Index';
import { events } from '../../__mocks__/event';
import { center } from '../../__mocks__/center';
import user from '../../__mocks__/user';
import toastr from '../../__mocks__/toastr';

const { userdata, accessToken } = user;

const eventsWithCenter = events.map(event => {
  return { ...event, center };
});

const history = [];

const props = {
  history: {
    push: jest.fn((path) => history.push(path)),
    replace: jest.fn(() => { })
  },
  fetchUserRequest: jest.fn(() => { }),
  fetchUserEventsRequest: jest.fn(() => { }),
  deleteEventRequest: jest.fn(() => { }),
  reset: jest.fn(() => { }),
  actions: {},
  events: eventsWithCenter,
  count: events.length,
  accessToken
};
localStorage.setItem('saveRoute', '/user/event');

const wrapper = shallow(<Index {...props} />);

describe('Index Component', () => {
  it('get events with pagination on previous page', () => {
    localStorage.setItem('page', 2);
    wrapper.setProps({ ...props, events: [] })
    expect(props.fetchUserEventsRequest).toHaveBeenCalled();
  });

  it('get events when user delete an event', () => {
    localStorage.setItem('page', 0);
    wrapper.setProps({ ...props, events: eventsWithCenter, actions: { cancel: 'DELETED_EVENT' } })
    expect(props.fetchUserEventsRequest).toHaveBeenCalled();
  });


  it('get events by pagination', () => {
    const instance = wrapper.instance();
    instance.handlePagingNav(3);
    expect(props.fetchUserEventsRequest).toHaveBeenCalled();
  });

  it('redirect to edit page', () => {
    const instance = wrapper.instance();
    instance.handleEditEvent(3);
    expect(history.pop()).toEqual('/user/event/update/3');
  });

  it('add event for delete in state', () => {
    const instance = wrapper.instance();
    instance.handleDeletePopEvent(3);
    expect(wrapper.state().poppedEvent).toEqual(3);
  });

  it('cancel an event', () => {
    const instance = wrapper.instance();
    instance.cancelEvent(3);
    expect(props.deleteEventRequest).toHaveBeenCalled();
    wrapper.unmount();
    localStorage.setItem('CREATED_EVENT', true);
  });
});
