import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../../client/src/components/user/event/Create';
import { centers } from '../../../__mocks__/center';
import { eventBirthday } from '../../../__mocks__/event';

const props = {
  createEventRequest: jest.fn(() => {}),
  fetchAllCentersRequest: jest.fn(() => {}),
  actions: {},
  history: { push: jest.fn(() => {}) },
  count: '2',
  resetEventState: jest.fn(() => {}),
  centers,
  match: {
    params: { index: '2' }
  },
  event: eventBirthday,
  errors: {},
  centerAction: {},
  reset: jest.fn(() => {})
};

const wrapper = shallow(<Create {...props} />);

describe('Create Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
