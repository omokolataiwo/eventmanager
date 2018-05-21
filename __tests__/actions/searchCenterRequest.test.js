/* global describe beforeEach afterEach it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { searchCenterRequest } from '../../client/src/actions/searchCenterRequest';
import { API_PATH } from '../../client/src/consts';
import { userMock } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Search for Center Request', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('Search for Center Action', () => {
    it('should dispatch action to search for center by name and area Center Action', (done) => {
      moxios.stubRequest(`${API_PATH}/centers/search?name=Sheba&area=ajah`, {
        status: 200,
        response: {
          centers: [
            { name: 'Sheba Center', address: '123 Abiola close', count: 1 }
          ]
        }
      });
      const expectedActions = [
        { type: 'SEARCHING_CENTER' },
        {
          type: actionType.SEARCH_RESULT,
          centers: {
            centers: [
              { name: 'Sheba Center', address: '123 Abiola close', count: 1 }
            ],
            count: 1
          }
        }
      ];
      const store = mockStore({ ...userMock });
      store
        .dispatch(searchCenterRequest({ name: 'Sheba', area: 'ajah' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
