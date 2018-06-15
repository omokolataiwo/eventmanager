import React from 'react';
import { shallow } from 'enzyme';
import CenterDetailsSimple from '../../../../client/src/components/admin/center/CenterDetailsSimple';
import { center } from '../../../__mocks__/center';

const props = {
  history: {
    push: jest.fn(() => {}),
    replace: jest.fn(() => {})
  },
  center: {}
};

const wrapper = shallow(<CenterDetailsSimple {...props} />);

describe('CenterDetailsSimple Component', () => {
  it('should render center with center details', () => {
    wrapper.setProps({ center });
    const centerDetials = wrapper.find('.event-center-detailed').childAt(1);
    expect(centerDetials.find('h5').text()).toEqual('Sheba Center');
    expect(centerDetials.find('.type').text()).toEqual('Conference Center');
  });
});
