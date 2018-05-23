/* global describe it expect */
import getCenterContact from '../../client/src/reducers/getCenterContact';
import * as actionTypes from '../../client/src/types';
import { contacts } from '../__mocks__/reducer/center';

const defaultContacts = {
  contacts: [],
  action: {
    getCenterContact: null
  }
};

describe('getCenterContact reducer', () => {
  it('should return the initial state', () => {
    expect(getCenterContact(undefined, {})).toEqual(defaultContacts);
  });

  it('should handle FETCHING_CENTER_CONTACTS', () => {
    expect(getCenterContact(defaultContacts, {
      type: actionTypes.FETCHING_CENTER_CONTACTS
    })).toEqual({
      ...defaultContacts,
      action: {
        ...defaultContacts.action,
        getCenterContact: actionTypes.FETCHING_CENTER_CONTACTS
      }
    });
  });

  it('should handle RECEIVED_CENTER_CONTACTS', () => {
    expect(getCenterContact(defaultContacts, {
      type: actionTypes.RECEIVED_CENTER_CONTACTS,
      contacts
    })).toEqual({
      ...defaultContacts,
      contacts,
      action: {
        ...defaultContacts.action,
        getCenterContact: actionTypes.RECEIVED_CENTER_CONTACTS
      }
    });
  });
});
