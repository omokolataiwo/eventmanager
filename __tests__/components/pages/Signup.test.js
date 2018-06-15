import React from 'react';
import { mount } from 'enzyme';
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

const wrapper = mount(<Signup {...props} />);

describe('Signup Component', () => {
  it('should render self', () => {
    expect(wrapper.find('.row.card h5 span').text()).toEqual('CREATE ACCOUNT');
  });

  it('should displays users error on input field change', () => {
    wrapper.find('input#firstName').simulate('change', {
      target: { id: 'firstName', value: 'Mathew' }
    });
    wrapper.find('input#lastName').simulate('change', {
      target: { id: 'lastName', value: 'Andrew' }
    });
    wrapper.find('input#email').simulate('change', {
      target: { id: 'email', value: 'admath@' }
    });
    wrapper.find('input#password').simulate('change', {
      target: { id: 'password', value: '1235' }
    });
    wrapper.find('input#matchPassword').simulate('change', {
      target: { id: 'matchPassword', value: '123' }
    });

    expect(wrapper.find('.email .errors').text()).toEqual(
      'Email is not a valid email address '
    );
    expect(wrapper.find('.matchPassword .errors').text()).toEqual(
      'Match password is not the same as Password '
    );

    // Force sign up despite validation errors

    wrapper.find('.btn').simulate('click');
    expect(wrapper.find('.email .errors').text()).toEqual(
      'Email is not a valid email address '
    );
    expect(wrapper.find('.matchPassword .errors').text()).toEqual(
      'Match password is not the same as Password '
    );
  });

  it('should save error messages for invalid server validation', () => {
    wrapper.setProps({
      events: { signup: 'SIGNUP_USER_ERROR' },
      errors: {
        username: ['username has already been used.']
      }
    });

    expect(wrapper.state('errors').username).toEqual([
      'username has already been used.'
    ]);
    expect(wrapper.find('.username .errors').text()).toEqual(
      'username has already been used. '
    );
  });

  it('should create new user with valid user data', () => {
    wrapper.find('input#firstName').simulate('change', {
      target: { id: 'firstName', value: 'Mathew' }
    });
    wrapper.find('input#lastName').simulate('change', {
      target: { id: 'lastName', value: 'Andrew' }
    });
    wrapper.find('input#phoneNumber').simulate('change', {
      target: { id: 'phoneNumber', value: '08032108912' }
    });
    wrapper.find('input#email').simulate('change', {
      target: { id: 'email', value: 'admath@mail.com' }
    });
    wrapper.find('input#username').simulate('change', {
      target: { id: 'username', value: 'admath' }
    });
    wrapper.find('input#password').simulate('change', {
      target: { id: 'password', value: '123' }
    });
    wrapper.find('input#matchPassword').simulate('change', {
      target: { id: 'matchPassword', value: '123' }
    });
    wrapper.find('.btn').simulate('click');
    expect(props.createUserRequest).toHaveBeenCalled();
  });

  it('should redirect to sign in page on success sign up', () => {
    wrapper.setProps({ events: { signup: 'SIGNUP_USER' } });
    expect(history.pop()).toEqual('/signin');
    wrapper.unmount();
  });

  it('should not render this component when already signed in', () => {
    props.authenticated = true;
    mount(<Signup {...props} />);
    expect(history.pop()).toEqual('/signout');
  });
});
