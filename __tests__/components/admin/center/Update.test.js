import React from 'react';
import { shallow } from 'enzyme';
import { Update } from '../../../../client/src/components/admin/center/Update';
import { center } from '../../../__mocks__/center';
import { contacts } from '../../../__mocks__/contact';

const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  updateCenterRequest: jest.fn(() => {}),
  getContactPersonRequest: jest.fn(() => {}),
  fetchCenterRequest: jest.fn(() => {}),
  reset: jest.fn(() => {}),
  contacts,
  match: {
    params: {
      id: '1'
    }
  },
  center,
  getCenterAction: {},
  getContactAction: {},
  updateAction: {},
  updateErrors: {}
};

const wrapper = shallow(<Update {...props} />);

describe('Update Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
