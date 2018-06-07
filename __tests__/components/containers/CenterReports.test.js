import React from 'react';
import { shallow } from 'enzyme';
import CenterReports from '../../../client/src/components/containers/CenterReports';
import { centers, center } from '../../__mocks__/center';
import { eventBirthday } from '../../__mocks__/event';

const props = {
  centers,
  activeCenter: {
    events: [eventBirthday]
  },
  changeCenter: () => { }
};
const wrapper = shallow(<CenterReports {...props} />);

describe('CenterReports Component', () => {
  it('should render center with events', () => {
    expect(wrapper.find('h6').text()).toEqual('1 event');
  });
  it('should not render when there is no center', () => {
    wrapper.setProps({ ...props, centers: [] })
    expect(wrapper.find('div').text()).toEqual('No center registered. Please register a center.');
  });
});
