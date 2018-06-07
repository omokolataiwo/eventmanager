import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../../client/src/components/admin/center/Create';
import { contacts } from '../../../__mocks__/contact';

const history = [];
const props = {
  history: {
    push: jest.fn(path => history.push(path)),
    replace: jest.fn(path => history.push(path))
  },
  contacts,
  createErrors: {},
  createAction: {},
  contactAction: {},
  getContactPersonRequest: jest.fn(() => { }),
  createCenterRequest: jest.fn(() => { })
};

const wrapper = shallow(<Create {...props} />);

describe('Create Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should add existing center contact to create center state', () => {
    wrapper.setProps({ ...props, contactAction: { ...props.contactAction, getCenterContact: 'RECEIVED_CENTER_CONTACTS' } });
    expect(wrapper.state().center.contact.existingContacts.length).toEqual(2)
  });

  it('should set state for new contact', () => {
    wrapper.setProps({ ...props, contacts: [], contactAction: { ...props.contactAction, getCenterContact: 'RECEIVED_CENTER_CONTACTS' } });
    expect(wrapper.state().center.newContact).toBeTruthy();
  });

  it('should redirect to completed route', () => {
    wrapper.setProps({ ...props, createAction: { ...props.createAction, createCenter: 'CREATED_NEW_CENTER' } });
    expect(history.pop()).toEqual('/admin/center/completed');
    expect(localStorage.getItem('NEW_CENTER_CREATED')).toBeTruthy();
  });

  it('should set errors state', () => {
    wrapper.setProps({ ...props, createErrors: { name: ['Center name is required'] }, createAction: { ...props.createAction, createCenter: 'CREATING_NEW_CENTER_ERROR' } });
    expect(wrapper.state().errors.name).toEqual(['Center name is required']);
  });

  it('should toggle new contact state', () => {
    const instance = wrapper.instance();
    expect(wrapper.state().center.newContact).toBeTruthy();
    instance.handleNewContactChanged();
    expect(wrapper.state().center.newContact).toBeFalsy();
  });

  it('should change the field for contact person', () => {
    const instance = wrapper.instance();
    instance.handleContactPersonsFieldChange({ target: { id: 'firstName', value: 'Amos' } });
    expect(wrapper.state().center.contact.newContact.firstName).toEqual('Amos');
  });

  it('should change the field for center', () => {
    const instance = wrapper.instance();
    instance.handleFormFieldChanged({ target: { id: 'name', value: 'Sheba Hall' } });
    expect(wrapper.state().center.name).toEqual('Sheba Hall');
  });

  it('should change the image field for center', () => {
    const instance = wrapper.instance();
    instance.handleImageFieldChanged({ target: { id: 'image', files: [{ name: 'sheba_hall.png', type: 'image/png' }] } });
    expect(wrapper.state().center.image.name).toEqual('sheba_hall.png');
  });

  it('should create center', () => {
    const instance = wrapper.instance();
    instance.createCenter({ preventDefault: () => { } });
    expect(props.createCenterRequest).toHaveBeenCalled();
    instance.handleImageFieldChanged({ target: { id: 'image', files: [{ name: 'sheba_hall.png', type: 'app/exe' }] } });
    instance.createCenter({ preventDefault: () => { } });
    expect(wrapper.state().errors.image).toEqual(['Please upload a jpeg/png format image.'])
  });

  it('should set error message for contact person firstName required', () => {
    const instance = wrapper.instance();
    instance.handleContactPersonsFieldChange({ target: { id: 'firstName', value: '' } });
    expect(wrapper.state().errors.firstName[0]).toEqual('First name is required');
  });
});
