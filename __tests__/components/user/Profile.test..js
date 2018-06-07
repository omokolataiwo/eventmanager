import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from '../../../client/src/components/user/Profile';
import user from '../../__mocks__/user';
import toastr from '../../__mocks__/toastr';

const { userdata, accessToken } = user;
const props = {
  history: {
    push: jest.fn(() => { }),
    replace: jest.fn(() => { })
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
  updateUserRequest: jest.fn(() => { }),
  resetUpdateState: jest.fn(() => { })
};

const wrapper = shallow(<Profile {...props} />);

describe('Profile Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should notify user when user data is updated', () => {
    wrapper.setProps({ ...props, events: { ...props.events, updateUser: 'UPDATED_USER' } });
    expect(toastr.success).toHaveBeenCalled();
  });

  it('should update validate user request', () => {
    const instance = wrapper.instance();
    instance.updateUser({ preventDefault: () => { } });
    expect(props.updateUserRequest).toHaveBeenCalled()
  });

  it('should not update with invalid user record', () => {
    const instance = wrapper.instance();
    wrapper.setState({ userdata: {} })
    instance.updateUser({ preventDefault: () => { } });
    expect(wrapper.state().errors.firstName[0]).toEqual('First name is required.')
  })

  it('should change the field for center', () => {
    const instance = wrapper.instance();
    instance.handleFormFieldChanged({ target: { id: 'firstName', value: 'Adeoye' } });
    expect(wrapper.state().userdata.firstName).toEqual('Adeoye');
  });
});
