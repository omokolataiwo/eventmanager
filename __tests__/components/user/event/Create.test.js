import React from 'react';
import { mount } from 'enzyme';
import { Create } from '../../../../client/src/components/user/event/Create';
import { centers } from '../../../__mocks__/center';
import { eventBirthday } from '../../../__mocks__/event';

const history = [];

const props = {
  createEventRequest: jest.fn(() => {
    wrapper.setProps({ actions: { createEvents: 'CREATED_EVENT' } });
  }),
  fetchAllCentersRequest: jest.fn(() => {}),
  actions: {},
  history: { push: jest.fn(path => history.push(path)) },
  count: '2',
  resetEventState: jest.fn(() => {}),
  centers: [],
  count: 0,
  match: {
    params: { index: '2' }
  },
  event: {},
  errors: {},
  centerAction: {
    getCenters: 'FETCHING_CENTERS'
  },
  reset: jest.fn(() => {})
};

const wrapper = mount(<Create {...props} />);

describe('Create Component', () => {
  it('renders preloader', () => {
    expect(wrapper.find('.preloader').exists()).toBe(true);
  });

  it('renders no available center to book', () => {
    wrapper.setProps({
      centerAction: {
        getCenters: 'FETCHING_CENTERS_ERROR'
      }
    });
    expect(wrapper.find('h6').text()).toBe(
      'No Center Registered to be booked.'
    );
  });

  it('should render event center cards when component received centers', () => {
    wrapper.setProps({
      centers,
      centerAction: { ...props.centerAction, getCenters: 'RECEIVED_CENTERS' }
    });

    const eventCenterCard = wrapper.find('.event-center.card');
    expect(eventCenterCard.length).toEqual(2);
    expect(
      eventCenterCard
        .first()
        .find('h4')
        .text()
    ).toEqual('Sheba Center');
  });

  it('Set error message to component when errors occurred from the server', () => {
    wrapper.setProps({
      errors: {
        title: ['Title is required'],
        startDate: ['Start date can not be before end date']
      },
      actions: { createEvents: 'CREATE_EVENT_ERROR' }
    });

    expect(wrapper.find('.title .errors').text()).toEqual('Title is required ');
    expect(wrapper.find('#startDate .errors').text()).toEqual(
      'Start date can not be before end date '
    );
  });

  it('create event with center id attached', () => {
    expect(wrapper.state('activeCenter').id).toEqual(1);
    wrapper
      .find('.event-center.card')
      .at(1)
      .simulate('click');
    expect(wrapper.state('activeCenter').id).toEqual(2);

    wrapper
      .find('input#title')
      .simulate('change', { target: { id: 'title', value: 'Dinner Party' } });

    // Create event and redirect to user dashboard
    wrapper.find('.btn').simulate('click');
    expect(localStorage.getItem('CREATED_EVENT')).toEqual('Event Created.');
    expect(history.pop()).toEqual('/user');
  });

  it('get centers based on next pagination', () => {
    const instance = wrapper.instance();
    instance.handlePagingNav(2);
    expect(props.fetchAllCentersRequest).toHaveBeenCalled();
  });
});
