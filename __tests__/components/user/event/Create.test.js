import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../../client/src/components/user/event/Create';
import { centers } from '../../../__mocks__/center';
import { eventBirthday } from '../../../__mocks__/event';
import instance from '../../../../client/src/utils/axios';

const history = [];

const props = {
  createEventRequest: jest.fn(() => { }),
  fetchAllCentersRequest: jest.fn(() => { }),
  actions: {},
  history: { push: jest.fn((path) => history.push(path)) },
  count: '2',
  resetEventState: jest.fn(() => { }),
  centers,
  match: {
    params: { index: '2' }
  },
  event: eventBirthday,
  errors: {},
  centerAction: {
    getCenters: 'FETCHING_CENTERS'
  },
  reset: jest.fn(() => { })
};

const wrapper = shallow(<Create {...props} />);

describe('Create Component', () => {
  it('renders preloader', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders no available center to book', () => {
    wrapper.setProps({ ...props, centerAction: { ...props.centerAction, getCenters: 'FETCHING_CENTERS_ERROR' } })
    expect(wrapper.exists()).toBe(true);
  });

  it('Received center props', () => {
    wrapper.setProps({ ...props, centerAction: { ...props.centerAction, getCenters: 'RECEIVED_CENTERS' } })
    expect(wrapper.state().activeCenter.name).toEqual('Sheba Center');
  });

  it('Set create event errrors', () => {
    wrapper.setProps({ ...props, errors: { title: ['Title is required'] }, actions: { ...props.acions, createEvents: 'CREATE_EVENT_ERROR' } });
    expect(wrapper.state().errors.title).toEqual(['Title is required']);
  });

  it('Redirect to dashboard when event is created', () => {
    wrapper.setProps({ ...props, actions: { ...props.acions, createEvents: 'CREATED_EVENT' } });
    expect(history.pop()).toEqual('/user');
  });

  it('change state form form field update', () => {
    const instance = wrapper.instance();
    instance.handleFormFieldChanged({ target: { id: 'endDate', value: '2018-10-1' } });
    expect(wrapper.state().event.endDate).toEqual('2018-10-1')
  });

  it('get centers based on next pagination', () => {
    const instance = wrapper.instance();
    instance.handlePagingNav(2);
    expect(props.fetchAllCentersRequest).toHaveBeenCalled();
  });

  it('change selected center by user', () => {
    const instance = wrapper.instance();
    instance.changeActiveCenter(2);
    expect(wrapper.state().activeCenter.name).toEqual('Immaculate Garden');
  });

  it('create event with center id attached', () => {
    const instance = wrapper.instance();
    instance.createEvent({ preventDefault: () => { } });
    expect(wrapper.state().event.centerId).toEqual(2);
    expect(props.createEventRequest).toHaveBeenCalled();
  });
});
