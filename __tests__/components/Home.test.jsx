import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../client/src/components/pages/Home';
import Slider from '../../client/src/components/containers/Slider';

const props = {
  history: {
    push: jest.fn(() => {})
  }
};

const wrapper = shallow(<Home {...props} />);

describe('Home Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.featured-centers')).toHaveLength(1);
  });
});
