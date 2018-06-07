import React from 'react';
import { shallow } from 'enzyme';
import { Admin } from '../../../client/src/components/superadmin/Admin';
import { events } from '../../__mocks__/event';

const history = [];

const props = {
  authenticated: true,
  userdata: { role: 2 },
  history: { push: jest.fn(path => history.push(path)) },
  match: { path: '/' }
};

const wrapper = shallow(<Admin {...props} />);

describe('Admin Component', () => {
  it('Redirect if user is not authorized user.', () => {
    expect(history.pop()).toEqual('/signin');
  });
  it('Render base component', () => {
    wrapper.setState({ authorized: true });
    expect(wrapper.exists()).toBe(true);
  });
});
