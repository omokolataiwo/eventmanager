import React from 'react';
import { shallow } from 'enzyme';
import Center from '../../../client/src/components/admin/Center';

const props = {
  match: {
    path: '/admin/center'
  }
};

const wrapper = shallow(<Center {...props} />);

describe('Center Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
