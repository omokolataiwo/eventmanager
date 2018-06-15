/* global describe beforeAll afterAll it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { getContactPersonRequest } from '../../client/src/actions/fetchContactPersonRequest';
import { API_PATH } from '../../client/src/consts';
import { userMock, contact } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Fetch Admin Contact Person Request', () => {
  beforeAll(() => moxios.install(instance));
  afterAll(() => moxios.uninstall());

  describe('Fetch Center Contact Person Action', () => {
    it('should dispatch fetch contacts action', (done) => {
      moxios.stubRequest(`${API_PATH}/centers/contacts`, {
        status: 200,
        response: {
          contacts: [contact]
        }
      });
      const expectedActions = [
        {
          type: actionType.RECEIVED_CENTER_CONTACTS,
          contacts: [contact]
        }
      ];
      const store = mockStore({ ...userMock });
      store.dispatch(getContactPersonRequest()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
