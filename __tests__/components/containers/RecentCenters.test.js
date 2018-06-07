import React from 'react';
import { shallow } from 'enzyme';
import { RecentCenters } from '../../../client/src/components/containers/RecentCenters';
import { centers } from '../../__mocks__/center';

const props = {
  count: 2,
  reset: () => { },
  action: { getCenters: 'FETCHING_CENTERS' },
  centers: centers,
  fetchAllCentersRequest: jest.fn(() => { }),
  handlePagingNav: jest.fn(() => { })
};

const wrapper = shallow(<RecentCenters {...props} />);

describe('RecentCenters Component', () => {
  it('renders preloader', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('receive center state with empty record', () => {
    wrapper.setProps({ ...props, centers: [], action: { ...props.action, getCenters: 'RECEIVED_CENTERS' } })
    expect(wrapper.find('span').text()).toEqual('No center record yet!');
  });

  it('receive center state with record', () => {
    wrapper.setProps({ ...props, action: { ...props.action, getCenters: 'RECEIVED_CENTERS' } })
    expect(wrapper.find('CentersCard').exists).toBeTruthy();
  });

  it('get next paginated center', () => {
    const instance = wrapper.instance();
    instance.handlePagingNav(3);
    expect(props.fetchAllCentersRequest).toHaveBeenCalled();
    wrapper.unmount();
  });
});
