import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import combinedReducer from './reducers/index';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export default function configureStore(preloadedState) {
  const store = createStore(
    persistedReducer,
    /*preloadedState,*/
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware)
  );
  const persistor = persistStore(store);

  return {
    store,
    persistor
  };
}
