import React from 'react';
import { mount } from 'enzyme';
import { Update } from '../../../../client/src/components/user/event/Update';
import { centers } from '../../../__mocks__/center';
import { eventBirthday } from '../../../__mocks__/event';
import toastr from '../../../__mocks__/toastr';
const props = {
  updateEventRequest: jest.fn(event => {
    event.center = centers.find(center => center.id == event.centerId);
    wrapper.setProps({ event, actions: { updateEvent: 'UPDATED_EVENT' } });
  }),
  fetchUserEventRequest: jest.fn(() => {}),
  fetchAllCentersRequest: jest.fn(() => {}),
  centers: [],
  count: 0,
  match: {
    params: { index: '2' }
  },
  event: {},
  errors: {},
  actions: {
    getEvent: 'FETCHING_EVENT'
  },
  centerAction: {},
  reset: jest.fn(() => {})
};

const wrapper = mount(<Update {...props} />);

describe('Update Component', () => {
  it('renders preloader', () => {
    expect(wrapper.find('.preloader').exists()).toBe(true);
  });

  it('should populate form with existing event', () => {
    wrapper.setProps({
      event: { ...eventBirthday, centerId: 1 },
      centers,
      count: centers.length,
      actions: { getEvent: 'RECEIVED_EVENT' },
      centerAction: { getCenters: 'RECEIVED_CENTERS' }
    });

    expect(wrapper.find('input#title').props().defaultValue).toEqual(
      'Birthday Party'
    );
    expect(wrapper.find('input.startDate').props().defaultValue).toEqual(
      '12 October, 2018'
    );
    expect(wrapper.find('input.endDate').props().defaultValue).toEqual(
      '12 October, 2018'
    );
  });

  it('Set error message for component when errors occurred from the server', () => {
    wrapper.setProps({
      errors: {
        title: ['Title is required'],
        startDate: ['Start date can not be before end date']
      },
      actions: { updateEvent: 'UPDATE_EVENT_ERROR' }
    });
    expect(wrapper.find('.title .errors').text()).toEqual('Title is required ');
    expect(wrapper.find('#startDate .errors').text()).toEqual(
      'Start date can not be before end date '
    );
  });

  it('update event with new center.', () => {
    expect(wrapper.state('activeCenter').id).toEqual(1);
    wrapper
      .find('.event-center.card')
      .at(1)
      .simulate('click');
    expect(wrapper.state('activeCenter').id).toEqual(2);

    wrapper
      .find('input#title')
      .simulate('change', { target: { id: 'title', value: 'Dinner Party' } });
    // Update event and show notification to user

    wrapper.find('.btn').simulate('click');
    expect(toastr.success).toHaveBeenCalledWith('Event Updated.');
  });

  it('get centers based on next pagination', () => {
    const instance = wrapper.instance();
    instance.handlePagingNav(2);
    expect(props.fetchAllCentersRequest).toHaveBeenCalled();
    wrapper.unmount();
  });
});
