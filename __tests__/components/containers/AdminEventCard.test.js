import React from 'react';
import { shallow } from 'enzyme';
import AdminEventCard from '../../../client/src/components/containers/AdminEventCard';
import { events } from '../../__mocks__/event';

const props = {
  events
};
const wrapper = shallow(<AdminEventCard {...props} />);

describe('AdminEventCard Component', () => {
  it('should render no event components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render no event components', () => {
    wrapper.setProps({ events: [] });
    expect(wrapper.exists()).toBe(true);
  });
});
