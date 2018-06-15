/* global describe beforeAll afterAll it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { updateUserRequest } from '../../client/src/actions/updateUserRequest';
import { API_PATH } from '../../client/src/consts';
import { userMock } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Update User Action', () => {
  beforeAll(() => moxios.install(instance));
  afterAll(() => moxios.uninstall());

  it('should dispatch update user action', (done) => {
    moxios.stubRequest(`${API_PATH}/users/`, {
      status: 201,
      response: {
        user: userMock
      }
    });
    const expectedActions = [
      { type: 'UPDATING_USER_REQUEST' },
      {
        type: actionType.UPDATED_USER,
        user: userMock
      }
    ];

    const store = mockStore({ ...userMock });

    store.dispatch(updateUserRequest(userMock.userdata)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
