import React from 'react';
import { shallow } from 'enzyme';
import { Search } from '../../../client/src/components/pages/Search';
import { centers } from '../../__mocks__/center';
const props = {
  history: {
    push: jest.fn(() => {})
  },
  searched: centers,
  searchCenterRequest: jest.fn(() => {})
};
localStorage.setItem('SEARCH_PARAMS', '{ "name": "Knig" }');
const wrapper = shallow(<Search {...props} />);

describe('Search Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Save searched centers', () => {
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(),
      'componentWillReceiveProps'
    );
    wrapper.setProps({
      searched: centers
    });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    expect(wrapper.state().centers.length).toEqual(centers.length);
  });

  it('Search for centers with pagination', () => {
    const instance = wrapper.instance();
    instance.handlePagingNav(2);
    expect(props.searchCenterRequest).toHaveBeenCalled();
  });
});
