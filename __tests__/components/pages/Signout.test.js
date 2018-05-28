import React from 'react';
import { shallow } from 'enzyme';
import { Signout } from '../../../client/src/components/pages/Signout';

const props = {
  history: {
    replace: jest.fn(() => {})
  },
  signoutRequest: jest.fn(() => {})
};

const wrapper = shallow(<Signout {...props} />);

describe('Signout Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
