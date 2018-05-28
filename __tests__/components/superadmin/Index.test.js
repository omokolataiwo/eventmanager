import React from 'react';
import { shallow } from 'enzyme';
import { Index } from '../../../client/src/components/superadmin/Index';
import { centers } from '../../__mocks__/center';

const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  fetchAllCentersRequest: jest.fn(() => {}),
  approveCenterRequest: jest.fn(() => {}),
  centers,
  action: {
    getEvents: 'FETCHING_EVENTS_REQUEST'
  }
};

const wrapper = shallow(<Index {...props} />);

describe('Index Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
