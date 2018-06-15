/* global describe beforeAll afterAll it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { fetchCenterEventRequest } from '../../client/src/actions/fetchCenterEventRequest';
import { API_PATH } from '../../client/src/consts';
import { userMock } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Fetch all Events for a center request', () => {
  beforeAll(() => moxios.install(instance));
  afterAll(() => moxios.uninstall());

  describe('Fetch All Events for a Center Action', () => {
    it('should dispatch fetch center events action', (done) => {
      moxios.stubRequest(`${API_PATH}/centers/events?page=1`, {
        status: 200,
        response: {
          events: [
            {
              title: 'Birthday Party',
              centerId: 2,
              startDate: '2018-12-4',
              endDate: '2018-12-4',
              count: 1
            }
          ]
        }
      });
      const expectedActions = [
        { type: 'FETCHING_CENTERS_EVENTS' },
        {
          type: actionType.RECEIVED_CENTERS_EVENTS,
          events: [
            {
              title: 'Birthday Party',
              centerId: 2,
              startDate: '2018-12-4',
              endDate: '2018-12-4',
              count: 1
            }
          ],
          count: 1
        }
      ];
      const store = mockStore({ ...userMock });
      store.dispatch(fetchCenterEventRequest({ page: 1 })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
