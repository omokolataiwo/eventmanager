import React from 'react';
import { shallow } from 'enzyme';
import { Update } from '../../../../client/src/components/user/event/Update';
import { centers } from '../../../__mocks__/center';
import { eventBirthday } from '../../../__mocks__/event';

const props = {
  updateEventRequest: jest.fn(() => {}),
  fetchUserEventRequest: jest.fn(() => {}),
  fetchAllCentersRequest: jest.fn(() => {}),
  centers,
  match: {
    params: { index: '2' }
  },
  event: eventBirthday,
  errors: {},
  actions: {},
  reset: jest.fn(() => {})
};

const wrapper = shallow(<Update {...props} />);

describe('Update Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
