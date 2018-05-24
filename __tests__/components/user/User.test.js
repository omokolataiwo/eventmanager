import React from 'react';
import { shallow } from 'enzyme';
import { User } from '../../../client/src/components/user/User';
import user from '../../__mocks__/user';

const { userdata, accessToken } = user;
const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  userdata,
  authenticated: true,
  match: {
    path: '/user/events'
  },
  location: {
    pathname: '/user/events'
  },
  accessToken
};

const wrapper = shallow(<User {...props} />);

describe('User Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
