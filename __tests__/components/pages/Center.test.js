import React from 'react';
import { shallow } from 'enzyme';
import { Center } from '../../../client/src/components/pages/Center';

const history = [];
const props = {
  history: {
    push: jest.fn(path => history.push(path)),
    replace: jest.fn(path => history.push(path))
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
  handleBookEvent: jest.fn(() => Promise.resolve(1)),
  reset: jest.fn(() => Promise.resolve(1))
};

const wrapper = shallow(<Center {...props} />);
wrapper.setProps({
  action: { getCenter: 'FETCHING_CENTER' }
});

describe('Center Component', () => {
  it('Render self and sub components', () => {
    wrapper.setProps({
      action: { getCenter: 'RECEIVED_CENTER' },
      center: { ...props.center }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.center-name').exists()).toBe(true);
    expect(wrapper.find('.center-name').text()).toEqual('Sheba Center');
    expect(wrapper.find('.contact-name').exists()).toBe(true);
    expect(wrapper.find('.contact-name').text()).toEqual('Adeoye Taiwo');
    wrapper.setProps({
      action: { getCenter: 'RECEIVED_CENTER' },
      center: { ...props.center, contacts: null }
    });
    expect(wrapper.find('.contact-name').exists()).toBe(false);
  });
  it('Redirect to 404 page when center not found', () => {
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(),
      'componentWillReceiveProps'
    );
    wrapper.setProps({
      action: { getCenter: 'FETCHING_CENTER_ERROR' }
    });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    expect(history.pop()).toEqual('/404');
  });
  it('Redirect to book center page', () => {
    const instance = wrapper.instance();
    instance.handleBookEvent({ preventDefault: jest.fn(() => {}) });
    expect(history.pop()).toEqual('/user/event/create');
  });
  it('Render Preloader', () => {
    wrapper.setProps({
      action: { getCenter: 'FETCHING_CENTER' }
    });
    wrapper.unmount();
  });
});
