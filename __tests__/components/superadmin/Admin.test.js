import React from 'react';
import { shallow } from 'enzyme';
import { Admin } from '../../../client/src/components/superadmin/Admin';
import { events } from '../../__mocks__/event';

const props = {
  authenticated: true,
  userdata: { role: 1 },
  history: { push: () => {} },
  match: { path: '/' }
};

const wrapper = shallow(<Admin {...props} />);

describe('Admin Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
