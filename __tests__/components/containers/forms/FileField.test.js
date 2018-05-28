import React from 'react';
import { shallow } from 'enzyme';
import FileField from '../../../../client/src/components/containers/forms/FileField';

const props = {
  id: 'image',
  width: '6',
  accept: 'image/*',
  onChange: jest.fn(() => {})
};
const wrapper = shallow(<FileField {...props} />);

describe('FileField Component', () => {
  it('should render contact person form', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
