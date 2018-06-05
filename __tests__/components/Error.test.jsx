import React from 'react';
import { shallow } from 'enzyme';
import Error from '../../client/src/components/containers/Error';

const props = { messages: [{ email: ['Invalid email address'] }] };
const wrapper = shallow(<Error {...props} />);

describe('Error Component', () => {
  it('should render error component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
