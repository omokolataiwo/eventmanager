import React from 'react';
import { shallow } from 'enzyme';
import Event from '../../../client/src/components/user/Event';
import user from '../../__mocks__/user';

const { userdata, accessToken } = user;
const props = {
  match: {
    path: '/user/events'
  }
};

const wrapper = shallow(<Event {...props} />);

describe('Event Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
