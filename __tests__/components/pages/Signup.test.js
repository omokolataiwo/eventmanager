import React from 'react';
import { shallow } from 'enzyme';
import { Signup } from '../../../client/src/components/pages/Signup';
import userMock from '../../__mocks__/user';

const history = [];
const props = {
  history: {
    push: jest.fn(path => history.push(path)),
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

  it('should redirect to sign in page', () => {
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(),
      'componentWillReceiveProps'
    );
    wrapper.setProps({ events: { signup: 'SIGNUP_USER' } });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    expect(history.pop()).toEqual('/signin');
  });

  it('should save error messages for invalid server validation', () => {
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(),
      'componentWillReceiveProps'
    );
    wrapper.setProps({
      events: { signup: 'SIGNUP_USER_ERROR' },
      errors: {
        username: ['username has already been used.']
      }
    });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    expect(wrapper.state('errors').username).toEqual([
      'username has already been used.'
    ]);
  });

  it('should not create new user with invalid user data', () => {
    const instance = wrapper.instance();
    instance.registerUser({ preventDefault: jest.fn(() => {}) });
    expect(wrapper.state().errors.firstName).toEqual([
      'First name is required.'
    ]);
    expect(wrapper.state().errors.username).toEqual(['Username is required.']);
  });

  it('should create new user with valid user data', () => {
    wrapper.setState({
      userdata: {
        ...userMock.userdata,
        password: '123',
        matchPassword: '123',
        username: 'admin'
      }
    });
    const instance = wrapper.instance();
    instance.registerUser({ preventDefault: jest.fn(() => {}) });
    expect(props.createUserRequest).toHaveBeenCalled();
  });

  it('should change state for each form field', () => {
    const instance = wrapper.instance();
    instance.handleFormFieldChanged({
      target: { value: 'adlab', id: 'username' }
    });
    expect(wrapper.state().userdata.username).toEqual('adlab');
    instance.handleFormFieldChanged({
      target: { value: 'secret', id: 'matchPassword' }
    });
    expect(wrapper.state().userdata.matchPassword).toEqual('secret');
  });
});
