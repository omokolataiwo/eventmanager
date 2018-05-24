import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '../../../../client/src/components/containers/forms/DatePicker';

const props = {
  id: 'startDate',
  width: '6',
  title: 'Start Date',
  onChange: jest.fn(() => {})
};
const wrapper = shallow(<DatePicker {...props} />);

describe('DatePicker Component', () => {
  it('should render contact person form', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
