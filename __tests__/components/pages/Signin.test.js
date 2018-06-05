import React from 'react';
import { shallow } from 'enzyme';
import { Signin } from '../../../client/src/components/pages/Signin';

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
const wrapper = shallow(<Signin {...props} />);

describe('Signin Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should redirect to sign in page', () => {
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(),
      'componentWillReceiveProps'
    );
    wrapper.setProps({
      events: { signin: 'SIGNIN_USER' },
      userdata: { role: 2 }
    });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    expect(history.pop()).toEqual('/admin');
  });
  it('should store sign in error message in state', () => {
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(),
      'componentWillReceiveProps'
    );
    wrapper.setProps({
      events: { signin: 'SIGNIN_USER_ERROR' },
      errors: {
        signin: ['Invalid username or password']
      }
    });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    expect(wrapper.state().errors.signin).toEqual([
      'Invalid username or password'
    ]);
  });
  it('Should not sign in with no credential', () => {
    const instance = wrapper.instance();
    instance.signin({ preventDefault: jest.fn(() => {}) });
    expect(wrapper.state().errors.signin).toEqual([
      'Invalid username or password'
    ]);
  });

  it('Should sign in user', () => {
    const instance = wrapper.instance();
    wrapper.setState({ user: { username: 'adlab', password: 'adpass' } });
    instance.signin({ preventDefault: jest.fn(() => {}) });
    expect(props.signinRequest).toHaveBeenCalled();
  });

  it('should change state for each form field', () => {
    const instance = wrapper.instance();
    instance.handleFormFieldChanged({
      target: { value: 'adlab', id: 'username' }
    });
    expect(wrapper.state().user.username).toEqual('adlab');
  });
});
