/* global describe beforeEach afterEach it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { updateEventRequest } from '../../client/src/actions/updateEventRequest';
import { API_PATH } from '../../client/src/consts';
import { event, userMock } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Create Event Request', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('Create Event Action', () => {
    it('should dispatch created event action', (done) => {
      moxios.stubRequest(`${API_PATH}/events/${event.id}`, {
        status: 200,
        response: {
          ...event
        }
      });
      const expectedActions = [
        { type: 'REQUEST_UPDATE_EVENT' },
        {
          type: actionType.UPDATED_EVENT,
          event
        }
      ];
      const store = mockStore({ ...userMock });

      store.dispatch(updateEventRequest(event)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
