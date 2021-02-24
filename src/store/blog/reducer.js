/**
 * Blog Reducer
 */
import initialState from '../initialState';
import * as types from './types';

export default function blogReducer(state = initialState.blog, action) {
  switch (action.type) {
    case types.BLOG_LOADING:
      return {
        ...state,
        loading: action.isLoading,
      };
    case types.LOAD_BLOG_SUCCESS:
      return {
        ...state,
        posts: state.posts.concat(action.posts),
        loading: false,
      };
    case types.ALL_LOADED:
      return {
        ...state,
        loaded: true,
      };
    case types.ADD_POST:
      return {
        ...state,
        posts: [action.post].concat(state.posts),
      };
    case types.UPDATE_POST: {
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.post._id ?
          { ...post, ...action.post } :
          post
        ),
      }; }
    case types.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.id),
      };
    default:
      return state;
  }
}
