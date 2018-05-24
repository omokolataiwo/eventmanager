import React from 'react';
import { shallow } from 'enzyme';
import OverlaySearch from '../../../client/src/components/containers/OverlaySearch';

const props = {
  history: {
    push: jest.fn(() => {})
  }
};
const wrapper = shallow(<OverlaySearch {...props} />);

describe('OverlaySearch Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
