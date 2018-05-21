import React from 'react';
import { shallow } from 'enzyme';
import { Center } from '../../client/src/components/pages/Center';

const props = {
  history: {
    push: jest.fn(() => Promise.resolve(1)),
    replace: jest.fn(() => Promise.resolve(1))
  },
  center: {
    name: 'Sheba Center',
    contacts: {
      firstName: 'Adeoye',
      lastName: 'Taiwo'
    }
  },
  match: {
    params: { id: '2' }
  },
  action: {},
  fetchCenterRequest: jest.fn(() => Promise.resolve(1)),
  reset: jest.fn(() => Promise.resolve(1))
};

const wrapper = shallow(<Center {...props} />);

describe('Center Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.center-name').exists()).toBe(true);
    expect(wrapper.find('.center-name').text()).toEqual('Sheba Center');
    expect(wrapper.find('.contact-name').exists()).toBe(true);
    expect(wrapper.find('.contact-name').text()).toEqual('Adeoye Taiwo');
  });
});
