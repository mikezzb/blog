import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import { ICombinedStore } from '../interfaces';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      reduxImmutableStateInvariant(),
    ),
  ),
);

export type RootState = ICombinedStore;
export type AppDispatch = typeof store.dispatch;

export default store;
