import React from 'react';
import { mount } from 'enzyme';
import { Search } from '../../../client/src/components/pages/Search';
import { centers } from '../../__mocks__/center';
const searched = centers.map(center => ({ ...center, count: centers.length }));
const props = {
  history: {
    push: jest.fn(() => {})
  },
  searched: [],
  searchCenterRequest: jest.fn(() => {})
};
localStorage.setItem('SEARCH_PARAMS', '{ "name": "Knig" }');
const wrapper = mount(<Search {...props} />);

describe('Search Component', () => {
  it('should render without search result', () => {
    expect(
      wrapper
        .find('.row.card div')
        .children()
        .at(3)
        .text()
    ).toEqual('No Center Found.');
  });

  it('should render search result center components', () => {
    wrapper.setProps({
      searched
    });

    expect(wrapper.state().centers.length).toEqual(centers.length);
    expect(wrapper.find('.event-center.card').length).toEqual(centers.length);
    expect(
      wrapper
        .find('.event-center.card div h4')
        .first()
        .text()
    ).toEqual('Sheba Center');
  });

  it('Search for centers with pagination', () => {
    const instance = wrapper.instance();
    instance.handlePagingNav(2);
    expect(props.searchCenterRequest).toHaveBeenCalled();
  });
});
