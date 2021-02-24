/**
 * Blog Actions
 */
import * as types from './types';

export function blogLoading(isLoading = true) {
  return { type: types.BLOG_LOADING, isLoading };
}
export function loadBlogSuccess(posts) {
  return { type: types.LOAD_BLOG_SUCCESS, posts };
}
export function allLoaded(loaded = true) {
  return { type: types.ALL_LOADED, loaded };
}

export function addPost(post) {
  return { type: types.ADD_POST, post };
}

export function updatePost(post) {
  return { type: types.UPDATE_POST, post };
}

export function deletePost(id) {
  return { type: types.DELETE_POST, id };
}
