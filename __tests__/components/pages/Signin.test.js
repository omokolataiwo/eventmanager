import React from 'react';
import { mount } from 'enzyme';
import { Signin } from '../../../client/src/components/pages/Signin';
import toastr from '../../__mocks__/toastr';

const history = [];
const props = {
  history: {
    push: jest.fn(path => history.push(path)),
    replace: jest.fn(path => history.push(path))
  },
  signinRequest: jest.fn(() => {}),
  userdata: {},
  events: {},
  errors: {},
  authenticated: false
};
localStorage.setItem('newSignup', true);
const wrapper = mount(<Signin {...props} />);

describe('Signin Component', () => {
  it('should render self', () => {
    expect(wrapper.find('input#username').exists()).toBe(true);
    expect(wrapper.find('input#password').exists()).toBe(true);
    expect(toastr.success).toHaveBeenCalled();
  });
  it('should redirect to appropriate page when user signed in', () => {
    wrapper.setProps({
      events: { signin: 'SIGNIN_USER' },
      userdata: { role: 2 }
    });
    expect(history.pop()).toEqual('/admin');
  });
  it('should display error message on sign in', () => {
    wrapper.setProps({
      events: { signin: 'SIGNIN_USER_ERROR' },
      errors: {
        signin: ['Invalid username or password']
      }
    });

    expect(wrapper.find('.error.signin').text()).toEqual(
      'Invalid username or password '
    );
  });
  it('Should not sign in with no credential', () => {
    wrapper.find('input.btn').simulate('click');
    expect(wrapper.find('.error.signin').text()).toEqual(
      'Invalid username or password '
    );
  });

  it('Should sign in user', () => {
    wrapper
      .find('input#username')
      .simulate('change', { target: { value: 'adlab', id: 'username' } });
    expect(wrapper.state('user').username).toEqual('adlab');
    wrapper
      .find('input#password')
      .simulate('change', { target: { value: 'adpass', id: 'password' } });
    expect(wrapper.state('user').password).toEqual('adpass');

    wrapper.find('input.btn').simulate('click');
    expect(props.signinRequest).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('should not render when user is already authenticated', () => {
    props.authenticated = true;
    props.userdata = { role: 3 };
    const wrapper = mount(<Signin {...props} />);
    expect(history.pop()).toEqual('/user');
  });
});
