import React from 'react';
import { shallow } from 'enzyme';
import Lever from '../../../../client/src/components/containers/forms/Lever';

const props = {
  boolValue: true,
  id: 'approve',
  label: false,
  handleToggle: jest.fn(() => {})
};
const wrapper = shallow(<Lever {...props} />);

describe('Lever Component', () => {
  it('should render contact person form', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
