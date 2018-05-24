import React from 'react';
import { shallow } from 'enzyme';
import { Search } from '../../../client/src/components/pages/Search';
import { centers } from '../../__mocks__/center';
const props = {
  history: {
    push: jest.fn(() => {})
  },
  searched: centers,
  searchCenterRequest: jest.fn(() => {})
};

const wrapper = shallow(<Search {...props} />);

describe('Search Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
