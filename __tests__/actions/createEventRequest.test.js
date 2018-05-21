/* global describe beforeEach afterEach it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../client/src/types';
import { createEventRequest } from '../../client/src/actions/createEventRequest';
import { API_PATH } from '../../client/src/consts';
import { event, userMock } from '../__mocks__/mockData';
import instance from '../../client/src/utils/axios';

const mockStore = configureStore([thunk]);

describe('Create Event Request', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('Create Event Action', () => {
    it('should dispatch created event action', (done) => {
      moxios.stubRequest(`${API_PATH}/events`, {
        status: 201,
        response: {
          ...event
        }
      });
      const expectedActions = [
        { type: 'REQUEST_CREATE_EVENT' },
        {
          type: actionType.CREATED_EVENT,
          event
        }
      ];
      const store = mockStore({ ...userMock });

      store.dispatch(createEventRequest(event)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should dispatch create event error', (done) => {
      moxios.stubRequest(`${API_PATH}/events`, {
        status: 422,
        response: {
          errors: {
            startDate: ['Invalid start date']
          }
        }
      });
      const expectedActions = [
        { type: 'REQUEST_CREATE_EVENT' },
        {
          type: actionType.CREATE_EVENT_ERROR,
          errors: {
            startDate: ['Invalid start date']
          }
        }
      ];
      const store = mockStore({ ...userMock });
      const withInvalidStartDate = { ...event, startDate: '23a-2-2018' };

      store.dispatch(createEventRequest(withInvalidStartDate)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
