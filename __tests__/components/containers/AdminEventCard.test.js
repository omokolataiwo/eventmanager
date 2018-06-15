import React from 'react';
import { shallow } from 'enzyme';
import AdminEventCard from '../../../client/src/components/containers/AdminEventCard';
import { events } from '../../__mocks__/event';
import user from '../../__mocks__/user';

let eventsWithUser = events.map(event => {
  return { ...event, ...user.userdata };
});

const props = {
  events: [],
  handleDeletePopEvent: jest.fn(eventid => {
    wrapper.setProps({
      events: eventsWithUser.filter(event => event.id !== eventid)
    });
  })
};
const wrapper = shallow(<AdminEventCard {...props} />);

describe('AdminEventCard Component', () => {
  it('should render no event components', () => {
    expect(wrapper.find('.center').text()).toEqual(
      'No Event booked for this center.'
    );
  });
  it('should render event cards component', () => {
    wrapper.setProps({ events: eventsWithUser });
    const titles = wrapper.find('h6 span');
    expect(titles.at(0).text()).toEqual('Birthday Party');
    expect(titles.at(1).text()).toEqual('Wedding Anniversary');
  });
  it('should remove event card', () => {
    const cancelEventIcon = wrapper.find('.delete').first();
    cancelEventIcon.simulate('click');
    cancelEventIcon.simulate('keyup');

    expect(wrapper.find('h6 span').length).toEqual(1);
  });
});
