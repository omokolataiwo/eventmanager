import React from 'react';
import { shallow } from 'enzyme';
import { Index } from '../../../../client/src/components/admin/center/Index';
import { centers } from '../../../__mocks__/center';

const props = {
  history: {
    push: jest.fn(() => {})
  },
  centers,
  fetchAdminCentersRequest: jest.fn(() => {}),
  count: 2,
  action: {
    getCenters: 'FETCHING_CENTER_REQUEST'
  }
};

const wrapper = shallow(<Index {...props} />);

describe('Index Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
