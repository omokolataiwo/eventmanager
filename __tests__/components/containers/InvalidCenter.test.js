import React from 'react';
import { shallow } from 'enzyme';
import InvalidCenter from '../../../client/src/components/containers/InvalidCenter';

const wrapper = shallow(<InvalidCenter />);

describe('InvalidCenter Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
