import React from 'react';
import { shallow } from 'enzyme';
import { Slider } from '../../../client/src/components/containers/Slider';
import { centers } from '../../__mocks__/center';

const wrapper = shallow(<Slider />);

describe('Slider Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.find('li img').length).toEqual(7);
  });
});
