import React from 'react';
import { shallow } from 'enzyme';
import CenterDetailsEdit from '../../../../client/src/components/admin/center/CenterDetailsEdit';
import { center } from '../../../__mocks__/center';

const props = {
  center,
  click: jest.fn(() => { }),
  handleViewEvents: jest.fn(() => { })
};

const wrapper = shallow(<CenterDetailsEdit {...props} />);

describe('CenterDetailsEdit Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
