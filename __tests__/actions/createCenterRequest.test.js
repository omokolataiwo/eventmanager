/* global describe beforeAll afterAll it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { createCenterRequest } from '../../client/src/actions/createCenterRequest';
import { API_PATH } from '../../client/src/consts';
import { center, userMock, contact } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Create Center Request', () => {
  beforeAll(() => moxios.install(instance));
  afterAll(() => moxios.uninstall());

  describe('Create Center Action', () => {
    it('should create an action to add center', async (done) => {
      moxios.stubRequest(
        'https://api.cloudinary.com/v1_1/omokolataiwo/image/upload',
        {
          status: 201,
          response: {
            center
          }
        }
      );
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

      const centerWithNewContact = {
        ...center,
        newContact: true,
        contact: { newContact: contact }
      };
      store.dispatch(createCenterRequest(centerWithNewContact)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
