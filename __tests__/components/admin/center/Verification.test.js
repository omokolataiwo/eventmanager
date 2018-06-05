import React from 'react';
import { shallow } from 'enzyme';
import { Verification } from '../../../../client/src/components/admin/center/Verification';
const history = [];
const props = {
  history: {
    push: jest.fn(path => history.push(path)),
    replace: jest.fn(path => history.push(path))
  }
};

const wrapper = shallow(<Verification {...props} />);

localStorage.setItem('NEW_CENTER_CREATED', true);
describe('Verification Component', () => {
  it('should not render when center is not created.', () => {
    expect(history.pop()).toEqual('/admin');
  });
  it('should render component.', () => {
    wrapper.setProps({ ...props });
  });
});
