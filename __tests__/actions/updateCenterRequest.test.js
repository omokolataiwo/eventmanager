/* global describe beforeEach afterEach it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { updateCenterRequest } from '../../client/src/actions/updateCenterRequest';
import { API_PATH } from '../../client/src/consts';
import { center, userMock, contact } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Create Center Request', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('Create Center Action', () => {
    // it('should create an action to add center', (done) => {
    //   moxios.stubRequest(`${API_PATH}/centers/${center.id}`, {
    //     status: 201,
    //     response: {
    //       ...center
    //     }
    //   });
    //   const expectedActions = [
    //     { type: 'UPDATING_CENTER' },
    //     {
    //       type: actionType.UPDATED_CENTER,
    //       center
    //     }
    //   ];
    //   const store = mockStore({ ...userMock });

    //   const centerWithContact = { ...center, contact: { newContact: contact } };
    //   store.dispatch(updateCenterRequest(centerWithContact)).then(() => {
    //     expect(store.getActions()).toEqual(expectedActions);
    //     done();
    //   });
    // });

    it('should create an action to add center2', async (done) => {
      moxios.stubRequest(
        'https://api.cloudinary.com/v1_1/omokolataiwo/image/upload',
        {
          status: 200,
          response: {
            url: 'https://api.cloudinary.com/new_upload.jpg'
          }
        }
      );

      moxios.stubRequest(`${API_PATH}/centers/${center.id}`, {
        status: 201,
        response: {
          ...center
        }
      });
      const expectedActions = [
        { type: 'UPDATING_CENTER' },
        {
          type: actionType.UPDATED_CENTER,
          center
        }
      ];
      const store = mockStore({ ...userMock });

      const centerWithContact = {
        ...center,
        image: { type: 'image/jpeg' },
        contact: { newContact: contact }
      };
      store.dispatch(updateCenterRequest(centerWithContact)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
