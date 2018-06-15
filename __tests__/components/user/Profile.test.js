import React from 'react';
import { mount } from 'enzyme';
import { Profile } from '../../../client/src/components/user/Profile';
import user from '../../__mocks__/user';
import toastr from '../../__mocks__/toastr';

const { userdata } = user;
const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  userdata,
  errors: {
    firstName: [],
    lastName: [],
    phoneNumber: [],
    email: [],
    update: []
  },
  events: {},
  updateUserRequest: jest.fn(() => {}),
  resetUpdateState: jest.fn(() => {})
};

const wrapper = mount(<Profile {...props} />);

const simulateChange = (selector, id, value) =>
  wrapper.find(selector).simulate('change', {
    target: { id, value }
  });

describe('Profile Component', () => {
  it('should render self', () => {
    expect(wrapper.find('h5').text()).toEqual('UPDATE PROFILE');

    // Should populate form field
    const defaultValue = selector =>
      wrapper.find(selector).props().defaultValue;

    expect(defaultValue('input#firstName')).toEqual('Adeoye');
    expect(defaultValue('input#lastName')).toEqual('Taiwo');
    expect(defaultValue('input#email')).toEqual('ataiwo@gmail.com');
    expect(defaultValue('input#phoneNumber')).toEqual('08032108214');
  });

  it('should not update with invalid user record', () => {
    simulateChange('input#firstName', 'firstName', '');
    simulateChange('input#lastName', 'lastName', 'Rolland');
    simulateChange('input#email', 'email', 'local@fakemail');
    wrapper.find('.btn').simulate('click');

    expect(
      wrapper
        .find('.firstName .errors span')
        .first()
        .text()
    ).toEqual('First name is required. ');

    expect(wrapper.find('.email .errors span').text()).toEqual(
      'Email is not a valid email address '
    );
  });

  it('should update validate user request', () => {
    simulateChange('input#firstName', 'firstName', 'Egisare');
    simulateChange('input#lastName', 'lastName', 'Rolland');
    simulateChange('input#email', 'email', 'local@mail.com');
    simulateChange('input#email', 'email', 'local@mail.com');
    wrapper.find('.btn').simulate('click');
    expect(props.updateUserRequest).toHaveBeenCalled();
  });

  it('should notify user when user data is updated', () => {
    wrapper.setProps({
      ...props,
      events: { ...props.events, updateUser: 'UPDATED_USER' }
    });
    expect(toastr.success).toHaveBeenCalledWith('Profile Updated!');
  });
});
