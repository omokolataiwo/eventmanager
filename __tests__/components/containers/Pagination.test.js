import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../../client/src/components/containers/Pagination';

jest.mock('jquery');
const props = {
  total: 0,
  handlePagingNav: () => {},
  history: {
    push: jest.fn(() => Promise.resolve(1)),
    replace: jest.fn(() => Promise.resolve(1))
  }
};

const wrapper = shallow(<Pagination {...props} />);

describe('Pagination Component', () => {
  it('does not render pagination when item is not up to pagination limit', () => {
    expect(wrapper.find('.pagination').exists()).toBe(false);
  });

  it('should render pagination list', () => {
    wrapper.setProps({ total: 30 });
    expect(wrapper.find('li').length).toEqual(5);
  });
});
