import React from 'react';
import { shallow } from 'enzyme';
import InputField from '../../../../client/src/components/containers/forms/InputField';

const props = {
  id: 'firstName',
  width: '6',
  title: 'First Name',
  type: 'text',
  onChange: jest.fn(() => {})
};
const wrapper = shallow(<InputField {...props} />);

describe('InputField Component', () => {
  it('should render contact person form', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
