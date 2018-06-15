import React from 'react';
import { mount } from 'enzyme';
import { Index } from '../../../../client/src/components/admin/center/Index';
import { centers } from '../../../__mocks__/center';

const history = [];
const props = {
  history: {
    push: jest.fn(path => history.push(path))
  },
  centers: [],
  fetchAdminCentersRequest: jest.fn(() => {}),
  count: 0,
  action: {
    getCenters: 'FETCHING_ADMIN_CENTERS'
  }
};

const wrapper = mount(<Index {...props} />);

describe('Index Component', () => {
  it('should render preloader on mount', () => {
    expect(wrapper.find('.preloader-wrapper').exists()).toBe(true);
  });
  it('Render center not found', () => {
    wrapper.setProps({
      ...props,
      action: {
        getCenters: 'FETCHING_ADMIN_CENTERS_ERROR'
      }
    });

    expect(
      wrapper
        .find('.no-event-admin')
        .childAt(1)
        .text()
    ).toEqual('There is no booking information for your centers.');
  });
  it('add centers to state', () => {
    wrapper.setProps({
      centers,
      count: centers.length,
      action: {
        getCenters: 'RECEIVED_ADMIN_CENTERS'
      }
    });

    // Render center details component
    expect(wrapper.state().centers[0].name).toEqual('Sheba Center');
    expect(wrapper.find('.event-center-detailed .details h5').text()).toEqual(
      'Sheba Center'
    );
    expect(
      wrapper
        .find('.event-center-detailed .location')
        .childAt(1)
        .text()
    ).toEqual('Lagos');
  });

  it('navigate to update and view center page', () => {
    // Redirect to view center page
    wrapper
      .find('.btn.blue')
      .at(1)
      .simulate('click');
    wrapper
      .find('.btn.blue')
      .at(1)
      .simulate('keydown');
    expect(history.pop()).toEqual('/admin/center/events/1');
    // Redirect to edit center page
    wrapper
      .find('.btn.blue')
      .first()
      .simulate('click');
    wrapper
      .find('.btn.blue')
      .first()
      .simulate('keydown');
    expect(history.pop()).toEqual('/admin/center/update/1');
  });

  it('change active center', () => {
    wrapper
      .find('.event-center.card')
      .at(1)
      .simulate('click');
    expect(wrapper.state().activeCenter.name).toEqual('Immaculate Garden');
    // center details should change
    expect(wrapper.find('.event-center-detailed .details h5').text()).toEqual(
      'Immaculate Garden'
    );
  });

  it('handlePagingNav to call fetchCenterEventRequest', () => {
    const handlePagingNavSpy = jest.spyOn(
      wrapper.instance(),
      'handlePagingNav'
    );
    const instance = wrapper.instance();
    instance.handlePagingNav(3);
    expect(props.fetchAdminCentersRequest).toHaveBeenCalled();
  });
});
