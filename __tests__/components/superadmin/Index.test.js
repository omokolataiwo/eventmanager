import React from 'react';
import { shallow } from 'enzyme';
import { Index } from '../../../client/src/components/superadmin/Index';
import { centers, contact } from '../../__mocks__/center';

const ctrs = centers.map(center => {
  center.contacts = contact;
  return center;
});

const props = {
  history: {
    push: jest.fn(() => { }),
    replace: jest.fn(() => { })
  },
  fetchAllCentersRequest: jest.fn(() => { }),
  approveCenterRequest: jest.fn(() => { }),
  centers: ctrs,
  action: {
    getEvents: 'FETCHING_EVENTS_REQUEST'
  }
};

const wrapper = shallow(<Index {...props} />);

describe('Index Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render centers', () => {
    wrapper.setProps(props);
  });


  it('handlePagingNav to call fetchAllCentersRequest', () => {
    const instance = wrapper.instance();
    instance.handlePagingNav(3);
    expect(props.fetchAllCentersRequest).toHaveBeenCalled();
  });

  it('handleApproveToggle to call approveCenterRequest', () => {
    const instance = wrapper.instance();
    instance.handleApproveToggle(2);
    expect(props.approveCenterRequest).toHaveBeenCalled();
  });
});
