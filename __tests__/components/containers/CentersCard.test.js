import React from 'react';
import { shallow } from 'enzyme';
import CentersCard from '../../../client/src/components/containers/CentersCard';
import { centers } from '../../__mocks__/center';

const props = { centers: [], count: 0, handlePagingNav: () => {} };
const wrapper = shallow(<CentersCard {...props} />);

describe('CentersCard Component', () => {
  it('should not render center card when center is not provided', () => {
    expect(wrapper.find('.row.center').exists()).toBe(false);
  });
  it('should render center card', () => {
    wrapper.setProps({ centers, count: centers.length });
    expect(wrapper.find('.row.center').exists()).toBe(true);
    expect(wrapper.find('.event-center.card').length).toEqual(2);
    expect(
      wrapper
        .find('.event-center.card h4')
        .first()
        .text()
    ).toEqual('Sheba Center');
  });
});
