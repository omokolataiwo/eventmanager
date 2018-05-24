import React from 'react';
import { shallow } from 'enzyme';
import PaginatedCentersCard from '../../../client/src/components/containers/PaginatedCentersCard';

jest.mock('jquery');
const props = {
  click: () => {},
  handlePagingNav: () => {},
  history: {
    push: jest.fn(() => Promise.resolve(1)),
    replace: jest.fn(() => Promise.resolve(1))
  },
  centers: [
    {
      name: 'Sheba Center',
      image: 'center_image.png',
      contacts: {
        firstName: 'Adeoye',
        lastName: 'Taiwo'
      }
    }
  ],
  count: 1,
  fetchAllCentersRequest: jest.fn(() => Promise.resolve(1))
};

const wrapper = shallow(<PaginatedCentersCard {...props} />);

describe('PaginatedCentersCard Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
