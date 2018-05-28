import React from 'react';
import { shallow } from 'enzyme';
import CenterContactPerson from '../../../client/src/components/containers/CenterContactPerson';
import { contacts } from '../../__mocks__/contact';

const props = {
  existingContacts: contacts,
  newContact: false,
  onNewContactChanged: () => {},
  onFieldChange: () => {},
  onSelectContactChanged: () => {},
  errors: {}
};
const wrapper = shallow(<CenterContactPerson {...props} />);

describe('CenterContactPerson Component', () => {
  it('should render contact person component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
