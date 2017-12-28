import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combinedReducer from './reducers';

export default function configureStore(preloadedState) {
  return createStore(combinedReducer, preloadedState, applyMiddleware(thunkMiddleware));
}
