import React from 'react';
import { shallow } from 'enzyme';
import { Index } from '../../../../client/src/components/admin/center/Index';
import { centers } from '../../../__mocks__/center';

const history = [];
const props = {
  history: {
    push: jest.fn(path => history.push(path))
  },
  centers,
  fetchAdminCentersRequest: jest.fn(() => {}),
  count: 2,
  action: {
    getCenters: 'FETCHING_ADMIN_CENTERS'
  }
};

const wrapper = shallow(<Index {...props} />);

describe('Index Component', () => {
  it('Render preloader', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('Render center not found', () => {
    wrapper.setProps({
      ...props,
      action: {
        getCenters: 'FETCHING_ADMIN_CENTERS_ERROR'
      }
    });

    expect(wrapper.find('.no-event-admin').exists()).toBe(true);
  });
  it('add centers to state', () => {
    wrapper.setProps({
      ...props,
      action: {
        getCenters: 'RECEIVED_ADMIN_CENTERS'
      }
    });
    expect(wrapper.state().centers[0].name).toEqual('Sheba Center');
  });

  it('navigate to the center page', () => {
    const handleViewEventsSpy = jest.spyOn(
      wrapper.instance(),
      'handleViewEvents'
    );
    const instance = wrapper.instance();
    instance.handleViewEvents(3);
    expect(history.pop()).toEqual('/admin/center/events/3');
  });

  it('navigate to the edit center page', () => {
    const handleEditCenterSpy = jest.spyOn(
      wrapper.instance(),
      'handleEditCenter'
    );
    const instance = wrapper.instance();
    instance.handleEditCenter(3);
    expect(history.pop()).toEqual('/admin/center/update/3');
  });

  it('change active center', () => {
    const changeActiveCenterSpy = jest.spyOn(
      wrapper.instance(),
      'changeActiveCenter'
    );
    const instance = wrapper.instance();
    instance.changeActiveCenter(2);
    expect(wrapper.state().activeCenter.name).toEqual('Immaculate Garden');
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
