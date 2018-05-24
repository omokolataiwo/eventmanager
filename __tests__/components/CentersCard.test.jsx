import React from 'react';
import { shallow } from 'enzyme';
import CentersCard from '../../client/src/components/containers/CentersCard';
import { centers } from '../__mocks__/center';

const props = { centers, count: centers.length, handlePagingNav: () => {} };
const wrapper = shallow(<CentersCard {...props} />);

describe('CentersCard Component', () => {
  it('should render center card', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
