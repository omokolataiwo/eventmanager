import React from 'react';
import { mount } from 'enzyme';
import { Update } from '../../../../client/src/components/admin/center/Update';
import { center } from '../../../__mocks__/center';
import { contacts } from '../../../__mocks__/contact';
import toastr from '../../../__mocks__/toastr';

const history = [];

const props = {
  history: {
    push: jest.fn(path => history.push(path)),
    replace: jest.fn(() => history.push(path))
  },
  updateCenterRequest: jest.fn(() => {}),
  getContactPersonRequest: jest.fn(() => {}),
  fetchCenterRequest: jest.fn(() => {}),
  reset: jest.fn(() => {}),
  contacts: [],
  match: {
    params: {
      id: '1'
    }
  },
  center,
  getCenterAction: {
    getCenter: 'FETCHING_CENTER'
  },
  getContactAction: {},
  updateAction: {},
  updateErrors: {}
};

const wrapper = mount(<Update {...props} />);

describe('Update Component', () => {
  it('should render preloader', () => {
    expect(wrapper.find('.preloader-wrapper').exists()).toBe(true);
  });

  it('redirect to 404 page if center does not exist', () => {
    wrapper.setProps({
      getCenterAction: {
        getCenter: 'FETCHING_CENTER_ERROR'
      }
    });
    expect(history.pop()).toEqual('/404');
  });

  it('should populate the center update form when center exist', () => {
    wrapper.setProps({
      center,
      getCenterAction: {
        getCenter: 'RECEIVED_ADMIN_CENTER'
      }
    });

    expect(wrapper.find('.row h5.left').text()).toEqual('UPDATE CENTER');
    expect(wrapper.find('input#name').props().defaultValue).toEqual(
      'Sheba Center'
    );
  });

  it('should render contact person select field when contact person exist', () => {
    wrapper.setProps({
      contacts,
      getContactAction: {
        getCenterContact: 'RECEIVED_CENTER_CONTACTS'
      },
      getCenterAction: {
        getCenter: 'RESET_FETCHING_CENTER'
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
      contacts: [],
      getContactAction: {
        getCenterContact: 'RECEIVED_CENTER_CONTACTS'
      },
      getCenterAction: {
        getCenter: 'RESET_FETCHING_CENTER'
      }
    });

    expect(wrapper.state().center.newContact).toBeTruthy();
    expect(wrapper.find('select#contactId').exists()).toBeFalsy();
    expect(wrapper.find('.new-contact-form').exists()).toBeTruthy();
  });

  it('should set errors to state when error occurs', () => {
    wrapper.setProps({
      updateErrors: { name: ['Center name is required'] },
      updateAction: {
        ...props.updateAction,
        updateCenter: 'UPDATING_CENTER_ERROR'
      }
    });
    expect(wrapper.state().errors.name).toEqual(['Center name is required']);

    expect(wrapper.find('.name .errors span').text()).toEqual(
      'Center name is required '
    );
  });

  it('should change form field for center registration form', () => {
    wrapper.find('input#name').simulate('change', {
      target: { id: 'name', value: 'New center we are creating' }
    });
    expect(wrapper.state().center.name).toEqual('New center we are creating');
  });

  it('should set error message for invalid email address for contact person', () => {
    wrapper
      .find('input#email')
      .simulate('change', { target: { id: 'email', value: 'fakeEmail' } });

    expect(wrapper.state().errors.email[0]).toEqual(
      'Email is not a valid email address'
    );
  });

  it('should update a center', () => {
    wrapper.find('textarea#details').simulate('change', {
      target: { id: 'details', value: 'Best place to be.' }
    });
    wrapper.find('input.btn').simulate('click', { preventDefault: () => {} });
    expect(props.updateCenterRequest).toHaveBeenCalled();
  });

  it('should notify user when update has been done', () => {
    wrapper.setProps({
      updateAction: { ...props.updateAction, updateCenter: 'UPDATED_CENTER' }
    });
    expect(toastr.success).toHaveBeenCalledWith('Center updated.');
  });

  it('should be able to upload image', () => {
    // Do not proceed when user upload file that is not an image
    wrapper.find('input#image').simulate('change', {
      target: {
        id: 'image',
        files: [{ name: 'sheba_hall.png', type: 'image/png' }]
      }
    });
    wrapper.find('input.btn').simulate('click', { preventDefault: () => {} });
    expect(wrapper.state().center.image).toEqual({
      name: 'sheba_hall.png',
      type: 'image/png'
    });
  });

  it('should toggle new contact lever', () => {
    wrapper.setProps({
      contacts,
      contactAction: {
        ...props.contactAction,
        getCenterContact: 'RECEIVED_CENTER_CONTACTS'
      }
    });
    expect(wrapper.state().center.newContact).toBeFalsy();
    const contactPersonSelect = wrapper.find('select#contactId');
    expect(contactPersonSelect.childAt(1).text()).toEqual('Ada Onugwu');

    wrapper.find('.switch input#new-contact').simulate('change');
    expect(wrapper.state().center.newContact).toBeTruthy();
    expect(wrapper.find('.new-contact-form').exists()).toBeTruthy();
  });

  it('should toggle center availability state', () => {
    expect(wrapper.state().center.active).toEqual(1);
    wrapper.find('.switch input#center-availability').simulate('change');
    expect(wrapper.state().center.active).toEqual(0);
    wrapper.find('.switch input#center-availability').simulate('change');
    expect(wrapper.state().center.active).toEqual(1);
    wrapper.unmount();
  });
});
