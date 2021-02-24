import { combineReducers } from 'redux';
import blog from './blog/reducer';
import user from './user/reducer';

export const rootReducer = combineReducers({
  blog,
  user,
});
