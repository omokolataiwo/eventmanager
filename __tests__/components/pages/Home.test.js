import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../../client/src/components/pages/Home';

const props = {
  history: {
    push: jest.fn(() => {})
  }
};

const wrapper = shallow(<Home {...props} />);

describe('Home Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.find('h3').text()).toEqual('HOW IT WORKS');
  });
});
