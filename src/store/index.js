import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';

// eslint-disable-next-line import/prefer-default-export
export function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        thunk,
        reduxImmutableStateInvariant()
      )
    )
  );
}
