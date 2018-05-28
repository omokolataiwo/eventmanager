import React from 'react';
import { shallow } from 'enzyme';
import { Admin } from '../../../client/src/components/admin/Admin';
import { events } from '../../__mocks__/event';

const props = {
  authenticated: true,
  userdata: { role: 2 },
  history: { push: () => {} },
  match: { path: '/' }
};

const wrapper = shallow(<Admin {...props} />);

describe('Admin Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
