import { combineReducers } from 'redux';
import blog from './blog/reducer';
import user from './user/reducer';

const rootReducer = combineReducers({
  blog,
  user,
});

export default rootReducer;
