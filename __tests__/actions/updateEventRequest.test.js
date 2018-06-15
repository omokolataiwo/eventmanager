/* global describe beforeAll afterAll it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { updateEventRequest } from '../../client/src/actions/updateEventRequest';
import { API_PATH } from '../../client/src/consts';
import { event, userMock } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Update Event Action', () => {
  beforeAll(() => moxios.install(instance));
  afterAll(() => moxios.uninstall());

  it('should dispatch update event action', (done) => {
    moxios.stubRequest(`${API_PATH}/events/${event.id}`, {
      status: 200,
      response: {
        event
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
