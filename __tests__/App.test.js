import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../client/src/App';

const props = {
  user: {
    authenticated: true,
    userdata: { role: 1 }
  },
  history: { push: () => {} },
  match: { path: '/' }
};

const wrapper = shallow(<App {...props} />);

describe('App Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
