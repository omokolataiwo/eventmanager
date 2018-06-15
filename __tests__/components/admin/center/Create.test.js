import React from 'react';
import { mount } from 'enzyme';
import { Create } from '../../../../client/src/components/admin/center/Create';
import { contacts } from '../../../__mocks__/contact';

const history = [];

const props = {
  history: {
    push: jest.fn(path => history.push(path)),
    replace: jest.fn(path => history.push(path))
  },
  contacts: [],
  createErrors: {},
  createAction: {},
  contactAction: {},
  getContactPersonRequest: jest.fn(() => {}),
  createCenterRequest: jest.fn(() => {})
};

const wrapper = mount(<Create {...props} />);

describe('Create Component', () => {
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.row h5.left').text()).toEqual('CREATE NEW CENTER');
  });

  it('should render contact person select field when contact person exist', () => {
    wrapper.setProps({
      ...props,
      contacts,
      contactAction: {
        ...props.contactAction,
        getCenterContact: 'RECEIVED_CENTER_CONTACTS'
      }
    });

    expect(wrapper.state().center.contact.existingContacts.length).toEqual(
      contacts.length
    );

    const contactPersonSelect = wrapper.find('select#contactId');
    expect(contactPersonSelect.children()).toHaveLength(contacts.length + 1);
    expect(contactPersonSelect.childAt(1).text()).toEqual('Ada Onugwu');
  });

  it('should not render contact person select field when there is non existing contact person', () => {
    wrapper.setProps({
      ...props,
      contacts: [],
      contactAction: {
        ...props.contactAction,
        getCenterContact: 'RECEIVED_CENTER_CONTACTS'
      }
    });
    expect(wrapper.state().center.newContact).toBeTruthy();
    expect(wrapper.find('select#contactId').exists()).toBeFalsy();
    expect(wrapper.find('.new-contact-form').exists()).toBeTruthy();
  });

  it('should redirect to completed route when new center is created', () => {
    wrapper.setProps({
      ...props,
      createAction: {
        ...props.createAction,
        createCenter: 'CREATED_NEW_CENTER'
      }
    });
    expect(history.pop()).toEqual('/admin/center/completed');
    expect(localStorage.getItem('NEW_CENTER_CREATED')).toBeTruthy();
  });

  it('should set errors to state when error occurs', () => {
    wrapper.setProps({
      ...props,
      createErrors: { name: ['Center name is required'] },
      createAction: {
        ...props.createAction,
        createCenter: 'CREATING_NEW_CENTER_ERROR'
      }
    });
    expect(wrapper.state().errors.name).toEqual(['Center name is required']);
    expect(wrapper.find('.name .errors span').text()).toEqual(
      'Center name is required '
    );
  });

  it('should toggle new contact lever', () => {
    wrapper.setProps({
      ...props,
      contacts,
      contactAction: {
        ...props.contactAction,
        getCenterContact: 'RECEIVED_CENTER_CONTACTS'
      }
    });

    const contactPersonSelect = wrapper.find('select#contactId');

    expect(wrapper.state().center.newContact).toBeFalsy();
    expect(contactPersonSelect.childAt(1).text()).toEqual('Ada Onugwu');
    wrapper.find('.switch input').simulate('change');
    expect(wrapper.state().center.newContact).toBeTruthy();
    expect(wrapper.find('.new-contact-form').exists()).toBeTruthy();
  });

  it('should change the field for contact person', () => {
    wrapper
      .find('input#firstName')
      .simulate('change', { target: { id: 'firstName', value: 'Amos' } });
    wrapper.find('.facilities').simulate('change');
    expect(wrapper.state().center.contact.newContact.firstName).toEqual('Amos');
    expect(wrapper.state().center.facilities).toEqual('table,chair');
  });

  it('should change form field for center registration form', () => {
    wrapper.find('input#name').simulate('change', {
      target: { id: 'name', value: 'New center we are creating' }
    });
    expect(wrapper.state().center.name).toEqual('New center we are creating');
  });

  it('should create center', () => {
    // Do not proceed when user upload file that is not an image
    wrapper.find('input#image').simulate('change', {
      target: {
        id: 'image',
        files: [{ name: 'sheba_hall.png', type: 'image/exe' }]
      }
    });
    wrapper.find('input.btn').simulate('click', { preventDefault: () => {} });
    expect(wrapper.state().errors.image).toEqual([
      'Please upload a jpeg/png format image.'
    ]);

    // Create center when the user upload an image file
    wrapper.find('input#image').simulate('change', {
      target: {
        id: 'image',
        files: [{ name: 'sheba_hall.png', type: 'image/png' }]
      }
    });
    wrapper.find('input.btn').simulate('click', { preventDefault: () => {} });
    expect(props.createCenterRequest).toHaveBeenCalled();
  });

  it('should set error message for contact person firstName required', () => {
    const instance = wrapper.instance();
    instance.handleContactPersonsFieldChange({
      target: { id: 'firstName', value: '' }
    });
    expect(wrapper.state().errors.firstName[0]).toEqual(
      'First name is required'
    );
  });
});
