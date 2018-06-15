/* global describe beforeAll afterAll it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { fetchUserEventRequest } from '../../client/src/actions/fetchUserEventRequest';
import { API_PATH } from '../../client/src/consts';
import { userMock, event } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Fetch User Event Request', () => {
  beforeAll(() => moxios.install(instance));
  afterAll(() => moxios.uninstall());

  describe('Fetch User Event Action', () => {
    it('should dispatch fetch user action', (done) => {
      moxios.stubRequest(`${API_PATH}/events/${3}`, {
        status: 200,
        response: {
          event
        }
      });
      const expectedActions = [
        { type: actionType.FETCHING_EVENT },
        {
          type: actionType.RECEIVED_EVENT,
          event
        }
      ];
      const store = mockStore({ ...userMock });
      store.dispatch(fetchUserEventRequest(3)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
