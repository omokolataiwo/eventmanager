import React from 'react';
import { shallow } from 'enzyme';
import { Events } from '../../../../client/src/components/admin/center/Events';
import { events } from '../../../__mocks__/event';
import { center } from '../../../__mocks__/center';

const history = [];

const props = {
  history: {
    push: jest.fn(path => history.push(path)),
    replace: jest.fn(path => history.push(path))
  },
  match: { params: { id: '1' } },
  fetchCenterRequest: jest.fn(() => { }),
  adminCancelEventRequest: jest.fn(() => { }),
  reset: jest.fn(() => { }),
  count: 2,
  events,
  center,
  action: {
    getCenter: 'FETCHING_CENTER_REQUEST'
  }
};

const wrapper = shallow(<Events {...props} />);

describe('Events Component', () => {
  it('renders preloader', () => {
    wrapper.setProps({ ...props, action: { getCenter: 'FETCHING_CENTER' } })
    expect(wrapper.exists()).toBe(true);
  });

  it('redirects to 404 page if center does not exist', () => {
    wrapper.setProps({ ...props, action: { getCenter: 'FETCHING_CENTER_ERROR' } });
    expect(history.pop()).toEqual('/404');
  });

  it('handlePagingNav to call fetchCenterRequest', () => {
    const handlePagingNavSpy = jest.spyOn(
      wrapper.instance(),
      'handlePagingNav'
    );
    const instance = wrapper.instance();
    instance.handlePagingNav(3);
    expect(props.fetchCenterRequest).toHaveBeenCalled();
  });

  it('cancelEvent to call adminCancelEventRequest', () => {
    const cancelEventSpy = jest.spyOn(
      wrapper.instance(),
      'cancelEvent'
    );
    const instance = wrapper.instance();
    instance.cancelEvent();
    expect(props.adminCancelEventRequest).toHaveBeenCalled();
  });

  it('Store event that is to be cancelled in state', () => {
    const handleDeletePopEventSpy = jest.spyOn(
      wrapper.instance(),
      'handleDeletePopEvent'
    );
    const instance = wrapper.instance();
    instance.handleDeletePopEvent(3);
    expect(wrapper.state().poppedEvent).toEqual(3);
    wrapper.unmount();
  });
});
