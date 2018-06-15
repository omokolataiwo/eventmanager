import React from 'react';
import { shallow } from 'enzyme';
import PaginatedCentersCard from '../../../client/src/components/containers/PaginatedCentersCard';
import { centers } from '../../__mocks__/center';

jest.mock('jquery');
const props = {
  click: () => {},
  handlePagingNav: () => {},
  history: {
    push: jest.fn(() => Promise.resolve(1)),
    replace: jest.fn(() => Promise.resolve(1))
  },
  centers: [],
  count: 0,
  fetchAllCentersRequest: jest.fn(() => Promise.resolve(1))
};

const wrapper = shallow(<PaginatedCentersCard {...props} />);

describe('PaginatedCentersCard Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.find('span').text()).toEqual('Can not find center');
  });

  it('should not render when there is no center', () => {
    wrapper.setProps({ centers, count: centers.length });
    expect(wrapper.find('.event-center.card').length).toBe(2);
  });
});
