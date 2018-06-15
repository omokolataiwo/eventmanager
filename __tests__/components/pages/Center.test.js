import React from 'react';
import { mount } from 'enzyme';
import { Center } from '../../../client/src/components/pages/Center';
import { center } from '../../__mocks__/center';
import { contactAda } from '../../__mocks__/contact';

const history = [];
const props = {
  history: {
    push: jest.fn(path => history.push(path)),
    replace: jest.fn(path => history.push(path))
  },
  center: {},
  match: {
    params: { id: '2' }
  },
  action: {},
  fetchCenterRequest: jest.fn(() => Promise.resolve(1)),
  handleBookEvent: jest.fn(() => Promise.resolve(1)),
  reset: jest.fn(() => Promise.resolve(1))
};

const wrapper = mount(<Center {...props} />);

describe('Center Component', () => {
  it('render preloader', () => {
    wrapper.setProps({
      action: { getCenter: 'FETCHING_CENTER' }
    });
    expect(wrapper.find('.preloader-wrapper').exists()).toBe(true);
  });
  it('redirect to 404 page when center not found', () => {
    wrapper.setProps({
      action: { getCenter: 'FETCHING_CENTER_ERROR' }
    });
    expect(history.pop()).toEqual('/404');
  });

  it('render self with center details', () => {
    wrapper.setProps({
      action: { getCenter: 'RECEIVED_CENTER' },
      center: { ...center, contacts: null }
    });
    expect(wrapper.find('.contact-name').exists()).toBe(false);

    wrapper.setProps({
      action: { getCenter: 'RECEIVED_CENTER' },
      center: { ...center, contacts: contactAda }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.center-name').exists()).toBe(true);
    expect(wrapper.find('.center-name').text()).toEqual('Sheba Center');
    expect(wrapper.find('.contact-name').exists()).toBe(true);
    expect(wrapper.find('.contact-name').text()).toEqual('Ada Onugwu');
  });

  it('redirect to book center page', () => {
    wrapper.find('.btn.blue').simulate('click');
    expect(history.pop()).toEqual('/user/event/create');
    wrapper.unmount();
  });
});
