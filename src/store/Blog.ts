import axios from 'axios';
import * as actions from './blog/actions';
import { BLOG_LOAD } from '../constants/apis';
import { ISkip } from '../interfaces';

export default function loadBlog(skipJSON: ISkip) {
  return async dispatch => {
    dispatch(actions.blogLoading());
    try {
      const res = await axios.post(BLOG_LOAD, skipJSON);
      dispatch(actions.loadBlogSuccess(res.data));
    }
    catch (error) {
      console.log(error);
      dispatch(actions.blogLoading(false));
    }
  };
}
