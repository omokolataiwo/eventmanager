import React from 'react';
import { mount } from 'enzyme';
import CenterContactPerson from '../../../client/src/components/containers/CenterContactPerson';
import { contacts } from '../../__mocks__/contact';

const props = {
  existingContacts: [],
  newContact: false,
  onNewContactChanged: () => {},
  onFieldChange: () => {},
  onSelectContactChanged: () => {},
  errors: {}
};
const wrapper = mount(<CenterContactPerson {...props} />);

describe('CenterContactPerson Component', () => {
  it('should render contact form when there is no existing contacts', () => {
    expect(wrapper.find('.new-contact-form').exists()).toBeTruthy();
    expect(wrapper.find('input#firstName').exists()).toBeTruthy();
  });
  it('should render contact person select component', () => {
    wrapper.setProps({ existingContacts: contacts });
    expect(wrapper.find('select#contactId').exists()).toBeTruthy();
    expect(wrapper.find('select#contactId option').length).toEqual(3);
  });
});
