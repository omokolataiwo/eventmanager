import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { createCenterRequest } from '../../client/src/actions/createCenterRequest';
import { API_PATH } from '../../client/src/consts';
import { center, userMock } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Create Center Request', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('Create Center Action', () => {
    it('should create an action to add center', async (done) => {
      moxios.stubRequest('https://api.cloudinary.com/v1_1/omokolataiwo/image/upload', {
        status: 201,
        response: {
          center
        }
      });
      moxios.stubRequest(`${API_PATH}/centers`, {
        status: 201,
        response: {
          ...center
        }
      });
      const expectedActions = [
        { type: 'CREATING_NEW_CENTER' },
        {
          type: actionType.CREATED_NEW_CENTER,
          center
        }
      ];
      const store = mockStore({ ...userMock });

      store.dispatch(createCenterRequest(center)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    // it('should return error message when center id is not valid', async (done) => {
    //   const centerId = 'aa';
    //   moxios.stubRequest(`${API_PATH}/centers/approve/${centerId}`, {
    //     status: 422,
    //     response: {
    //       errors: {
    //         status: 'error',
    //         errors: {
    //           centerId: ['Invalid center id']
    //         }
    //       }
    //     }
    //   });
    //   const expectedActions = [
    //     { type: 'UPDATING_CENTER' },
    //     {
    //       type: actionType.UPDATING_CENTER_ERROR,
    //       errors: {
    //         centerId: ['Invalid center id']
    //       }
    //     }
    //   ];
    //   const store = mockStore({
    //     user: { accessToken: '39hesdv8787338727kj' }
    //   });


    //   store.dispatch(approveCenterRequest(centerId)).then(() => {
    //     expect(store.getActions()).toEqual(expectedActions);
    //     done();
    //   });
    // });
  });
});
