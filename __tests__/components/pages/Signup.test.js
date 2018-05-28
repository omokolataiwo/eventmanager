import React from 'react';
import { shallow } from 'enzyme';
import { Signup } from '../../../client/src/components/pages/Signup';

const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  createUserRequest: jest.fn(() => {}),
  events: {},
  errors: {},
  authenticated: false
};

const wrapper = shallow(<Signup {...props} />);

describe('Signup Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
