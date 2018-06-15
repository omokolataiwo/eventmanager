import React from 'react';
import { shallow } from 'enzyme';
import { Index } from '../../../client/src/components/user/Index';
import { events } from '../../__mocks__/event';
import { center } from '../../__mocks__/center';

let eventsWithCenter = events.map(event => {
  return { ...event, center };
});
eventsWithCenter[1] = {
  ...eventsWithCenter[1],
  centerId: 0,
  startDate: '2018-2-3'
};

const history = [];

const props = {
  history: {
    push: jest.fn(path => history.push(path)),
    replace: jest.fn(() => {})
  },
  fetchUserRequest: jest.fn(() => {}),
  fetchUserEventsRequest: jest.fn(() => {}),
  deleteEventRequest: jest.fn(eventId => {
    eventsWithCenter = eventsWithCenter.filter(event => event.id !== eventId);
    localStorage.setItem('page', 2);
    wrapper.setProps({
      events: eventsWithCenter,
      actions: { cancel: 'DELETED_EVENT' }
    });
  }),
  reset: jest.fn(() => {}),
  actions: {
    getEvents: 'FETCHING_EVENTS'
  },
  events: [],
  count: 0
};
localStorage.setItem('CREATED_EVENT', true);

const wrapper = shallow(<Index {...props} />);

const eventsTitleAtIndex = index =>
  wrapper
    .find('h6 span')
    .children()
    .at(index)
    .text();

describe('Index Component', () => {
  it('should render preloader', () => {
    expect(wrapper.find('.preloader').exists()).toEqual(true);
  });

  it('should render card without event', () => {
    wrapper.setProps({
      actions: {
        getEvents: 'RECEIVED_EVENTS'
      }
    });
    expect(wrapper.find('h6 span').text()).toEqual(
      'You do not have any booking information.'
    );
  });
  it('should render event card', () => {
    wrapper.setProps({
      events: eventsWithCenter,
      actions: {
        getEvents: 'RECEIVED_EVENTS'
      }
    });

    expect(eventsTitleAtIndex(0)).toEqual('Birthday Party');
    expect(eventsTitleAtIndex(1)).toEqual('Wedding Anniversary');
  });

  it('redirect to edit page', () => {
    const editIcon = wrapper.find('.edit');
    editIcon.at(0).simulate('keyup');
    editIcon.at(0).simulate('click');
    expect(history.pop()).toEqual('/user/event/update/1');
    editIcon.at(1).simulate('keyup');
    editIcon.at(1).simulate('click');
    expect(history.pop()).toEqual('/user/event/update/2');
  });

  it('cancel an event', () => {
    let deleteIcon = wrapper.find('.delete');
    deleteIcon.at(0).simulate('keyup');
    deleteIcon.at(0).simulate('click');
    expect(wrapper.state('poppedEvent')).toEqual(1);
    wrapper.find('.red.btn').simulate('click');
    expect(props.deleteEventRequest).toHaveBeenCalledWith(1);
    expect(eventsTitleAtIndex(0)).toEqual('Wedding Anniversary');

    // remove the second event
    deleteIcon = wrapper.find('.delete');
    deleteIcon.at(0).simulate('click');
    expect(wrapper.state('poppedEvent')).toEqual(2);

    wrapper.find('.red.btn').simulate('click');
    expect(props.deleteEventRequest).toHaveBeenCalledWith(2);
    expect(eventsTitleAtIndex(0)).toEqual(
      'You do not have any booking information.'
    );
  });

  it('get events by pagination', () => {
    const instance = wrapper.instance();
    instance.handlePagingNav(3);
    expect(props.fetchUserEventsRequest).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('should redirect to create event page if user has pending booking choice', () => {
    localStorage.setItem('saveRoute', '/user/event');
    shallow(<Index {...props} />);
    expect(history.pop()).toEqual('/user/event');
  });
});
