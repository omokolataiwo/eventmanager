import React from 'react';
import { shallow } from 'enzyme';
import BookingTable from '../../../client/src/components/containers/BookingTable';
import { events } from '../../__mocks__/event';

const props = {
  events: []
};
const wrapper = shallow(<BookingTable {...props} />);

describe('BookingTable Component', () => {
  it('should render no event components', () => {
    expect(wrapper.find('div').text()).toEqual(
      'No events for your center yet.'
    );
  });
  it('should render event table components', () => {
    const eventTitleAt = index =>
      wrapper
        .find('tr')
        .at(index)
        .children()
        .first()
        .text();
    wrapper.setProps({ events });
    expect(wrapper.find('tr').length).toEqual(3);
    expect(eventTitleAt(1)).toEqual('Birthday Party');
    expect(eventTitleAt(2)).toEqual('Wedding Anniversary');
  });
});
