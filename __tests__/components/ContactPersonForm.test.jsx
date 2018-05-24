import React from 'react';
import { shallow } from 'enzyme';
import ContactPersonForm from '../../client/src/components/containers/ContactPersonForm';

const props = { onFieldChange: () => {} };
const wrapper = shallow(<ContactPersonForm {...props} />);

describe('ContactPersonForm Component', () => {
  it('should render contact person form', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
