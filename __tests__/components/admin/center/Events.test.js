import React from 'react';
import { shallow } from 'enzyme';
import { Events } from '../../../../client/src/components/admin/center/Events';
import { events } from '../../../__mocks__/event';
import { center } from '../../../__mocks__/center';

const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  match: { params: { id: '1' } },
  fetchCenterRequest: jest.fn(() => {}),
  reset: jest.fn(() => {}),
  count: '2',
  events,
  center,
  action: {
    getCenter: 'FETCHING_CENTER_REQUEST'
  }
};

const wrapper = shallow(<Events {...props} />);

describe('Events Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
