/* global describe beforeAll afterAll it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { fetchUserRequest } from '../../client/src/actions/fetchUserRequest';
import { API_PATH } from '../../client/src/consts';
import { userMock } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Fetch User Request', () => {
  beforeAll(() => moxios.install(instance));
  afterAll(() => moxios.uninstall());

  describe('Fetch User Action', () => {
    it('should dispatch fetch user action', (done) => {
      moxios.stubRequest(`${API_PATH}/users`, {
        status: 200,
        response: {
          user: { ...userMock }
        }
      });
      const expectedActions = [
        { type: actionType.FETCH_USER_REQUEST },
        {
          type: actionType.RECEIVED_USER,
          user: { ...userMock }
        }
      ];
      const store = mockStore({ ...userMock });
      store.dispatch(fetchUserRequest()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
