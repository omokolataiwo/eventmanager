import React from 'react';
import { shallow } from 'enzyme';
import Preloader from '../../../client/src/components/containers/Preloader';

const props = {
  total: 12,
  handlePagingNav: () => {},
  history: {
    push: jest.fn(() => Promise.resolve(1)),
    replace: jest.fn(() => Promise.resolve(1))
  }
};

const wrapper = shallow(<Preloader {...props} />);

describe('Preloader Component', () => {
  it('should render self', () => {
    expect(wrapper.find('.preloader-wrapper').exists()).toBe(true);
  });
});
