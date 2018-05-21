/* global describe beforeEach afterEach it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { fetchAdminCentersRequest } from '../../client/src/actions/fetchAdminCentersRequest';
import { API_PATH } from '../../client/src/consts';
import { userMock, event } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Fetch Admin Center Request', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('Fetch Admin Center Action', () => {
    it('should dispatch fetch admin action', (done) => {
      moxios.stubRequest(`${API_PATH}/centers/admin?page=1`, {
        status: 200,
        response: {
          centers: [{ name: 'Sheba Center', address: '123 Abiola close' }],
          count: 1
        }
      });
      const expectedActions = [
        { type: 'FETCHING_ADMIN_CENTERS' },
        {
          type: actionType.RECEIVED_ADMIN_CENTERS,
          centers: [{ name: 'Sheba Center', address: '123 Abiola close' }],
          count: 1
        }
      ];
      const store = mockStore({ ...userMock });
      store.dispatch(fetchAdminCentersRequest({ page: 1 })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
