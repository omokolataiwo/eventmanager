/* global describe beforeAll afterAll it expect */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { adminCancelEventRequest } from '../../client/src/actions/adminCancelEventRequest';
import { API_PATH } from '../../client/src/consts';
import { eventBirthday } from '../__mocks__/event';
import { userMock } from '../__mocks__/user';
import instance from '../../client/src/utils/axios';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Admin Cancel Event Request', () => {
  beforeAll(() => moxios.install(instance));
  afterAll(() => moxios.uninstall());

  describe('Cancel Event Action', () => {
    it('should return success message when admin cancel an event', async (done) => {
      const eventId = 200;
      const event = { ...eventBirthday, id: eventId };
      moxios.stubRequest(`${API_PATH}/centers/event/${eventId}`, {
        status: 200,
        response: {
          event
        }
      });

      const expectedActions = [
        { type: 'DELETING_EVENT' },
        {
          type: actionType.ADMIN_CANCEL_EVENT,
          eventId: event.id
        }
      ];
      const store = mockStore({
        user: { accessToken: '39hesdv8787338727kj' }
      });

      store.dispatch(adminCancelEventRequest(eventId)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
