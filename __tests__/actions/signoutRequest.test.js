/* global describe it expect */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionType from '../../client/src/types';
import { signoutRequest } from '../../client/src/actions/signoutRequest';

const mockStore = configureStore([thunk]);

describe('Fetch User Events Request', () => {
  describe('Fetch User Events Action', () => {
    it('should dispatch user events action', (done) => {
      const expectedActions = [{ type: actionType.SIGNOUT_USER }];
      const store = mockStore({});
      store.dispatch(signoutRequest('SIGNOUT_USER'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
