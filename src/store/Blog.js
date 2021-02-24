import axios from 'axios';
import * as actions from './blog/actions';

const url = 'blogs/';

export default function loadBlog(skipJSON) {
  return async dispatch => {
    dispatch(actions.blogLoading());
    try {
      const res = await axios.post(url, skipJSON);
      dispatch(actions.loadBlogSuccess(res.data));
    }
    catch (error) {
      console.log(error);
      dispatch(actions.blogLoading(false));
    }
  };
}
