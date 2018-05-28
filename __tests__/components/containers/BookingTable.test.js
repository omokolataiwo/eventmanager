import React from 'react';
import { shallow } from 'enzyme';
import BookingTable from '../../../client/src/components/containers/BookingTable';
import { events } from '../../__mocks__/event';

const props = {
  events
};
const wrapper = shallow(<BookingTable {...props} />);

describe('BookingTable Component', () => {
  it('should render event table components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render no event components', () => {
    wrapper.setProps({ events: [] });
    expect(wrapper.exists()).toBe(true);
  });
});
