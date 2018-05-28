import React from 'react';
import { shallow } from 'enzyme';
import DynamicChips from '../../../../client/src/components/containers/forms/DynamicChips';

const props = {
  id: 'facilities',
  width: '6',
  value: 'chair,table,camera',
  onChange: jest.fn(() => {})
};
const wrapper = shallow(<DynamicChips {...props} />);

describe('DynamicChips Component', () => {
  it('should render contact person form', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
