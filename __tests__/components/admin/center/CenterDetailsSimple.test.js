import React from 'react';
import { shallow } from 'enzyme';
import CenterDetailsSimple from '../../../../client/src/components/admin/center/CenterDetailsSimple';
import { center } from '../../../__mocks__/center';

const props = {
  history: {
    push: jest.fn(() => { }),
    replace: jest.fn(() => { })
  },
  center
};

const wrapper = shallow(<CenterDetailsSimple {...props} />);

describe('CenterDetailsSimple Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
    wrapper.setProps({ ...props, center: { ...center, image: null } });
  });
});
