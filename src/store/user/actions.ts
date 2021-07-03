/**
 * User Actions
 */
import { IUser } from '../../interfaces';
import * as types from './types';

export function displayLogin(user: IUser) {
  return { type: types.DISPLAY_LOGIN, user };
}
export function logout() {
  return { type: types.LOG_OUT };
}
