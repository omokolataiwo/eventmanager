import { createStore,  applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import combinedReducer from './reducers';

const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, combinedReducer);


export default function configureStore(preloadedState) {
  let store = createStore(persistedReducer, preloadedState, applyMiddleware(thunkMiddleware));
	let persistor = persistStore(store);
	
	return {
		store,
		persistor
	}
}
