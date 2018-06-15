/* global describe beforeAll afterAll it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { deleteEventRequest } from '../../client/src/actions/deleteEventRequest';
import { API_PATH } from '../../client/src/consts';
import { userMock, event } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Delete Event Request', () => {
  beforeAll(() => moxios.install(instance));
  afterAll(() => moxios.uninstall());

  describe('Delete Event Action', () => {
    it('should dispatch delete event action', (done) => {
      const eventId = 3;
      moxios.stubRequest(`${API_PATH}/events/${eventId}`, {
        status: 200,
        response: {
          event
        }
      });
      const expectedActions = [
        { type: 'DELETING_EVENT' },
        {
          type: actionType.DELETED_EVENT,
          eventId
        }
      ];
      const store = mockStore({ ...userMock });
      store.dispatch(deleteEventRequest(eventId)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
