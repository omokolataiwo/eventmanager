/* global describe beforeEach afterEach it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { fetchAllCentersRequest } from '../../client/src/actions/fetchAllCentersRequest';
import { API_PATH } from '../../client/src/consts';
import { userMock } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Fetch All Center Request', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('Fetch All Center Action', () => {
    it('should dispatch fetch all action', (done) => {
      moxios.stubRequest(`${API_PATH}/centers?page=1`, {
        status: 200,
        response: {
          centers: [{ name: 'Sheba Center', address: '123 Abiola close' }],
          count: 1
        }
      });
      const expectedActions = [
        { type: 'FETCHING_CENTERS' },
        {
          type: actionType.RECEIVED_CENTERS,
          centers: [{ name: 'Sheba Center', address: '123 Abiola close' }],
          count: 1
        }
      ];
      const store = mockStore({ ...userMock });
      store.dispatch(fetchAllCentersRequest({ page: 1 })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
