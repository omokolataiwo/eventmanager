/* global describe beforeAll afterAll it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { fetchUserEventsRequest } from '../../client/src/actions/fetchUserEventsRequest';
import { API_PATH } from '../../client/src/consts';
import { userMock, event } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Fetch User Events Request', () => {
  beforeAll(() => moxios.install(instance));
  afterAll(() => moxios.uninstall());

  describe('Fetch User Events Action', () => {
    it('should dispatch user events action', (done) => {
      moxios.stubRequest(`${API_PATH}/events`, {
        status: 200,
        response: {
          events: [event],
          count: 1
        }
      });
      const expectedActions = [
        { type: actionType.FETCHING_EVENTS },
        {
          type: actionType.RECEIVED_EVENTS,
          events: [event],
          count: 1
        }
      ];
      const store = mockStore({ ...userMock });
      store.dispatch(fetchUserEventsRequest()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
