import React from 'react';
import { shallow } from 'enzyme';
import Error404 from '../../../client/src/components/pages/Error404';

const wrapper = shallow(<Error404 />);

describe('Error404 Component', () => {
  it('should render self', () => {
    expect(wrapper.find('.center').text()).toEqual('Resource Not Found!');
  });
});
