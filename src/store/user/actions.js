/**
 * User Actions
 */
import * as types from './types';

export function displayLogin(user) {
  return { type: types.DISPLAY_LOGIN, user };
}
export function logout() {
  return { type: types.LOG_OUT };
}
