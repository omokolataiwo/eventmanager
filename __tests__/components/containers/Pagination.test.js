import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../../client/src/components/containers/Pagination';

jest.mock('jquery');
const props = {
  total: 12,
  handlePagingNav: () => {},
  history: {
    push: jest.fn(() => Promise.resolve(1)),
    replace: jest.fn(() => Promise.resolve(1))
  }
};

const wrapper = shallow(<Pagination {...props} />);

describe('Pagination Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
