import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from '../../../client/src/components/user/Profile';
import user from '../../__mocks__/user';

const { userdata, accessToken } = user;
const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  userdata,
  errors: {},
  events: {},
  updateUserRequest: jest.fn(() => {}),
  resetUpdateState: jest.fn(() => {})
};

const wrapper = shallow(<Profile {...props} />);

describe('Profile Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
