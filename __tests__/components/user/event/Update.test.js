import React from 'react';
import { shallow } from 'enzyme';
import { Update } from '../../../../client/src/components/user/event/Update';
import { centers } from '../../../__mocks__/center';
import { eventBirthday } from '../../../__mocks__/event';
import toastr from '../../../__mocks__/toastr';
const props = {
  updateEventRequest: jest.fn(() => { }),
  fetchUserEventRequest: jest.fn(() => { }),
  fetchAllCentersRequest: jest.fn(() => { }),
  centers,
  match: {
    params: { index: '2' }
  },
  event: { ...eventBirthday, centerId: 1 },
  errors: {},
  actions: {
    getEvent: 'FETCHING_EVENT'
  },
  centerAction: {},
  reset: jest.fn(() => { })
};

const wrapper = shallow(<Update {...props} />);

describe('Update Component', () => {
  it('renders preloader', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('set state for update event error', () => {
    wrapper.setProps({
      ...props, errors: {
        endDate: ['End date can not be before start date']
      }, actions: { ...props.actions, updateEvent: 'UPDATE_EVENT_ERROR' }
    })
    expect(wrapper.state().errors.endDate).toEqual(['End date can not be before start date']);
  });

  it('received event and upate state', () => {
    wrapper.setProps({
      ...props, actions: { ...props.actions, getEvent: 'RECEIVED_EVENT' }
    });
    expect(wrapper.state().event.title).toEqual('Birthday Party');
  });

  it('update and call toastr', () => {
    wrapper.setProps({
      ...props, event: { ...props.event, center: centers[props.event.centerId] }, actions: { ...props.actions, updateEvent: 'UPDATED_EVENT' }
    })
    expect(toastr.success).toHaveBeenCalled()
  });

  it('update state for recieved center', () => {
    wrapper.setProps({
      ...props, centerAction: { ...props.centerAction, getCenters: 'RECEIVED_CENTERS' }
    })
    expect(wrapper.state().centers.length).toEqual(2)
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

  it('change state form form field update', () => {
    const instance = wrapper.instance();
    instance.handleFormFieldChanged({ target: { id: 'endDate', value: '2018-10-1' } });
    expect(wrapper.state().event.endDate).toEqual('2018-10-1')
  });

  it('update event with center id attached', () => {
    const instance = wrapper.instance();
    instance.updateEvent({ preventDefault: () => { } });
    expect(wrapper.state().event.centerId).toEqual(2);
    expect(props.updateEventRequest).toHaveBeenCalled();
    wrapper.unmount();
  });

});
