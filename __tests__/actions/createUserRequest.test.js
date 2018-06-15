/* global describe beforeEach afterEach it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { createUserRequest } from '../../client/src/actions/createUserRequest';
import { API_PATH } from '../../client/src/consts';
import { userMock } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Create User Request', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('Create User Action', () => {
    it('should dispatch created user action', (done) => {
      moxios.stubRequest(`${API_PATH}/users`, {
        status: 201,
        response: {
          user: { role: 3 }
        }
      });
      const expectedActions = [
        { type: 'REQUEST_SIGNUP_USER' },
        {
          type: actionType.SIGNUP_USER,
          userdata: { user: { role: 3 } }
        }
      ];

      const store = mockStore({ ...userMock });

      store.dispatch(createUserRequest(userMock.userdata)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should dispatch creating user action error messages', (done) => {
      moxios.stubRequest(`${API_PATH}/users`, {
        status: 422,
        response: {
          errors: {
            phoneNumber: ['Invalid Phone Number']
          }
        }
      });
      const expectedActions = [
        { type: 'REQUEST_SIGNUP_USER' },
        {
          type: actionType.SIGNUP_ERROR,
          errors: {
            phoneNumber: ['Invalid Phone Number']
          }
        }
      ];
      const store = mockStore({ ...userMock });

      const withInvalidPhoneNumber = {
        ...userMock.userdata,
        phoneNumber: '8383Az37373'
      };
      store.dispatch(createUserRequest(withInvalidPhoneNumber)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
