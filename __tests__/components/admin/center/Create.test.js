import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../../client/src/components/admin/center/Create';
import { contacts } from '../../../__mocks__/contact';

const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  contacts,
  createErrors: {},
  getContactPersonRequest: jest.fn(() => {}),
  createCenterRequest: jest.fn(() => {})
};

const wrapper = shallow(<Create {...props} />);

describe('Create Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
