import React from 'react';
import { shallow } from 'enzyme';
import { RecentCenters } from '../../../client/src/components/containers/RecentCenters';
import { centers } from '../../__mocks__/center';

const props = {
  count: 2,
  reset: () => {},
  action: {},
  centers: centers,
  fetchAllCentersRequest: () => {}
};

const wrapper = shallow(<RecentCenters {...props} />);

describe('RecentCenters Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
