import React from 'react';
import { shallow } from 'enzyme';
import { Verification } from '../../../../client/src/components/admin/center/Verification';
const history = [];
const props = {
  history: {
    push: jest.fn(path => history.push(path)),
    replace: jest.fn(path => history.push(path))
  },
  reset: () => {}
};
localStorage.setItem('NEW_CENTER_CREATED', true);
const wrapper = shallow(<Verification {...props} />);

describe('Verification Component', () => {
  it('should render component.', () => {
    expect(wrapper.find('h5').text()).toEqual('New Center Created.');
  });

  it('should redirect to dashboard if new center is not created.', () => {
    shallow(<Verification {...props} />);
    expect(history.pop()).toEqual('/admin');
  });
});
