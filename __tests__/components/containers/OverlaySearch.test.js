import React from 'react';
import { shallow } from 'enzyme';
import OverlaySearch from '../../../client/src/components/containers/OverlaySearch';
import toastr from '../../__mocks__/toastr';
const history = [];

const props = {
  history: {
    push: jest.fn(path => history.push(path))
  }
};
const wrapper = shallow(<OverlaySearch {...props} />);

describe('OverlaySearch Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.find('.search-cover').exists()).toBe(true);
  });
  it('displays on search parameter', () => {
    wrapper.setState({
      switch: {
        ...wrapper.state().switch,
        capacity: true,
        type: true,
        amount: true
      }
    });
  });

  it('notify when no search term is given', () => {
    const instance = wrapper.instance();
    instance.search({ preventDefault: () => {} });
    expect(toastr.error).toHaveBeenCalled();
  });

  it('handle select field changed', () => {
    const instance = wrapper.instance();
    instance.handleStateChanged({ target: { value: 26 } });
    expect(wrapper.state('params').state).toEqual(26);
    instance.handleCenterTypeChanged({ target: { value: 3 } });
    expect(wrapper.state('params').type).toEqual(3);
  });

  it('set search parameter', () => {
    const instance = wrapper.instance();
    instance.search({ preventDefault: () => {} });
    expect(history.pop()).toEqual('/search');
    expect(localStorage.getItem('SEARCH_PARAMS')).toEqual(
      '{"state":26,"type":3}'
    );
  });
});
