import React from 'react';
import { shallow } from 'enzyme';
import TextArea from '../../../../client/src/components/containers/forms/TextArea';

const props = {
  id: 'centerDescription',
  width: '12',
  title: 'Center Description',
  onChange: jest.fn(() => {})
};
const wrapper = shallow(<TextArea {...props} />);

describe('TextArea Component', () => {
  it('should render contact person form', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
