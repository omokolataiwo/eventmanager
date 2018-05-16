import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import combinedReducer from './reducers/index';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

/**
 * Configure store
 *
 * @param {object} preloadedState  Persisted state
 * @return {object} State
 */
export default function configureStore(preloadedState) {
  let store;

  if (process.env.NODE_ENV === 'development') {
    store = createStore(
      persistedReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(thunkMiddleware, logger)
    );
  } else {
    store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
  }
  const persistor = persistStore(store);

  return {
    store,
    persistor
  };
}
