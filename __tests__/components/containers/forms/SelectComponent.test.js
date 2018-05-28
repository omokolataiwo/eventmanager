import React from 'react';
import { shallow } from 'enzyme';
import SelectComponent from '../../../../client/src/components/containers/forms/SelectComponent';

const props = {
  id: 'state',
  options: [['0', 'Lagos'], ['1', 'Abuja']],
  width: '6',
  label: 'Center State'
};
const wrapper = shallow(<SelectComponent {...props} />);

describe('SelectComponent Component', () => {
  it('should render contact person form', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
