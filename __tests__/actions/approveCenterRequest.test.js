
/* global describe beforeEach afterEach it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { approveCenterRequest } from '../../client/src/actions/approveCenterRequest';
import { API_PATH } from '../../client/src/consts';
import { center, userMock } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Approve Center Request', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('Approve Center Action', () => {
    it('should return success message when super admin approves center', async (done) => {
      const centerId = 200;
      moxios.stubRequest(`${API_PATH}/centers/approve/${centerId}`, {
        status: 200,
        response: {
          center
        }
      });
      const expectedActions = [
        { type: 'UPDATING_CENTER' },
        {
          type: actionType.UPDATED_CENTER,
          center
        }
      ];
      const store = mockStore({
        user: { accessToken: '39hesdv8787338727kj' }
      });


      store.dispatch(approveCenterRequest(centerId)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should return error message when super admin approves center', async (done) => {
      const centerId = 'aa';
      moxios.stubRequest(`${API_PATH}/centers/approve/${centerId}`, {
        status: 422,
        response: {
          errors: {
            status: 'error',
            errors: {
              centerId: ['Invalid center id']
            }
          }
        }
      });
      const expectedActions = [
        { type: 'UPDATING_CENTER' },
        {
          type: actionType.UPDATING_CENTER_ERROR,
          errors: {
            centerId: ['Invalid center id']
          }
        }
      ];
      const store = mockStore({ ...userMock });


      store.dispatch(approveCenterRequest(centerId)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
