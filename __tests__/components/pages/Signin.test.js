import React from 'react';
import { shallow } from 'enzyme';
import { Signin } from '../../../client/src/components/pages/Signin';

const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  signinRequest: jest.fn(() => {}),
  userdata: {},
  events: {},
  errors: {},
  authenticated: false
};

const wrapper = shallow(<Signin {...props} />);

describe('Signin Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
