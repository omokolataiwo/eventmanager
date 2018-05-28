import React from 'react';
import { shallow } from 'enzyme';
import { Index } from '../../../client/src/components/user/Index';
import { events } from '../../__mocks__/event';
import user from '../../__mocks__/user';

const { userdata, accessToken } = user;
const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  fetchUserRequest: jest.fn(() => {}),
  fetchUserEventsRequest: jest.fn(() => {}),
  actions: {},
  events,
  count: events.length,
  accessToken
};

const wrapper = shallow(<Index {...props} />);

describe('Index Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
