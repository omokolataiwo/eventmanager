import React from 'react';
import { shallow } from 'enzyme';
import { User } from '../../../client/src/components/user/User';
import user from '../../__mocks__/user';

const history = [];
const { userdata, accessToken } = user;
const props = {
  history: {
    push: jest.fn(path => history.push(path)),
    replace: jest.fn(() => {})
  },
  userdata: { ...userdata, role: 0 },
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
  it('redirects to signin page when user is not authorized.', () => {
    expect(history.pop()).toEqual('/signin');
    wrapper.unmount();
  });
  it('renders component', () => {
    wrapper.setProps({ ...props, userdata: { ...props.userdata, role: 3 } });
  });
});
