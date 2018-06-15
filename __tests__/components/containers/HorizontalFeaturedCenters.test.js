import React from 'react';
import { mount } from 'enzyme';
import { HorizontalFeaturedCenters } from '../../../client/src/components/containers/HorizontalFeaturedCenters';
import { centers } from '../../__mocks__/center';

const history = [];
const props = {
  history: {
    push: jest.fn(path => history.push(path)),
    replace: jest.fn(() => Promise.resolve(1))
  },
  centers: [],
  count: 0,
  fetchAllCentersRequest: jest.fn(() => Promise.resolve(1))
};

const wrapper = mount(<HorizontalFeaturedCenters {...props} />);

describe('HorizontalFeaturedCenters Component', () => {
  it('should render self', () => {
    expect(wrapper.find('.no-center').text()).toEqual('Can not find center');
  });
  it('should centers card', () => {
    wrapper.setProps({ centers, count: centers.length });
    expect(wrapper.find('.event-center.card').length).toEqual(2);
    expect(
      wrapper
        .find('.event-center.card')
        .first()
        .text()
    ).toContain('Sheba Center');
  });

  it('should populate center pop up and book center', () => {
    wrapper
      .find('.event-center.card')
      .first()
      .simulate('click');
    expect(wrapper.find('.modal-center h4').text()).toEqual('Sheba Center');
    wrapper.find('.modal-center .btn').simulate('click');
    expect(localStorage.getItem('choice-center')).toEqual(1);
    expect(history.pop()).toEqual('/user/event');
  });
});
