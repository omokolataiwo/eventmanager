import React from 'react';
import { shallow } from 'enzyme';
import { Verification } from '../../../../client/src/components/admin/center/Verification';

const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  }
};

const wrapper = shallow(<Verification {...props} />);

describe('Verification Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
