import React from 'react';
import { shallow } from 'enzyme';
import { Signout } from '../../../client/src/components/pages/Signout';
import toastr from '../../__mocks__/toastr';

const history = [];
const props = {
  history: {
    replace: jest.fn(path => {
      history.push(path);
    })
  },
  signoutRequest: jest.fn(() => {})
};

const wrapper = shallow(<Signout {...props} />);

describe('Signout Component', () => {
  it('should request signout and redirect to base page', () => {
    expect(props.signoutRequest).toHaveBeenCalled();
    expect(toastr.success).toHaveBeenCalledWith('Sign out successfully.');
    expect(history.pop()).toEqual('/');
  });
});
