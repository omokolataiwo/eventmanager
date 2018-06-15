import React from 'react';
import { mount } from 'enzyme';
import { Index } from '../../../client/src/components/superadmin/Index';
import { centers, contact } from '../../__mocks__/center';

const ctrs = centers.map(center => {
  center.contacts = contact;
  center.approve = false;
  return center;
});

const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  fetchAllCentersRequest: jest.fn(() => {}),
  approveCenterRequest: jest.fn(() => {}),
  centers: [],
  count: 0,
  action: {
    getEvents: 'FETCHING_EVENTS_REQUEST'
  }
};

const wrapper = mount(<Index {...props} />);

describe('Index Component', () => {
  it('should render self', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('table').exists()).toBe(false);
  });

  it('should render centers', () => {
    wrapper.setProps({ centers: ctrs, count: ctrs.length });
    expect(wrapper.find('h4').text()).toEqual('Registered Centers');
    expect(wrapper.find('tr').length).toEqual(ctrs.length + 1);
    expect(
      wrapper
        .find('tr')
        .at(2)
        .find('td')
        .first()
        .text()
    ).toEqual('Immaculate Garden');
  });

  it('should toggle center approval state and make api request', () => {
    const simulateClick = () => {
      wrapper
        .find('.switch input')
        .first()
        .simulate('change');
    };
    simulateClick();
    expect(wrapper.state('centers')[0].approve).toEqual(true);
    simulateClick();
    expect(wrapper.state('centers')[0].approve).toEqual(false);

    expect(props.approveCenterRequest).toHaveBeenCalledWith(1);
  });

  it('handlePagingNav to call fetchAllCentersRequest', () => {
    const instance = wrapper.instance();
    instance.handlePagingNav(3);
    expect(props.fetchAllCentersRequest).toHaveBeenCalled();
  });
});
