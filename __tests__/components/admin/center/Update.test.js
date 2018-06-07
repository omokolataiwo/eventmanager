import React from 'react';
import { shallow } from 'enzyme';
import { Update } from '../../../../client/src/components/admin/center/Update';
import { center } from '../../../__mocks__/center';
import { contacts } from '../../../__mocks__/contact';
import toastr from '../../../__mocks__/toastr'

const history = [];

const props = {
  history: {
    push: jest.fn(path => history.push(path)),
    replace: jest.fn(() => { })
  },
  updateCenterRequest: jest.fn(() => { }),
  getContactPersonRequest: jest.fn(() => { }),
  fetchCenterRequest: jest.fn(() => { }),
  reset: jest.fn(() => { }),
  contacts,
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

const wrapper = shallow(<Update {...props} />);

describe('Update Component', () => {
  it('renders preloader components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('redirect to 404 page if center does not exist', () => {
    wrapper.setProps({
      getCenterAction: {
        getCenter: 'FETCHING_CENTER_ERROR'
      }
    });
    expect(history.pop()).toEqual('/404');
  });

  it('should add existing center contact to create center state', () => {
    wrapper.setProps({ ...props, getContactAction: { ...props.getContactAction, getCenterContact: 'RECEIVED_CENTER_CONTACTS' } });
    expect(wrapper.state().center.contact.existingContacts.length).toEqual(2)
  });

  it('should set state for new contact', () => {
    wrapper.setProps({ ...props, contacts: [], getContactAction: { ...props.getContactAction, getCenterContact: 'RECEIVED_CENTER_CONTACTS' } });
    expect(wrapper.state().center.newContact).toBeTruthy();
  });

  it('should update center state on received action', () => {
    wrapper.setProps({ ...props, getCenterAction: { ...props.getCenterAction, getCenter: 'RECEIVED_ADMIN_CENTER' } });
    expect(wrapper.state().center.name).toEqual('Sheba Center');
  });

  it('should update center and call toastr', () => {
    wrapper.setProps({ ...props, updateAction: { ...props.updateAction, updateCenter: 'UPDATED_CENTER' } });
    expect(toastr.success).toHaveBeenCalled();
  });

  it('should set errors state', () => {
    wrapper.setProps({ ...props, updateErrors: { name: ['Center name is required'] }, updateAction: { ...props.updateAction, updateCenter: 'UPDATING_CENTER_ERROR' } });
    expect(wrapper.state().errors.name).toEqual(['Center name is required']);
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

  it('should set error message for contact person firstName required', () => {
    const instance = wrapper.instance();
    instance.handleContactPersonsFieldChange({ target: { id: 'firstName', value: '' } });
    expect(wrapper.state().errors.firstName[0]).toEqual('First name is required');
  });

  it('should create center', () => {
    const instance = wrapper.instance();
    instance.updateCenter({ preventDefault: () => { } });
    expect(props.updateCenterRequest).toHaveBeenCalled();

  });

  it('should toggle new contact state', () => {
    const instance = wrapper.instance();
    expect(wrapper.state().center.newContact).toBeTruthy();
    instance.handleNewContactChanged();
    expect(wrapper.state().center.newContact).toBeFalsy();
  });

  it('should toggle center availability state', () => {
    const instance = wrapper.instance();
    expect(wrapper.state().center.active).toEqual(1);
    instance.handleAvailToggle();
    expect(wrapper.state().center.active).toEqual(0);
    instance.handleAvailToggle();
    expect(wrapper.state().center.active).toEqual(1);
  });

  it('should change the field for contact person', () => {
    const instance = wrapper.instance();
    instance.handleContactPersonsFieldChange({ target: { id: 'firstName', value: 'Amos' } });
    expect(wrapper.state().center.contact.newContact.firstName).toEqual('Amos');
    wrapper.unmount();
  });
});
