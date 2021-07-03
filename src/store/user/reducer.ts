/**
 * User Reducer
 */
import initialState from '../initialState';
import * as types from './types';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.DISPLAY_LOGIN:
      return {
        ...state,
        user: action.user,
        loggedIn: true,
      };
    case types.LOG_OUT:
      return {
        state,
      };
    default:
      return state;
  }
}
