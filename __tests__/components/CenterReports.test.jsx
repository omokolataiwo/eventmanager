import React from 'react';
import { shallow } from 'enzyme';
import CenterReports from '../../client/src/components/containers/CenterReports';
import { centers, center } from '../__mocks__/center';
import { eventBirthday } from '../__mocks__/event';

const props = {
  centers,
  activeCenter: {
    events: [eventBirthday]
  },
  changeCenter: () => {}
};
const wrapper = shallow(<CenterReports {...props} />);

describe('CenterReports Component', () => {
  it('should render center with events', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
