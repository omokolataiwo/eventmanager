/* global describe beforeAll afterAll it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { signinRequest } from '../../client/src/actions/signinRequest';
import { API_PATH } from '../../client/src/consts';
import { userMock } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Signin User Request Action', () => {
  beforeAll(() => moxios.install(instance));
  afterAll(() => moxios.uninstall());

  it('should dispatch signin user action', (done) => {
    moxios.stubRequest(`${API_PATH}/users/signin`, {
      status: 200,
      response: {
        user: { role: 3 }
      }
    });
    const expectedActions = [
      { type: 'REQUEST_SIGNIN_USER' },
      {
        type: actionType.SIGNIN_USER,
        user: { role: 3 }
      }
    ];

    const store = mockStore({ ...userMock });

    store.dispatch(signinRequest(userMock.userdata)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
